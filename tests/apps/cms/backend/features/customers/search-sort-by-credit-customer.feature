Feature: Search sort by credit customer
  In order to have customers in the platform
  I want to search customers ordered by credit

  Scenario: When parameter sort has an invalid value
    When I send a GET request to "/customer/list?sort=fail"
    Then The response status code should be 400
    Then The response should be empty:

  Scenario: When there are not any customer
    When I send a GET request to "/customer/list?sort=asc"
    Then The response status code should be 200
    Then The response should be:
     """
       []
     """

  Scenario: When there are customers and sort is ascendent
    Given There are customers:
      | id                                   | name             | email                | age | credit |
      | e669c27b-e1f8-41dd-a603-07f7827a943d | Iván Fernández   | testivan@gmail.com   | 42  | 192    |
      | e42675c2-d7ac-419e-a031-d4a8042825ea | Pepa Fernández   | testpepa@gmail.com   | 31  | 181    |
      | 753d41d8-0daa-4e55-a8f7-3e026716237d | Manola Fernández | testmanola@gmail.com | 35  | 230    |
      | ec0094d0-1d5e-4e07-807e-89fd821ea3fe | Julio Fernández  | testjulio@gmail.com  | 68  | 0      |
      | a6d3e2c1-2cf0-4d67-af2e-93147a0e4b6e | Ana Fernández    | testana@gmail.com    | 19  | 25     |
    When I send a GET request to "/customer/list?sort=asc"
    Then The response status code should be 200
    Then The response should be:
      """
      [
        {
          "id": "ec0094d0-1d5e-4e07-807e-89fd821ea3fe",
          "name": "Julio Fernández",
          "email": "testjulio@gmail.com",
          "age": 68,
          "credit": 0
        },
        {
          "id": "a6d3e2c1-2cf0-4d67-af2e-93147a0e4b6e",
          "name": "Ana Fernández",
          "email": "testana@gmail.com",
          "age": 19,
          "credit": 25
        },
        {
          "id": "e42675c2-d7ac-419e-a031-d4a8042825ea",
          "name": "Pepa Fernández",
          "email": "testpepa@gmail.com",
          "age": 31,
          "credit": 181
        },
        {
          "id": "e669c27b-e1f8-41dd-a603-07f7827a943d",
          "name": "Iván Fernández",
          "email": "testivan@gmail.com",
          "age": 42,
          "credit": 192
        },
        {
          "id": "753d41d8-0daa-4e55-a8f7-3e026716237d",
          "name": "Manola Fernández",
          "email": "testmanola@gmail.com",
          "age": 35,
          "credit": 230
        }
      ]
      """

  Scenario: When there are customers and sort is descendent
    Given There are customers:
      | id                                   | name             | email                | age | credit |
      | e669c27b-e1f8-41dd-a603-07f7827a943d | Iván Fernández   | testivan@gmail.com   | 42  | 192    |
      | e42675c2-d7ac-419e-a031-d4a8042825ea | Pepa Fernández   | testpepa@gmail.com   | 31  | 181    |
      | 753d41d8-0daa-4e55-a8f7-3e026716237d | Manola Fernández | testmanola@gmail.com | 35  | 230    |
      | ec0094d0-1d5e-4e07-807e-89fd821ea3fe | Julio Fernández  | testjulio@gmail.com  | 68  | 0      |
      | a6d3e2c1-2cf0-4d67-af2e-93147a0e4b6e | Ana Fernández    | testana@gmail.com    | 19  | 25     |
    When I send a GET request to "/customer/list?sort=desc"
    Then The response status code should be 200
    Then The response should be:
      """
      [
        {
          "id": "753d41d8-0daa-4e55-a8f7-3e026716237d",
          "name": "Manola Fernández",
          "email": "testmanola@gmail.com",
          "age": 35,
          "credit": 230
        },
        {
          "id": "e669c27b-e1f8-41dd-a603-07f7827a943d",
          "name": "Iván Fernández",
          "email": "testivan@gmail.com",
          "age": 42,
          "credit": 192
        },
        {
          "id": "e42675c2-d7ac-419e-a031-d4a8042825ea",
          "name": "Pepa Fernández",
          "email": "testpepa@gmail.com",
          "age": 31,
          "credit": 181
        },
        {
          "id": "a6d3e2c1-2cf0-4d67-af2e-93147a0e4b6e",
          "name": "Ana Fernández",
          "email": "testana@gmail.com",
          "age": 19,
          "credit": 25
        },
        {
          "id": "ec0094d0-1d5e-4e07-807e-89fd821ea3fe",
          "name": "Julio Fernández",
          "email": "testjulio@gmail.com",
          "age": 68,
          "credit": 0
        }
      ]
      """