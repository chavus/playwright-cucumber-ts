import { Locator, Page, expect } from "@playwright/test";

export default class NavBar {
  readonly page: Page;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signOutButton = page.locator('xpath=//nav//div[@id="userDropdown"]//button[text()="Sign out"]');
  }

  async isLoggedIn() {
    await expect(this.signOutButton).toHaveCount(1)
  }

  async select(linkOrButtonText:string){
    await this.page.getByText(linkOrButtonText).locator('visible=true').click()
  }

}
