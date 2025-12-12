import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test('should have proper security headers', async ({ page, baseURL }) => {
    const response = await page.goto('/');
    
    // Check security headers
    const headers = response?.headers();
    
    // Only test security headers if we're in production (HTTPS)
    if (baseURL?.includes('https://')) {
      // X-Content-Type-Options
      expect(headers?.['x-content-type-options']).toBe('nosniff');
      
      // X-Frame-Options
      expect(headers?.['x-frame-options']).toBe('DENY');
      
      // X-XSS-Protection
      expect(headers?.['x-xss-protection']).toBe('1; mode=block');
      
      // Strict-Transport-Security
      expect(headers?.['strict-transport-security']).toContain('max-age=');
      
      // Content-Security-Policy
      expect(headers?.['content-security-policy']).toContain("default-src 'self'");
      
      // Referrer-Policy
      expect(headers?.['referrer-policy']).toBe('strict-origin-when-cross-origin');
    } else {
      // For local development, just verify the page loads securely
      expect(response?.status()).toBe(200);
      console.log('Security headers test skipped for local development');
    }
  });

  test('should have secure external links', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#contact"]');

    // Check Cal.com link has proper security attributes
    const calLink = page.locator('a[href*="cal.com"]');
    await expect(calLink).toBeVisible();
    await expect(calLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(calLink).toHaveAttribute('target', '_blank');

    // Check email link is properly formatted
    const emailLink = page.locator('a[href="mailto:hello@blanxlait.com"]');
    await expect(emailLink).toBeVisible();
  });

  test('should have proper meta tags for security', async ({ page }) => {
    await page.goto('/');
    
    // Check that meta tags don't expose sensitive information
    const metaViewport = page.locator('meta[name="viewport"]');
    await expect(metaViewport).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
    
    // Check that there's no generator meta tag exposing framework
    const metaGenerator = page.locator('meta[name="generator"]');
    await expect(metaGenerator).toHaveCount(0);
  });

  test('should not expose sensitive information in console', async ({ page }) => {
    const consoleMessages: string[] = [];
    
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });
    
    await page.goto('/');
    
    // Check that no sensitive information is logged
    const sensitivePatterns = [
      /password/i,
      /secret/i,
      /token/i,
      /api[_-]?key/i
    ];
    
    for (const message of consoleMessages) {
      for (const pattern of sensitivePatterns) {
        expect(message).not.toMatch(pattern);
      }
    }
  });

  test('should not render user-controlled content unsafely', async ({ page }) => {
    await page.goto('/');

    // Verify that the page doesn't have any inline scripts from user input
    // (Contact section now uses Cal.com external link, no form to inject)
    const inlineScripts = page.locator('script:not([src])');
    const inlineScriptCount = await inlineScripts.count();

    // Check that inline scripts don't contain suspicious patterns
    for (let i = 0; i < inlineScriptCount; i++) {
      const scriptContent = await inlineScripts.nth(i).textContent();
      expect(scriptContent).not.toContain('alert(');
      expect(scriptContent).not.toContain('eval(');
      expect(scriptContent).not.toContain('document.write(');
    }
  });

  test('should have proper HTTPS configuration', async ({ page, baseURL }) => {
    // Skip for local testing, this test is for production
    if (!baseURL?.includes('https://')) {
      console.log('HTTPS test skipped for local development');
      return;
    }
    
    const response = await page.goto('/');
    
    // Check that site uses HTTPS
    expect(page.url()).toMatch(/^https:/);
    
    // Check HSTS header
    const headers = response?.headers();
    expect(headers?.['strict-transport-security']).toBeDefined();
  });

  test('should have secure cookie settings', async ({ page, context }) => {
    await page.goto('/');
    
    // Check that any cookies set are secure
    const cookies = await context.cookies();
    
    for (const cookie of cookies) {
      if (cookie.name.includes('session') || cookie.name.includes('auth')) {
        expect(cookie.secure).toBe(true);
        expect(cookie.httpOnly).toBe(true);
        expect(cookie.sameSite).toBe('Strict');
      }
    }
  });
});
