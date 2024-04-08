import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./base-page";

export default class AddStudent extends BasePage{

    readonly formHeader:Locator
    readonly nameInput:Locator
    readonly bachelorSelector:Locator
    readonly gpaInput:Locator
    readonly addButton:Locator

    constructor(page:Page){
        super(page)
        this.formHeader = page.getByText('Add student:')
        this.nameInput = page.locator('css=form input#fullName')
        this.bachelorSelector = page.locator('css=form select#major')
        this.gpaInput = page.locator('css=form input#gpa')
        this.addButton = page.locator('css=form').getByRole('button',{name:'Add'})
    }

    async goTo(){
        await this.page.goto('/sw-add-student')
    }

    async isDisplayed(){
        await expect(this.formHeader).toBeVisible()
    }

    async addStudent(name:string, bachelor:string, gpa:string){
        await this.nameInput.fill(name)
        await this.bachelorSelector.selectOption({label:bachelor})
        await this.gpaInput.fill(gpa)
        await this.addButton.click()
    }

}