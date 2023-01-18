Feature: Add credit to customer
  In order to have customers in the platform
  I want to update customers

  Scenario: When a customer doesn't exist
    When I send a PATCH request to "/customer/addCredit/1d661eb7-9dde-4c4e-902b-3373a9f389f4" with body:
      """
      {
        "creditToAdd": 25
      }
      """
    Then The response status code should be 404
    Then The response should be empty

  Scenario: When a customer exists
    Given There are customers:
    | id                                   | name                      | email                   | age | credit |
    | 602f24ec-b427-44aa-a6a2-f280f913db7d | Test Add Credit Fernández | testaddcredit@gmail.com | 22  | 15     |
    When I send a PATCH request to "/customer/addCredit/602f24ec-b427-44aa-a6a2-f280f913db7d" with body:
      """
      {
        "creditToAdd": 10.50
      }
      """
    Then The response status code should be 204
    Then The response should be empty
    When I send a GET request to "/customer/602f24ec-b427-44aa-a6a2-f280f913db7d"
    Then The response status code should be 200
    Then The response should be:
      """
      {
        "id": "602f24ec-b427-44aa-a6a2-f280f913db7d",
        "name": "Test Add Credit Fernández",
        "email": "testaddcredit@gmail.com",
        "age": 22,
        "credit": 25.50
      }
      """