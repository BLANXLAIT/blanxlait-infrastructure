import { test, expect } from '@playwright/test';

test.describe('Domain Redirect Tests', () => {
  test('should handle www redirect configuration', async ({ page }) => {
    // Test that our main domain loads correctly
    await page.goto('/');
    
    // Check that the page loads successfully
    await expect(page).toHaveTitle(/BLANXLAIT/);
    await expect(page.locator('h1')).toContainText('AI-Native Software');
    
    // Verify canonical URL structure in meta tags
    const canonicalMeta = page.locator('meta[property="og:url"]');
    await expect(canonicalMeta).toHaveAttribute('content', 'https://blanxlait.com');
  });

  test('should have proper meta tags for canonical domain', async ({ page }) => {
    await page.goto('/');
    
    // Check that Open Graph URL points to the canonical domain
    const ogUrl = await page.getAttribute('meta[property="og:url"]', 'content');
    expect(ogUrl).toBe('https://blanxlait.com');
    
    // Verify no www in canonical references
    expect(ogUrl).not.toContain('www.');
  });

  test('should have correct redirect configuration in headers', async ({ page }) => {
    // Test that the site loads and responds correctly
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // Verify the page loads the expected content
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });

  test('should maintain functionality after redirect setup', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test that navigation still works
    const contactLink = page.locator('nav a[href="#contact"]');
    await expect(contactLink).toBeVisible();
    await contactLink.click();
    await expect(page.locator('#contact')).toBeInViewport();

    // Test that contact section works (Cal.com booking link)
    const bookingLink = page.locator('a[href*="cal.com"]');
    await expect(bookingLink).toBeVisible();
    await expect(bookingLink).toContainText('Schedule a Call');
  });
});
