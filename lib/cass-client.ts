/**
 * CEREDIS CaSS Client - Node.js (JWT auto-refresh)
 * 
 * Client officiel CEREDIS pour interaction avec CaSS.
 * Gère automatiquement l'authentification JWT et le refresh.
 */

import { decodeJwt } from 'jose';

export type CassClientConfig = {
  baseUrl: string;
  username: string;
  password: string;
  refreshSkewSeconds?: number;
  timeoutMs?: number;
};

type LoginResponse = {
  token?: string;
  access_token?: string;
  auth_token?: string;
  jwt?: string;
};

export class CEREDISCassClient {
  private baseUrl: string;
  private username: string;
  private password: string;
  private refreshSkewSeconds: number;
  private timeoutMs: number;

  private token: string | null = null;
  private tokenExp: number | null = null;

  constructor(cfg: CassClientConfig) {
    this.baseUrl = cfg.baseUrl.replace(/\/+$/, '');
    this.username = cfg.username;
    this.password = cfg.password;
    this.refreshSkewSeconds = cfg.refreshSkewSeconds ?? 60;
    this.timeoutMs = cfg.timeoutMs ?? 15000;
  }

  private now() {
    return Math.floor(Date.now() / 1000);
  }

  private isTokenValid() {
    return (
      this.token &&
      this.tokenExp &&
      this.now() < this.tokenExp - this.refreshSkewSeconds
    );
  }

  private async fetchJson(path: string, init: RequestInit = {}) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), this.timeoutMs);

    try {
      const res = await fetch(this.baseUrl + path, {
        ...init,
        signal: ctrl.signal,
      });

      const txt = await res.text();
      let data: any;
      try {
        data = txt ? JSON.parse(txt) : null;
      } catch {
        data = txt;
      }

      return { res, data };
    } finally {
      clearTimeout(timer);
    }
  }

  private extractToken(payload: LoginResponse): string {
    const t =
      payload.token ||
      payload.access_token ||
      payload.auth_token ||
      payload.jwt;

    if (!t) throw new Error('No JWT in login response');
    return t;
  }

  private setToken(token: string) {
    const decoded = decodeJwt(token);
    const exp = decoded.exp;

    this.token = token;
    this.tokenExp = typeof exp === 'number' ? exp : this.now() + 300;
  }

  private async login() {
    const { res, data } = await this.fetchJson('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    });

    if (!res.ok)
      throw new Error(
        `CaSS login failed: ${res.status} ${JSON.stringify(data)}`
      );

    const token = this.extractToken(data);
    this.setToken(token);
  }

  private async getToken(): Promise<string> {
    if (!this.isTokenValid()) await this.login();
    return this.token!;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await this.getToken();

    const headers = new Headers(init.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    if (init.body && !headers.has('Content-Type'))
      headers.set('Content-Type', 'application/json');

    let { res, data } = await this.fetchJson(path, {
      ...init,
      headers,
    });

    if (res.status === 401) {
      this.token = null;
      await this.login();

      headers.set('Authorization', `Bearer ${this.token}`);
      ({ res, data } = await this.fetchJson(path, {
        ...init,
        headers,
      }));
    }

    if (!res.ok)
      throw new Error(
        `CaSS ${path} failed: ${res.status} ${JSON.stringify(data)}`
      );

    return data;
  }

  /* ---- Canonical CaSS API ---- */

  frameworks() {
    return this.request<any[]>('/api/frameworks');
  }

  framework(id: string) {
    return this.request<any>(`/api/framework/${id}`);
  }

  competencies() {
    return this.request<any[]>('/api/competencies');
  }

  competency(id: string) {
    return this.request<any>(`/api/competency/${id}`);
  }

  relations() {
    return this.request<any[]>('/api/relations');
  }

  async createAssertion(assertion: any) {
    return this.request<any>('/api/assertion', {
      method: 'POST',
      body: JSON.stringify(assertion),
    });
  }

  async getAssertions(params: { subject?: string; competency?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<any[]>(`/api/assertion/search?${query}`);
  }
}

// Singleton instance (initialized in API routes)
let cassClient: CEREDISCassClient | null = null;

export function getCassClient(): CEREDISCassClient {
  if (!cassClient) {
    const baseUrl = process.env.CASS_URL;
    const username = process.env.CASS_USERNAME;
    const password = process.env.CASS_PASSWORD;

    if (!baseUrl || !username || !password) {
      throw new Error('CaSS credentials not configured. Set CASS_URL, CASS_USERNAME, CASS_PASSWORD in .env');
    }

    cassClient = new CEREDISCassClient({
      baseUrl,
      username,
      password,
    });
  }

  return cassClient;
}
