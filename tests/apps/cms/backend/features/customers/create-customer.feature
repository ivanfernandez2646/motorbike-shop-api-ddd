Feature: Create customer
  In order to have customers in the platform
  I want to create customers

  Scenario: When a customer doesn't exist
    When I send a PUT request to "/customer/04deff28-6c34-4634-a7c8-a4a09dabd87a" with body:
      """
      {
        "name": "Prueba Fernández",
        "email": "testprueba@gmail.com",
        "age": 50
      }
      """
    Then The response status code should be 201
    Then The response should be empty

  Scenario: When a customer exists
    Given There are customers:
    | id                                   | name           | email              | age |
    | 749dbded-bae2-43ac-9537-0d71bddb6f9a | Test Fernández | testtest@gmail.com | 11  |
    When I send a PUT request to "/customer/749dbded-bae2-43ac-9537-0d71bddb6f9a" with body:
      """
      {
        "name": "Test Fernández is going to fail",
        "email": "abc@gmmail.com",
        "age": 18
      }
      """
    Then The response status code should be 302
    Then The response should be empty