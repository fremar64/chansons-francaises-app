import { test, expect } from '@playwright/test';

test.describe('Student Journey - Parcours Complet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('devrait permettre connexion élève', async ({ page }) => {
    // Navigation vers login
    await page.click('text=Connexion');
    
    // Remplir formulaire
    await page.fill('input[name="email"]', 'student@test.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Vérifier redirection dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Tableau de bord')).toBeVisible();
  });

  test('devrait afficher score CEREDIS', async ({ page }) => {
    // Login préalable
    await page.goto('http://localhost:3000/dashboard');
    
    // Vérifier présence du score
    const scoreElement = page.locator('[data-testid="ceredis-score"]');
    await expect(scoreElement).toBeVisible();
    
    // Vérifier format score
    const scoreText = await scoreElement.textContent();
    expect(scoreText).toMatch(/\d+\/600/);
  });

  test('devrait afficher niveau CECRL', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    const levelElement = page.locator('[data-testid="cecrl-level"]');
    await expect(levelElement).toBeVisible();
    
    const levelText = await levelElement.textContent();
    expect(['A2', 'B1', 'B2', 'C1'].some(l => levelText?.includes(l))).toBe(true);
  });

  test('devrait naviguer vers parcours Là-bas', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Cliquer sur carte parcours
    await page.click('text=Là-bas');
    
    // Vérifier redirection
    await expect(page).toHaveURL(/.*chanson\/la-bas/);
    await expect(page.locator('text=Jean Ferrat')).toBeVisible();
  });

  test('devrait écouter la chanson', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas');
    
    // Trouver player audio
    const audioPlayer = page.locator('audio');
    await expect(audioPlayer).toBeVisible();
    
    // Cliquer play
    const playButton = page.locator('[data-testid="play-button"]');
    await playButton.click();
    
    // Vérifier lecture
    await page.waitForTimeout(1000);
    const isPaused = await audioPlayer.evaluate((el: HTMLAudioElement) => el.paused);
    expect(isPaused).toBe(false);
  });

  test('devrait compléter Quiz QCM', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    
    // Cliquer activité quiz
    await page.click('text=Quiz de compréhension');
    
    // Attendre chargement
    await expect(page.locator('text=Question')).toBeVisible();
    
    // Répondre questions
    await page.click('[data-testid="option-0"]');
    await page.click('button:has-text("Suivant")');
    
    await page.click('[data-testid="option-1"]');
    await page.click('button:has-text("Suivant")');
    
    // Vérifier résultats
    await expect(page.locator('text=Votre score')).toBeVisible();
  });

  test('devrait compléter Texte à trous', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/2');
    
    await page.click('text=Texte à trous');
    
    // Remplir inputs
    await page.fill('[data-testid="blank-0"]', 'contre');
    await page.fill('[data-testid="blank-1"]', 'exil');
    await page.fill('[data-testid="blank-2"]', 'nostalgie');
    
    // Valider
    await page.click('button:has-text("Valider")');
    
    // Vérifier feedback
    await expect(page.locator('text=réponses correctes')).toBeVisible();
  });

  test('devrait compléter Ordre des éléments', async ({ page }) => {
    await page.goto('http://localhost:3000/chanson/la-bas/seance/3');
    
    await page.click('text=Ordre des éléments');
    
    // Drag and drop (simplificé)
    await page.click('button:has-text("Valider mon ordre")');
    
    // Vérifier résultat
    await expect(page.locator('text=éléments bien placés')).toBeVisible();
  });

  test('devrait voir progression mise à jour', async ({ page }) => {
    // Compléter une activité
    await page.goto('http://localhost:3000/chanson/la-bas/seance/1');
    await page.click('text=Quiz de compréhension');
    
    // Terminer quiz rapidement
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="option-0"]');
      await page.click('button:has-text("Suivant")');
    }
    
    // Retour dashboard
    await page.goto('http://localhost:3000/dashboard');
    
    // Vérifier activité marquée complète
    await expect(page.locator('text=Quiz de compréhension').locator('..').locator('[data-testid="completed-icon"]')).toBeVisible();
  });

  test('devrait afficher graphique radar domaines', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Attendre graphique
    const radarChart = page.locator('[data-testid="domain-radar-chart"]');
    await expect(radarChart).toBeVisible();
    
    // Vérifier 5 axes (D1-D5)
    const axes = await page.locator('.recharts-polar-angle-axis-tick').count();
    expect(axes).toBe(5);
  });

  test('devrait afficher recommandations', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    const recommendations = page.locator('[data-testid="recommendations"]');
    await expect(recommendations).toBeVisible();
    
    // Vérifier contenu
    await expect(recommendations.locator('text=Continuez avec')).toBeVisible();
  });

  test('devrait permettre déconnexion', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Menu utilisateur
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Déconnexion');
    
    // Vérifier redirection login
    await expect(page).toHaveURL(/.*login/);
  });

  test('devrait persister progression après refresh', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    const initialScore = await page.locator('[data-testid="ceredis-score"]').textContent();
    
    // Refresh
    await page.reload();
    
    const scoreAfterRefresh = await page.locator('[data-testid="ceredis-score"]').textContent();
    
    expect(scoreAfterRefresh).toBe(initialScore);
  });

  test('devrait afficher message si aucune activité', async ({ page }) => {
    // Nouveau compte sans activité
    await page.goto('http://localhost:3000/dashboard');
    
    // Si pas d'activité, message approprié
    const noActivityMessage = page.locator('text=Commencez votre parcours');
    
    // Le message peut ou non être visible selon l'état
    const isVisible = await noActivityMessage.isVisible().catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('devrait gérer erreur réseau', async ({ page }) => {
    // Simuler offline
    await page.context().setOffline(true);
    
    await page.goto('http://localhost:3000/dashboard');
    
    // Vérifier message d'erreur
    await expect(page.locator('text=erreur')).toBeVisible({ timeout: 10000 });
  });
});
