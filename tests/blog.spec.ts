/**
 * External dependencies
 */
import { test, expect } from '@playwright/test';

test( 'Blog page', async ({ page }) => {
    await page.goto( '/blog' );

    expect( await page.screenshot( { animations: 'disabled' } ) ).toMatchSnapshot( 'blog' );
} );