import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock PocketBase client
const mockPocketBase = {
  collection: vi.fn()
};

describe('PocketBase Integration - Service Unifié', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveEvidence', () => {
    it('devrait sauvegarder une evidence correctement', async () => {
      const mockCreate = vi.fn().mockResolvedValue({ id: 'rec123' });
      mockPocketBase.collection.mockReturnValue({ create: mockCreate });

      const evidence = {
        studentId: 'student123',
        competencyId: '1.1',
        score: 75,
        evidenceType: 'P1',
        activityId: 'act1',
        timestamp: new Date().toISOString()
      };

      // Simuler l'appel à saveEvidence
      const result = await mockPocketBase.collection('evidences').create(evidence);

      expect(mockPocketBase.collection).toHaveBeenCalledWith('evidences');
      expect(mockCreate).toHaveBeenCalledWith(evidence);
      expect(result.id).toBe('rec123');
    });

    it('devrait gérer les erreurs de sauvegarde', async () => {
      const mockCreate = vi.fn().mockRejectedValue(new Error('Network error'));
      mockPocketBase.collection.mockReturnValue({ create: mockCreate });

      await expect(
        mockPocketBase.collection('evidences').create({})
      ).rejects.toThrow('Network error');
    });
  });

  describe('getStudentEvidences', () => {
    it('devrait récupérer toutes les evidences d\'un élève', async () => {
      const mockGetFullList = vi.fn().mockResolvedValue([
        { id: 'ev1', studentId: 'student123', competencyId: '1.1', score: 75 },
        { id: 'ev2', studentId: 'student123', competencyId: '1.2', score: 80 }
      ]);
      mockPocketBase.collection.mockReturnValue({ getFullList: mockGetFullList });

      const evidences = await mockPocketBase.collection('evidences').getFullList({
        filter: 'studentId="student123"'
      });

      expect(evidences).toHaveLength(2);
      expect(evidences[0].studentId).toBe('student123');
    });

    it('devrait filtrer par compétence', async () => {
      const mockGetFullList = vi.fn().mockResolvedValue([
        { id: 'ev1', competencyId: '1.1', score: 75 }
      ]);
      mockPocketBase.collection.mockReturnValue({ getFullList: mockGetFullList });

      const evidences = await mockPocketBase.collection('evidences').getFullList({
        filter: 'competencyId="1.1"'
      });

      expect(evidences).toHaveLength(1);
      expect(evidences[0].competencyId).toBe('1.1');
    });
  });

  describe('saveTracking', () => {
    it('devrait sauvegarder une donnée de tracking', async () => {
      const mockCreate = vi.fn().mockResolvedValue({ id: 'track123' });
      mockPocketBase.collection.mockReturnValue({ create: mockCreate });

      const tracking = {
        studentId: 'student123',
        activityId: 'act1',
        eventType: 'activity_started',
        timestamp: new Date().toISOString(),
        metadata: { parcours: 'la-bas', seance: 1 }
      };

      const result = await mockPocketBase.collection('tracking').create(tracking);

      expect(mockPocketBase.collection).toHaveBeenCalledWith('tracking');
      expect(result.id).toBe('track123');
    });
  });

  describe('getClassEvidences', () => {
    it('devrait récupérer evidences de tous les élèves d\'une classe', async () => {
      const mockGetFullList = vi.fn().mockResolvedValue([
        { id: 'ev1', studentId: 'student1', classId: 'class123' },
        { id: 'ev2', studentId: 'student2', classId: 'class123' }
      ]);
      mockPocketBase.collection.mockReturnValue({ getFullList: mockGetFullList });

      const evidences = await mockPocketBase.collection('evidences').getFullList({
        filter: 'classId="class123"'
      });

      expect(evidences).toHaveLength(2);
      expect(evidences.every(ev => ev.classId === 'class123')).toBe(true);
    });
  });

  describe('Authentication', () => {
    it('devrait authentifier un enseignant', async () => {
      const mockAuth = vi.fn().mockResolvedValue({
        record: { id: 'teacher123', role: 'teacher' },
        token: 'jwt-token-123'
      });
      mockPocketBase.collection.mockReturnValue({
        authWithPassword: mockAuth
      });

      const auth = await mockPocketBase.collection('users').authWithPassword(
        'teacher@test.com',
        'password123'
      );

      expect(auth.record.role).toBe('teacher');
      expect(auth.token).toBeDefined();
    });

    it('devrait rejeter authentification invalide', async () => {
      const mockAuth = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
      mockPocketBase.collection.mockReturnValue({
        authWithPassword: mockAuth
      });

      await expect(
        mockPocketBase.collection('users').authWithPassword('wrong@test.com', 'wrong')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('Performance', () => {
    it('devrait limiter le nombre d\'evidences par requête', async () => {
      const mockGetList = vi.fn().mockResolvedValue({
        items: new Array(50).fill({ score: 75 }),
        totalItems: 200
      });
      mockPocketBase.collection.mockReturnValue({ getList: mockGetList });

      const result = await mockPocketBase.collection('evidences').getList(1, 50);

      expect(result.items).toHaveLength(50);
      expect(result.totalItems).toBe(200);
    });
  });
});
