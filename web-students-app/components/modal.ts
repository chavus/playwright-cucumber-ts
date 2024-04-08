import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../pages/base-page";

export default class Modal extends BasePage {
  readonly dialogContainer: Locator;
  readonly textHeading: Locator;
  readonly okButton: Locator;

  constructor(page: Page) {
    super(page);
    this.dialogContainer = page.getByTestId("modal").locator("visible=true");
    this.textHeading = this.dialogContainer.locator("css=div.text-center h2");
    this.okButton = this.dialogContainer.getByRole("button", { name: "Ok" });
  }

  async confirm(){
    this.okButton.click()
  }

}
