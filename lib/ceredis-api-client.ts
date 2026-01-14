/**
 * Client API CEREDIS - Frontend
 * 
 * Ce client appelle les API Routes Next.js qui gèrent le tracking.
 * Il évite d'exposer les credentials CaSS/xAPI au navigateur.
 */

import type { ActivityCompletionData } from '@/services/integration-unified/integration.unified';

export interface TrackingResult {
  success: boolean;
  xapiStatements: any[];
  cassAssertions: any[];
  errors: string[];
}

export class CeredisApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/ceredis') {
    this.baseUrl = baseUrl;
  }

  /**
   * Track le début d'une activité
   */
  async trackActivityStart(data: Omit<ActivityCompletionData, 'score' | 'maxScore' | 'duration'>): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/track/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('[CeredisAPI] Track start error:', error);
    }
  }

  /**
   * Track la complétion d'une activité
   */
  async trackActivityCompletion(data: ActivityCompletionData): Promise<TrackingResult> {
    try {
      const res = await fetch(`${this.baseUrl}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Tracking failed: ${res.status} ${error}`);
      }

      return await res.json();
    } catch (error: any) {
      console.error('[CeredisAPI] Track completion error:', error);
      return {
        success: false,
        xapiStatements: [],
        cassAssertions: [],
        errors: [error.message],
      };
    }
  }

  /**
   * Obtenir le dashboard d'un apprenant
   */
  async getUserDashboard(userId: string): Promise<any> {
    try {
      const res = await fetch(`${this.baseUrl}/dashboard/${userId}`);
      
      if (!res.ok) {
        throw new Error(`Dashboard fetch failed: ${res.status}`);
      }

      return await res.json();
    } catch (error: any) {
      console.error('[CeredisAPI] Dashboard error:', error);
      throw error;
    }
  }
}

// Singleton instance
export const ceredisApi = new CeredisApiClient();
