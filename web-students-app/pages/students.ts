import { Locator, Page, expect } from "@playwright/test";
import TimeoutError from "@playwright/test"
import BasePage from "./base-page";

export default class Students extends BasePage{

    readonly HEADER = 'Students Details'
    readonly header:Locator

    constructor(page:Page){
        super(page)
        this.header = page.locator('css=section div h1')
    }

    async goTo(){
        await this.page.goto('/')
    }

    async isDisplayed(){
        await expect(this.header).toHaveText('Students')
    }

}