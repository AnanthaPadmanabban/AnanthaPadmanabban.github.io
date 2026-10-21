import { test, expect } from '@playwright/test';

test.describe('Portfolio Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle('P. Anantha Padmanabban');
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('Portfolio of P. Anantha Padmanabban');
  });

  test('should render header section with contact info and working links', async ({ page }) => {
    const header = page.locator('header');
    await expect(header.locator('h1')).toHaveText('P. Anantha Padmanabban');
    await expect(header).toContainText('Mechatronics Engineering Graduate | AI & Robotics Enthusiast');

    const emailLink = header.locator('a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:anantha.padmanabban5122003@gmail.com');
    await expect(emailLink).toHaveText('Email Me');

    const githubLink = header.locator('a[href="https://github.com/AnanthaPadmanabban"]');
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/AnanthaPadmanabban');
    await expect(githubLink).toHaveText('GitHub Profile');
  });

  test('should render Executive Summary section', async ({ page }) => {
    const summarySection = page.locator('#ExecutiveSummary');
    await expect(summarySection).toBeVisible();
    await expect(summarySection.locator('h2')).toHaveText('Executive Summary');
    await expect(summarySection).toContainText('Mechatronics Engineering graduate pursuing an M.Tech in AI and Robotics at SASTRA University');
  });

  test('should render Technical Skills section and skill tags', async ({ page }) => {
    const skillsSection = page.locator('#TechnicalSkills');
    await expect(skillsSection).toBeVisible();
    await expect(skillsSection.locator('h2')).toHaveText('Technical Skills');

    const skillTags = skillsSection.locator('.SkillTag');
    await expect(skillTags).toHaveCount(8);
    const expectedSkills = [
      'Python',
      'MATLAB-Simulink',
      'LabView',
      'PTC-Creo',
      'ROS2',
      'PLC Programming',
      'Machine Learning',
      'Industrial Automation'
    ];
    await expect(skillTags).toHaveText(expectedSkills);
  });

  test('should render Experience & Internships section with project cards', async ({ page }) => {
    const expSection = page.locator('#ProfessionalExperience');
    await expect(expSection).toBeVisible();
    await expect(expSection.locator('h2')).toHaveText('Experience & Internships');

    const cards = expSection.locator('.ProjectCard');
    await expect(cards).toHaveCount(2);

    await expect(cards.nth(0).locator('.ProjectTitle')).toContainText('Atribs Software System Ltd');
    await expect(cards.nth(1).locator('.ProjectTitle')).toContainText('Hyundai Motors India Limited');
  });

  test('should render Projects section with project cards', async ({ page }) => {
    const projectsSection = page.locator('#KeyProjects');
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection.locator('h2')).toHaveText('Projects');

    const cards = projectsSection.locator('.ProjectCard');
    await expect(cards).toHaveCount(4);

    const titles = cards.locator('.ProjectTitle');
    const expectedTitles = [
      'RoboVision Assistant',
      'Preventive MaintenanceSystem',
      'CVD Process Optimization',
      'LabViewSimulation_Published'
    ];
    await expect(titles).toHaveText(expectedTitles);
  });

  test('should render Education section with list items', async ({ page }) => {
    const eduSection = page.locator('#EducationBackground');
    await expect(eduSection).toBeVisible();
    await expect(eduSection.locator('h2')).toHaveText('Education');

    const listItems = eduSection.locator('ul li');
    await expect(listItems).toHaveCount(2);
    await expect(listItems.nth(0)).toContainText('M.Tech AI & Robotics');
    await expect(listItems.nth(1)).toContainText('B.E Mechatronics');
  });

  test('should render footer section', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('© 2026 P. Anantha Padmanabban | Built with GitHub Pages');
  });
});
