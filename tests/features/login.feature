@login
Feature: Login
    I should be able to log in with valid credentials or get proper feedback when using invalid credentialsBackground:

  Background: 
    Given I go to "Login" page

  @happy_path @login1
  Scenario: Log in with valid credentials
    Given I login with valid credentials
    Then the "Students" page is displayed
    And I am logged in

  @login2
  Scenario Outline: Unable to log in with invalid credentials
    Given I attempt to log in with "<username>" and "<password>"
    Then Login page displays "Incorrect credentials. Verify your information and try again." message in alert

    Examples: 
      | username | password    |
      | baduser  | badpassword |
      |          | apassword   |
      | auser    |             |

