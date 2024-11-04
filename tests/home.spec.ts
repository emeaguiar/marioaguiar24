/**
 * External dependencies
 */
import { test, expect } from '@playwright/test';

test.describe( 'Homepage', () => {
    test( 'intro should match snapshot', async ({ page }) => {
        await page.goto( '/' );
    
        expect( await page.locator('#intro').screenshot({
            timeout: 3000 * 60,
        }) ).toMatchSnapshot( 'intro' );
    } );

    test( 'about should match snapshot', async ({ page }) => {
        await page.goto( '/' );
    
        expect( await page.locator('#about').screenshot({
            timeout: 1000 * 60,
        }) ).toMatchSnapshot( 'about' );
    } );

    test( 'blog should match snapshot', async ({ page }) => {
        await page.goto( '/' );
    
        expect( await page.locator('#blog').screenshot({
            mask: [
                page.locator('#blog-cards'),
            ],
        }) ).toMatchSnapshot( 'blog' );
    } );

    test( 'cta should match snapshot', async ({ page }) => {
        await page.goto( '/' );
    
        expect( await page.locator('#cta').screenshot({
            timeout: 1000 * 60,
        }) ).toMatchSnapshot( 'cta' );
    } );

    test( 'footer should match snapshot', async ({ page }) => {
        await page.goto( '/' );
    
        expect( await page.locator('#footer').screenshot({
            timeout: 1000 * 60,
        }) ).toMatchSnapshot( 'footer' );
    } );
});
