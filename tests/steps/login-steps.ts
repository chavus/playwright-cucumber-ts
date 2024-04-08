import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import Login from "../../web-students-app/pages/login";
import NavBar from "../../web-students-app/components/nav-bar";
import type { TestContext } from "../types";

Given("I login with valid credentials", async function (this: TestContext) {
  const login = new Login(this.page);
  await login.login(this.valid_username, "password");
});

Then("I am logged in", async function (this: TestContext) {
  await new NavBar(this.page).isLoggedIn();
});

Given(
  "I attempt to log in with {string} and {string}",
  async function (this: TestContext, username: string, password: string) {
    await new Login(this.page).login(username, password);
  }
);

Then(
  "Login page displays {string} message in alert",
  async function (this: TestContext, message: string) {
    const login = new Login(this.page);
    await expect(login.alert, { message: "Incorrect message" }).toHaveText(
      message
    );
  }
);
