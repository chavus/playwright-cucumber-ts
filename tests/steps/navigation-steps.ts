import { Given, When, Then } from "@cucumber/cucumber";
import Login from "../../web-students-app/pages/login";
import Students from "../../web-students-app/pages/students";
import type { TestContext } from "../types";
import { expect } from "@playwright/test";
import AddStudent from "../../web-students-app/pages/add-student";
import StudentsDetails from "../../web-students-app/pages/students-details";
import NavBar from "../../web-students-app/components/nav-bar";
import Modal from "../../web-students-app/components/modal";

const pages = {
  Login: Login,
  Students: Students,
  StudentsDetails: StudentsDetails,
  AddStudent: AddStudent,
};
type PageNames = keyof typeof pages;

Given(
  "I go to {string} page",
  async function (this: TestContext, pageName: PageNames) {
    pageName = pageName.replace(" ", "") as PageNames; // Just to normalize space with PageNames literals in runtime
    const page = new pages[pageName](this.page);
    await page.goTo();
  }
);

Then(
  "the {string} page is displayed",
  async function (this: TestContext, pageName: PageNames) {
    pageName = pageName.replace(" ", "") as PageNames; // Just to normalize space with PageNames literals in runtime
    const page = new pages[pageName](this.page);
    await page.isDisplayed();
  }
);

Given(
  "I select {string} from navbar",
  async function (this: TestContext, buttonName: string) {
    await new NavBar(this.page).select(buttonName);
  }
);

Then(
  "modal with message {string} is displayed and confirmed",
  async function (this: TestContext, message: string) {
    const modal = new Modal(this.page);
    console.log(await modal.textHeading.allInnerTexts());
    await expect(modal.textHeading, "Confirmation message was not displayed")
            .toHaveText(message);
    await modal.confirm();
  }
);
