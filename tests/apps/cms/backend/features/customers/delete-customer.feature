Feature: Delete customer
  In order to have customers in the platform
  I want to delete customers

  Scenario: When a customer doesn't exist
    When I send a DELETE request to "/customer/1697e9fe-c3e9-4dd9-9709-ef69b82411a0"
    Then The response status code should be 404
    Then The response should be empty

  Scenario: When a customer exists
    Given There are customers:
    | id                                   | name                  | email                     | age |
    | 90711cac-700b-4f44-b00e-407a901ea080 | Test Delete Fernández | testtestdeleter@gmail.com | 18  |
    When I send a DELETE request to "/customer/90711cac-700b-4f44-b00e-407a901ea080"
    Then The response status code should be 200
    Then The response should be empty