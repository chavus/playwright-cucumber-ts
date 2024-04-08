import { After, Before, BeforeAll, IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import type { TestContext } from "../types";
import testConfig from "../utils/testConfig";
import initPage, { type BrowserName } from "../../web-students-app/utils/browserManager";

BeforeAll(async function(){
    testConfig()
})

setWorldConstructor(function(this:TestContext, options:IWorldOptions){
    /**
     * Initializes custom cucumber World TestContext variables
     */
    this.valid_username = process.env.VALID_USERNAME as string,
    this.valid_password = process.env.VALID_PASSWORD as string
})

Before(async function (this:TestContext){
    /**
     * Steps to execute before each scenario.
     */
    this.page = await initPage(process.env.URL as string, process.env.BROWSER as BrowserName) 
})

After(async function(this:TestContext){
    /**
     * Steps to execute after each scenario.
     */
    await this.page.close()
})