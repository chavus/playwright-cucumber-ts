import { Page } from "@playwright/test";

export default class BasePage{
    
    // Include here any attributes that are common for all pages in the application.
    readonly page:Page

    constructor(page:Page){
        this.page = page
    }

    // Include here any methods that are common for all pages in the application.

}