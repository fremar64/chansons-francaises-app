import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import { computeCeredisScore } from '@/services/ceredis-calculator';
import type { Evidence } from '@/services/ceredis-calculator/types';

const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || process.env.POCKETBASE_URL || '';
if (!pbUrl) {
  console.error('PocketBase URL not configured. Set NEXT_PUBLIC_POCKETBASE_URL or POCKETBASE_URL in your environment.');
}
const pb = new PocketBase(pbUrl || '');
// Disable auto-cancellation to avoid aborted requests in some server runtimes
// (PocketBase JS SDK may auto-abort fetches when the runtime signals cancellation).
try { (pb as any).autoCancellation = false; } catch (_) { /* ignore if not supported */ }

export async function POST(request: NextRequest) {
  try {
    if (!pbUrl) {
      return NextResponse.json({ error: 'PocketBase URL not configured on server' }, { status: 500 });
    }
    const body = await request.json();
    const { userId } = body;
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    // Récupérer les evidences depuis PocketBase
    // Preflight simple check to ensure PocketBase URL is reachable
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      await fetch(pbUrl!, { method: 'GET', signal: controller.signal });
      clearTimeout(timeout);
    } catch (err) {
      console.error('PocketBase reachability check failed:', String(err));
      return NextResponse.json({ error: 'Cannot reach PocketBase at configured URL', details: String(err) }, { status: 502 });
    }

    let records: any[] = [];
    try {
      records = await pb.collection('evidences').getFullList({ 
        filter: `user="${userId}"`,
        sort: '-created'
      });
    } catch (err: any) {
      console.error('PocketBase getFullList failed:', err);
      return NextResponse.json({ error: 'PocketBase request failed', details: err?.message || String(err) }, { status: 502 });
    }

    // Mapper les champs PocketBase vers le type Evidence
    const evidences: Evidence[] = records.map((r: any) => ({
      id: r.id,
      user: r.user || userId,
      competency_id: r.competency_id,
      evidence_type: r.evidence_type,
      score: Number(r.score) || 0,
      created: r.created || new Date().toISOString(),
      activity_type: r.activity_type,
      seance_id: r.seance_id,
      parcours: r.parcours,
      metadata: r.metadata || {}
    }));

    const result = await computeCeredisScore(userId, evidences);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('CEREDIS calculation error:', error);
    return NextResponse.json({ 
      error: error?.message || String(error),
      details: error?.data || null
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!pbUrl) {
      return NextResponse.json({ error: 'PocketBase URL not configured on server' }, { status: 500 });
    }
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    // Preflight simple check to ensure PocketBase URL is reachable
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      await fetch(pbUrl!, { method: 'GET', signal: controller.signal });
      clearTimeout(timeout);
    } catch (err) {
      console.error('PocketBase reachability check failed:', String(err));
      return NextResponse.json({ error: 'Cannot reach PocketBase at configured URL', details: String(err) }, { status: 502 });
    }

    let records: any[] = [];
    try {
      records = await pb.collection('evidences').getFullList({ 
        filter: `user="${userId}"`,
        sort: '-created'
      });
    } catch (err: any) {
      console.error('PocketBase getFullList failed:', err);
      return NextResponse.json({ error: 'PocketBase request failed', details: err?.message || String(err) }, { status: 502 });
    }

    const evidences: Evidence[] = records.map((r: any) => ({
      id: r.id,
      user: r.user || userId,
      competency_id: r.competency_id,
      evidence_type: r.evidence_type,
      score: Number(r.score) || 0,
      created: r.created || new Date().toISOString(),
      activity_type: r.activity_type,
      seance_id: r.seance_id,
      parcours: r.parcours,
      metadata: r.metadata || {}
    }));

    const result = await computeCeredisScore(userId, evidences);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('CEREDIS fetch error:', error);
    return NextResponse.json({ 
      error: error?.message || String(error),
      details: error?.data || null
    }, { status: 500 });
  }
}
