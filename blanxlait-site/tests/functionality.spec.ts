import { test, expect } from '@playwright/test';

test.describe('Core Functionality Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page loads with BLANXLAIT title
    await expect(page).toHaveTitle(/BLANXLAIT/);
    
    // Check main heading is visible
    await expect(page.locator('h1')).toContainText('AI-Native Software');
    
    // Check hero section is visible
    await expect(page.locator('text=BLANXLAIT develops intelligent applications')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load fully
    await page.waitForLoadState('networkidle');
    
    // Test navigation links - use more reliable selectors with force click for mobile
    const servicesLink = page.locator('nav a[href="#services"]');
    await expect(servicesLink).toBeVisible();
    await servicesLink.scrollIntoViewIfNeeded();
    await servicesLink.click({ force: true });
    await expect(page.locator('#services')).toBeInViewport();
    
    const aboutLink = page.locator('nav a[href="#about"]');
    await aboutLink.scrollIntoViewIfNeeded();
    await aboutLink.click({ force: true });
    await expect(page.locator('#about')).toBeInViewport();
    
    const contactLink = page.locator('nav a[href="#contact"]');
    await contactLink.scrollIntoViewIfNeeded();
    await contactLink.click({ force: true });
    await expect(page.locator('#contact')).toBeInViewport();
    
    const homeLink = page.locator('nav a[href="/"]');
    await homeLink.scrollIntoViewIfNeeded();
    await homeLink.click({ force: true });
    // Check we're back at top - use hero section as it's more reliable
    await expect(page.locator('.hero')).toBeInViewport();
  });

  test('should display all service cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to services section
    const servicesLink = page.locator('nav a[href="#services"]');
    await expect(servicesLink).toBeVisible();
    await servicesLink.click();
    
    // Check all three service cards are visible using more specific selectors
    await expect(page.locator('#services h3').filter({ hasText: 'AI-Native Applications' })).toBeVisible();
    await expect(page.locator('#services h3').filter({ hasText: 'Smart Business Process Automation' })).toBeVisible();
    await expect(page.locator('#services h3').filter({ hasText: 'AI Strategy & Consulting' })).toBeVisible();
    
    // Check service features are displayed using proper text locators
    await expect(page.locator('#services').getByText('Machine Learning Integration')).toBeVisible();
    await expect(page.locator('#services').getByText('Workflow Optimization')).toBeVisible();
    await expect(page.locator('#services').getByText('AI Readiness Assessment')).toBeVisible();
  });

  test('should have contact section with Cal.com booking', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const contactLink = page.locator('nav a[href="#contact"]');
    await expect(contactLink).toBeVisible();
    await contactLink.scrollIntoViewIfNeeded();
    await contactLink.click({ force: true });

    // Check contact section content
    await expect(page.locator('#contact h3')).toContainText('Book a Free Consultation');

    // Check Cal.com booking link
    const bookingLink = page.locator('a[href*="cal.com"]');
    await expect(bookingLink).toBeVisible();
    await expect(bookingLink).toContainText('Schedule a Call');

    // Check email fallback
    await expect(page.locator('a[href="mailto:hello@blanxlait.com"]')).toBeVisible();
  });

  test('should display contact info cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to contact section
    const contactLink = page.locator('nav a[href="#contact"]');
    await contactLink.click({ force: true });

    // Check info cards are displayed
    await expect(page.locator('.contact-info-card')).toHaveCount(3);
    await expect(page.locator('text=Minutes')).toBeVisible();
    await expect(page.locator('text=Response Time')).toBeVisible();
    await expect(page.locator('text=Expert Guidance')).toBeVisible();
  });

  test('should display footer content correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check footer elements
    await expect(page.locator('footer')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('footer .logo')).toContainText('BLANXLAIT');
    await expect(page.locator('footer .footer-copyright')).toContainText('© 2025 BLANXLAIT. All rights reserved.');
    
    // Check footer links
    await expect(page.locator('footer a[href="#about"]')).toBeVisible();
    await expect(page.locator('footer a[href="#contact"]')).toBeVisible();
    
    // Check social media links
    await expect(page.locator('footer a[href*="linkedin"]')).toBeVisible();
    await expect(page.locator('footer a[href*="twitter"]')).toBeVisible();
    await expect(page.locator('footer a[href*="github"]')).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test hero CTA buttons functionality
    const primaryCTA = page.locator('button:has-text("Start Your AI Journey")').first();
    const secondaryCTA = page.locator('button:has-text("Learn More")').first();
    
    await expect(primaryCTA).toBeVisible();
    await expect(secondaryCTA).toBeVisible();
    
    // Test "Start Your AI Journey" button scrolls to contact
    await primaryCTA.click();
    await expect(page.locator('#contact')).toBeInViewport();
    
    // Test "Learn More" button scrolls to about (start fresh)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await secondaryCTA.click();
    await expect(page.locator('#about')).toBeInViewport();
    
    // Test services "Explore All Services" button
    const servicesButton = page.locator('button:has-text("Explore All Services")');
    await expect(servicesButton).toBeVisible();
    await servicesButton.click();
    await expect(page.locator('#contact')).toBeInViewport();
    
    // Check Get Started button in header
    const headerCTA = page.locator('a:has-text("Get Started")');
    await expect(headerCTA).toBeVisible();
    await expect(headerCTA).toHaveAttribute('href', '#contact');
  });

  test('should display company information correctly', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#about"]');
    
    // Check about section content
    await expect(page.locator('text=Why Choose BLANXLAIT')).toBeVisible();
    await expect(page.locator('text=AI-First Approach')).toBeVisible();
    await expect(page.locator('text=SMB Focus')).toBeVisible();
    await expect(page.locator('text=Practical Innovation')).toBeVisible();
    
    // Check mission section
    await expect(page.locator('text=Our Mission')).toBeVisible();
    await expect(page.locator('text=To democratize AI')).toBeVisible();
    
    // Check stats
    await expect(page.locator('text=100+')).toBeVisible();
    await expect(page.locator('text=50+')).toBeVisible();
  });
});
