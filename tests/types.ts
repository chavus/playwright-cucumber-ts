import type { Page } from "@playwright/test"

export interface TestContext {
    page:Page
    valid_username:string
    valid_password:string
    newStudentName:string
}
