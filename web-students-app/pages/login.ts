import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";
export default class Login extends BasePage{
    
    readonly usernameInput:Locator
    readonly passwordInput:Locator
    readonly loginButton:Locator
    readonly alert:Locator

    constructor(page:Page){
        super(page)
        this.usernameInput = page.locator('css=input#username')
        this.passwordInput = page.locator('css=input#password')
        this.loginButton = page.getByRole('button', { name: 'Log In' })
        this.alert = page.getByTestId('flowbite-alert-wrapper')
    }

    async goTo(){
        await this.page.goto('/sw-login-client')
    }

    async login(username:string, password:string){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async isDisplayed(){}

}

