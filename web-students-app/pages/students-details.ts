import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./base-page";

export default class StudentsDetails extends BasePage{

    readonly HEADER = 'Students Details'
    readonly header:Locator
    readonly cardContainer:Locator

    constructor(page:Page){
        super(page)
        this.header = page.locator('css=section div h1')
        this.cardContainer = page.locator('css=section div.grid > div.flex')

    }

    async goTo(){
        await this.page.goto('/sw-details')
    }

    async isDisplayed(){
        await expect(this.header).toHaveText(this.HEADER)
    }

    async hasCardWithStudentData(name:string){
        const studentCardLocator = this.cardContainer.locator(`xpath=//h5[text()="${name}"]`)
        await expect(studentCardLocator).toBeVisible()
    }

}