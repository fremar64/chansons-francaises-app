import { test, expect } from '@playwright/test';

test.describe('Teacher Dashboard - Tableau de bord enseignant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('devrait permettre connexion enseignant', async ({ page }) => {
    await page.click('text=Connexion');
    
    await page.fill('input[name="email"]', 'teacher@test.com');
    await page.fill('input[name="password"]', 'password123');
    
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*enseignant/);
    await expect(page.locator('text=Mes classes')).toBeVisible();
  });

  test('devrait afficher liste des classes', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/dashboard');
    
    const classList = page.locator('[data-testid="class-list"]');
    await expect(classList).toBeVisible();
    
    // Au moins une classe
    const classCount = await classList.locator('[data-testid="class-card"]').count();
    expect(classCount).toBeGreaterThan(0);
  });

  test('devrait afficher statistiques de classe', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Stats globales
    await expect(page.locator('text=Nombre d\'élèves')).toBeVisible();
    await expect(page.locator('text=Score moyen')).toBeVisible();
    await expect(page.locator('text=Taux de complétion')).toBeVisible();
  });

  test('devrait afficher liste des élèves', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    const studentTable = page.locator('[data-testid="student-table"]');
    await expect(studentTable).toBeVisible();
    
    // Colonnes
    await expect(studentTable.locator('th:has-text("Nom")')).toBeVisible();
    await expect(studentTable.locator('th:has-text("Score CEREDIS")')).toBeVisible();
    await expect(studentTable.locator('th:has-text("Niveau CECRL")')).toBeVisible();
  });

  test('devrait trier élèves par score', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Cliquer en-tête colonne
    await page.click('th:has-text("Score CEREDIS")');
    
    // Vérifier ordre décroissant
    await page.waitForTimeout(500);
    
    const scores = await page.locator('[data-testid="student-score"]').allTextContents();
    const scoresNum = scores.map(s => parseInt(s));
    
    // Vérifier tri (premier >= dernier)
    expect(scoresNum[0]).toBeGreaterThanOrEqual(scoresNum[scoresNum.length - 1]);
  });

  test('devrait filtrer par niveau CECRL', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Sélectionner filtre
    await page.selectOption('[data-testid="level-filter"]', 'B2');
    
    // Vérifier que seuls élèves B2 affichés
    await page.waitForTimeout(500);
    
    const levels = await page.locator('[data-testid="student-level"]').allTextContents();
    expect(levels.every(l => l.includes('B2'))).toBe(true);
  });

  test('devrait voir détail élève', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Cliquer sur premier élève
    await page.click('[data-testid="student-row"]');
    
    // Vérifier modal/page détail
    await expect(page.locator('text=Détail de l\'élève')).toBeVisible();
    
    // Vérifier graphiques
    await expect(page.locator('[data-testid="domain-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="competency-chart"]')).toBeVisible();
  });

  test('devrait afficher graphique distribution CECRL', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    const distributionChart = page.locator('[data-testid="cecrl-distribution"]');
    await expect(distributionChart).toBeVisible();
    
    // Vérifier présence des 4 niveaux
    await expect(page.locator('text=A2')).toBeVisible();
    await expect(page.locator('text=B1')).toBeVisible();
    await expect(page.locator('text=B2')).toBeVisible();
    await expect(page.locator('text=C1')).toBeVisible();
  });

  test('devrait afficher graphique évolution classe', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    const evolutionChart = page.locator('[data-testid="evolution-chart"]');
    await expect(evolutionChart).toBeVisible();
    
    // Vérifier axes
    await expect(page.locator('text=Score moyen')).toBeVisible();
  });

  test('devrait identifier élèves en difficulté', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    const alertSection = page.locator('[data-testid="students-at-risk"]');
    await expect(alertSection).toBeVisible();
    
    // Message si élèves < 200 points
    const hasAlerts = await alertSection.locator('[data-testid="alert-student"]').count();
    
    if (hasAlerts > 0) {
      await expect(alertSection.locator('text=nécessite attention')).toBeVisible();
    }
  });

  test('devrait afficher analyse par domaine', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    await page.click('text=Analyse par domaine');
    
    // 5 domaines
    for (let i = 1; i <= 5; i++) {
      await expect(page.locator(`text=D${i}`)).toBeVisible();
    }
    
    // Score moyen par domaine
    await expect(page.locator('[data-testid="domain-average"]')).toHaveCount(5);
  });

  test('devrait afficher taux de complétion activités', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    await page.click('text=Activités');
    
    const activityTable = page.locator('[data-testid="activity-completion"]');
    await expect(activityTable).toBeVisible();
    
    // Colonnes
    await expect(page.locator('th:has-text("Activité")')).toBeVisible();
    await expect(page.locator('th:has-text("Complété par")')).toBeVisible();
    await expect(page.locator('th:has-text("Score moyen")')).toBeVisible();
  });

  test('devrait exporter données CSV', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Cliquer export
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Exporter CSV")');
    
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('devrait exporter rapport PDF', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Rapport PDF")');
    
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('devrait comparer deux élèves', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Sélectionner 2 élèves
    await page.click('[data-testid="student-checkbox"]:nth-of-type(1)');
    await page.click('[data-testid="student-checkbox"]:nth-of-type(2)');
    
    // Cliquer comparer
    await page.click('button:has-text("Comparer")');
    
    // Vérifier vue comparaison
    await expect(page.locator('text=Comparaison des élèves')).toBeVisible();
    await expect(page.locator('[data-testid="comparison-chart"]')).toBeVisible();
  });

  test('devrait afficher recommandations pédagogiques', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    const recommendations = page.locator('[data-testid="pedagogical-recommendations"]');
    await expect(recommendations).toBeVisible();
    
    // Basé sur domaines faibles
    await expect(recommendations.locator('text=Renforcer')).toBeVisible();
  });

  test('devrait créer nouvelle classe', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/dashboard');
    
    await page.click('button:has-text("Nouvelle classe")');
    
    // Formulaire
    await page.fill('input[name="className"]', 'CM2 B');
    await page.fill('input[name="year"]', '2025-2026');
    
    await page.click('button[type="submit"]');
    
    // Vérifier création
    await expect(page.locator('text=CM2 B')).toBeVisible();
  });

  test('devrait ajouter élève à classe', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    await page.click('button:has-text("Ajouter élève")');
    
    await page.fill('input[name="firstName"]', 'Jean');
    await page.fill('input[name="lastName"]', 'Dupont');
    await page.fill('input[name="email"]', 'jean.dupont@test.com');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Jean Dupont')).toBeVisible();
  });

  test('devrait voir historique activités élève', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/eleve/student123');
    
    const timeline = page.locator('[data-testid="activity-timeline"]');
    await expect(timeline).toBeVisible();
    
    // Événements chronologiques
    const events = await timeline.locator('[data-testid="timeline-event"]').count();
    expect(events).toBeGreaterThan(0);
  });

  test('devrait filtrer par période', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Sélectionner période
    await page.selectOption('[data-testid="period-filter"]', 'last-month');
    
    await page.waitForTimeout(500);
    
    // Stats mises à jour
    await expect(page.locator('[data-testid="period-indicator"]')).toContainText('Dernier mois');
  });

  test('devrait gérer pagination élèves', async ({ page }) => {
    await page.goto('http://localhost:3000/enseignant/classe/class123');
    
    // Si > 20 élèves, pagination
    const nextButton = page.locator('[data-testid="pagination-next"]');
    
    if (await nextButton.isVisible()) {
      await nextButton.click();
      
      // Page 2
      await expect(page.locator('[data-testid="page-indicator"]')).toContainText('2');
    }
  });
});
