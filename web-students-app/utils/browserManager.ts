import { Browser, chromium, firefox,  webkit, type LaunchOptions } from "@playwright/test";

export const SUPPORTED_BROWSERS = ['chromium','firefox','webkit'] as const
export type BrowserName = typeof SUPPORTED_BROWSERS[number]

// TODO: Refactor this asset to be a class contining methods to configure and launch browsers, and other related actions.

/**
 * Initalizes Playwright browser and page with specified options
 * @param baseURL 
 * @param browerName 
 * 
 * @returns Initialized new page object after when promise is resolved
 */
export default async function initPage(baseURL: string, browserName: BrowserName) {
    let browser: Browser
    const commonOptions: LaunchOptions = { headless: false };
    let customOptions:LaunchOptions
    switch (browserName) {
    case "chromium":
    default:
        customOptions = { } // Add any custom options for this specific browser
        browser = await chromium.launch({...commonOptions, ...customOptions});
        break;
    case "firefox":
        // TODO: Currently failing, need to investigate 
        customOptions = { } // Add any custom options for this specific browser
        browser = await firefox.launch({...commonOptions, ...customOptions});
        break;
    case "webkit":
        customOptions = { } // Add any custom options for this specific browser
        browser = await webkit.launch({...commonOptions, ...customOptions});
        break;
    }
    return await browser.newPage({ baseURL });
}