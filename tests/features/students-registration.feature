@students_registration
Feature: Students registration
    I should 

Background:
    Given I go to "Students" page

@add_student_1
Scenario: Try to add student without being logged in
    Given I select "Add Student" from navbar
    Then the "Login" page is displayed
    And Login page displays "Log in to access page." message in alert
    When I login with valid credentials
    Then I am logged in
    And the "Add Student" page is displayed

@happy_path
@add_student_2
Scenario: Add student being logged in
    Given I select "Log In" from navbar
    Then the "Login" page is displayed
    When I login with valid credentials
    Then the "Students" page is displayed
    And I am logged in
    When I select "Add Student" from navbar
    Then the "Add Student" page is displayed
    When I add student with following data:
        | full_name  | bachelor | gpa |
        | John Smith | Business | 3.5 |
    Then modal with message "Student added!" is displayed and confirmed
    And the "Students Details" page is displayed
    And new student card is in Students Details page
