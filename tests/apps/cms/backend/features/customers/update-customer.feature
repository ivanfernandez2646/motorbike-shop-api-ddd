Feature: Update customer
  In order to have customers in the platform
  I want to update customers

  Scenario: When a customer doesn't exist
    When I send a PATCH request to "/customer/1d661eb7-9dde-4c4e-902b-3373a9f389f4" with body:
      """
      {
        "name": "Prueba Update Fernández"
      }
      """
    Then The response status code should be 404
    Then The response should be empty

  Scenario: When a customer exists
    Given There are customers:
    | id                                   | name                  | email                | age |
    | f33c23a2-e74b-4bad-9de9-fd781fb9e280 | Test Update Fernández | testupdate@gmail.com | 22  |
    When I send a PATCH request to "/customer/f33c23a2-e74b-4bad-9de9-fd781fb9e280" with body:
      """
      {
        "email": "testupdateworks@gmail.com"
      }
      """
    Then The response status code should be 204
    Then The response should be empty