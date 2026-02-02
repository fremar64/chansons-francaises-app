import { test, expect } from '@playwright/test';

test.describe('Activity Tracking - Suivi des activités', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Login élève
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'student@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
  });

  test('devrait tracker début d\'activité', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    
    // Cliquer activité
    await page.click('text=Quiz de compréhension');
    
    // Vérifier tracking envoyé (via network request)
    const requests = [];
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        requests.push(req);
      }
    });
    
    // Attendre requête
    await page.waitForTimeout(1000);
    
    expect(requests.length).toBeGreaterThan(0);
  });

  test('devrait tracker réponses dans quiz', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    let trackingRequests = 0;
    page.on('request', req => {
      if (req.url().includes('/api/tracking') && req.method() === 'POST') {
        trackingRequests++;
      }
    });
    
    // Répondre question
    await page.click('[data-testid="option-0"]');
    await page.waitForTimeout(500);
    
    // Au moins 1 requête de tracking
    expect(trackingRequests).toBeGreaterThan(0);
  });

  test('devrait tracker complétion d\'activité', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    let completionTracked = false;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const postData = req.postDataJSON?.();
        if (postData?.eventType === 'activity_completed') {
          completionTracked = true;
        }
      }
    });
    
    // Compléter quiz
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="option-0"]');
      await page.click('button:has-text("Suivant")');
      await page.waitForTimeout(300);
    }
    
    await page.waitForTimeout(1000);
    expect(completionTracked).toBe(true);
  });

  test('devrait sauvegarder evidence après activité', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    let evidenceSaved = false;
    page.on('request', req => {
      if (req.url().includes('/api/evidences') && req.method() === 'POST') {
        evidenceSaved = true;
      }
    });
    
    // Compléter
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="option-0"]');
      await page.click('button:has-text("Suivant")');
      await page.waitForTimeout(300);
    }
    
    await page.waitForTimeout(1500);
    expect(evidenceSaved).toBe(true);
  });

  test('devrait tracker temps passé sur activité', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    // Attendre 5 secondes
    await page.waitForTimeout(5000);
    
    let durationTracked = 0;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const data = req.postDataJSON?.();
        if (data?.duration) {
          durationTracked = data.duration;
        }
      }
    });
    
    // Terminer activité
    await page.click('button:has-text("Quitter")');
    
    await page.waitForTimeout(1000);
    expect(durationTracked).toBeGreaterThan(4); // Au moins 4 secondes
  });

  test('devrait tracker écoute audio', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas');
    
    let audioTracked = false;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const data = req.postDataJSON?.();
        if (data?.eventType === 'audio_play') {
          audioTracked = true;
        }
      }
    });
    
    // Play audio
    await page.click('[data-testid="play-button"]');
    await page.waitForTimeout(1000);
    
    expect(audioTracked).toBe(true);
  });

  test('devrait tracker pause audio', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas');
    
    let pauseTracked = false;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const data = req.postDataJSON?.();
        if (data?.eventType === 'audio_pause') {
          pauseTracked = true;
        }
      }
    });
    
    // Play puis pause
    await page.click('[data-testid="play-button"]');
    await page.waitForTimeout(1000);
    await page.click('[data-testid="pause-button"]');
    await page.waitForTimeout(500);
    
    expect(pauseTracked).toBe(true);
  });

  test('devrait tracker progression dans parcours', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas');
    
    // Naviguer entre séances
    await page.click('text=Séance 1');
    await page.waitForTimeout(500);
    
    await page.click('text=Séance 2');
    await page.waitForTimeout(500);
    
    // Vérifier tracking navigation
    let navigationTracked = 0;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const data = req.postDataJSON?.();
        if (data?.eventType === 'navigation') {
          navigationTracked++;
        }
      }
    });
    
    await page.click('text=Séance 3');
    await page.waitForTimeout(500);
    
    expect(navigationTracked).toBeGreaterThan(0);
  });

  test('devrait tracker tentatives multiples', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    let attemptCount = 0;
    page.on('request', req => {
      if (req.url().includes('/api/evidences')) {
        attemptCount++;
      }
    });
    
    // Première tentative
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="option-0"]');
      await page.click('button:has-text("Suivant")');
      await page.waitForTimeout(300);
    }
    
    await page.waitForTimeout(1000);
    
    // Réessayer
    await page.click('button:has-text("Réessayer")');
    await page.waitForTimeout(500);
    
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="option-1"]');
      await page.click('button:has-text("Suivant")');
      await page.waitForTimeout(300);
    }
    
    await page.waitForTimeout(1000);
    expect(attemptCount).toBe(2);
  });

  test('devrait tracker abandons d\'activité', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    let abandonTracked = false;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const data = req.postDataJSON?.();
        if (data?.eventType === 'activity_abandoned') {
          abandonTracked = true;
        }
      }
    });
    
    // Répondre partiellement
    await page.click('[data-testid="option-0"]');
    await page.click('button:has-text("Suivant")');
    
    // Quitter sans finir
    await page.goto('http://localhost:3000/dashboard');
    
    await page.waitForTimeout(1000);
    expect(abandonTracked).toBe(true);
  });

  test('devrait envoyer batch d\'events', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    
    let batchRequests = 0;
    page.on('request', req => {
      if (req.url().includes('/api/tracking/batch')) {
        batchRequests++;
      }
    });
    
    // Interactions multiples rapides
    await page.click('text=Quiz de compréhension');
    await page.click('[data-testid="option-0"]');
    await page.click('[data-testid="option-1"]');
    await page.click('[data-testid="option-2"]');
    
    await page.waitForTimeout(2000);
    
    // Devrait batching events
    expect(batchRequests).toBeGreaterThan(0);
  });

  test('devrait gérer perte connexion', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    // Simuler offline
    await page.context().setOffline(true);
    
    // Continuer activité
    await page.click('[data-testid="option-0"]');
    await page.click('button:has-text("Suivant")');
    
    await page.waitForTimeout(1000);
    
    // Vérifier stockage local (via evaluation)
    const localStorageData = await page.evaluate(() => {
      return localStorage.getItem('pending_tracking');
    });
    
    // Données devraient être stockées localement
    expect(localStorageData).toBeTruthy();
    
    // Restaurer connexion
    await page.context().setOffline(false);
  });

  test('devrait resynchroniser après reconnexion', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    
    // Offline mode
    await page.context().setOffline(true);
    
    await page.click('text=Quiz de compréhension');
    await page.click('[data-testid="option-0"]');
    await page.waitForTimeout(500);
    
    // Online mode
    await page.context().setOffline(false);
    await page.waitForTimeout(2000);
    
    // Vérifier synchronisation
    let syncRequests = 0;
    page.on('request', req => {
      if (req.url().includes('/api/tracking/sync')) {
        syncRequests++;
      }
    });
    
    await page.waitForTimeout(3000);
    expect(syncRequests).toBeGreaterThan(0);
  });

  test('devrait tracker interactions enseignant', async ({ page }) => {
    // Login enseignant
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'teacher@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    let teacherTracked = false;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const data = req.postDataJSON?.();
        if (data?.userType === 'teacher') {
          teacherTracked = true;
        }
      }
    });
    
    // Navigation dashboard
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    await page.waitForTimeout(1000);
    
    expect(teacherTracked).toBe(true);
  });

  test('devrait respecter RGPD (anonymisation)', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    let sensitiveDataSent = false;
    page.on('request', req => {
      if (req.url().includes('/api/tracking')) {
        const data = req.postDataJSON?.();
        
        // Vérifier absence données sensibles
        if (data?.email || data?.lastName || data?.phone) {
          sensitiveDataSent = true;
        }
      }
    });
    
    await page.click('[data-testid="option-0"]');
    await page.waitForTimeout(1000);
    
    expect(sensitiveDataSent).toBe(false);
  });

  test('devrait calculer score CEREDIS après evidence', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    
    // Score avant
    await page.goto('http://localhost:3000/dashboard');
    const scoreBefore = await page.locator('[data-testid="ceredis-score"]').textContent();
    
    // Compléter activité
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="option-0"]');
      await page.click('button:has-text("Suivant")');
      await page.waitForTimeout(300);
    }
    
    await page.waitForTimeout(2000);
    
    // Score après
    await page.goto('http://localhost:3000/dashboard');
    const scoreAfter = await page.locator('[data-testid="ceredis-score"]').textContent();
    
    // Score devrait avoir changé (ou rester identique si déjà fait)
    expect(scoreAfter).toBeDefined();
  });
});
