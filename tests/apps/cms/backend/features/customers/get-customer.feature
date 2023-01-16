Feature: Get customer
  In order to have customers in the platform
  I want to find a customer

  Scenario: When a customer exists
    Given There are customers:
      | id                                   | name           | email              | age |
      | de32eacb-1ce8-408f-b07b-8c3b0e0437c0 | Iván Fernández | testivan@gmail.com | 22  |
    When I send a GET request to "/customer/de32eacb-1ce8-408f-b07b-8c3b0e0437c0"
    Then The response status code should be 200
    Then The response should be:
      """
      {
        "id": "de32eacb-1ce8-408f-b07b-8c3b0e0437c0",
        "name": "Iván Fernández",
        "email": "testivan@gmail.com",
        "age": 22
      }
      """

  Scenario: When a customer doesn't exist
    When I send a GET request to "/customer/08a55ccf-0ca2-48f8-a0a0-e8617039c991"
    Then The response status code should be 404
    Then The response should be:
     """
       {"error": "Customer with id <08a55ccf-0ca2-48f8-a0a0-e8617039c991> not found"}
     """
