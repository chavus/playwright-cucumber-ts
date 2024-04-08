import { When, Then } from "@cucumber/cucumber";
import AddStudent from "../../web-students-app/pages/add-student";
import type { TestContext } from "../types";
import StudentsDetails from "../../web-students-app/pages/students-details";

When(
  "I add student with following data:",
  async function (this: TestContext, table) {
    const addStudent = new AddStudent(this.page);
    const studentData: [string, string, string] = table.rows()[0];
    await addStudent.addStudent(...studentData);
    this.newStudentName = studentData[0]; // Using Cucumber World to set variables to be shared across steps
  }
);

Then(
  "new student card is in Students Details page",
  async function (this: TestContext) {
    const studentsDetails = new StudentsDetails(this.page);
    await studentsDetails.hasCardWithStudentData(this.newStudentName);
  }
);
