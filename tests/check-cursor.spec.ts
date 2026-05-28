import { test, expect } from '@playwright/test';
import path from 'path';

test('cursor moves with typing', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Capture initial state right after load
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/cursor-01-initial.png' });

  // Record cursor transform at start (before typing)
  const t0 = await page.locator('.typewriter-cursor').first().evaluate(el => el.style.transform);
  console.log('t0 transform (pre-typing):', t0);

  // Wait for delay (1.4s) + some typing
  await page.waitForTimeout(2200);
  await page.screenshot({ path: '/tmp/cursor-02-mid-typing.png' });

  const t1 = await page.locator('.typewriter-cursor').first().evaluate(el => el.style.transform);
  console.log('t1 transform (mid-typing):', t1);

  // Wait for greeting to finish + headline to start
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '/tmp/cursor-03-headline.png' });

  // Check how many cursors are visible
  const cursorCount = await page.locator('.typewriter-cursor').count();
  const lastCursor = page.locator('.typewriter-cursor').last();
  const t2 = await lastCursor.evaluate(el => el.style.transform);
  console.log('Final cursor count:', cursorCount);
  console.log('t2 transform (headline):', t2);
});
