import pytest
import requests
from assertpy import assert_that


class TestClass:
    def test_create_and_delete_customer(self):
        payload = {
            "first_name": "testfirstname",
            "last_name": "testlastname",
            "address": "testaddress",
            "phone_number": "testphonenumber",
        }
        result = requests.post("http://127.0.0.1:8000/api/customer", json=payload)

        assert_that(result.status_code).is_equal_to(200)
        assert_that(result.json()["first_name"]).is_equal_to("testfirstname")
        assert_that(result.json()["last_name"]).is_equal_to("testlastname")
        assert_that(result.json()["address"]).is_equal_to("testaddress")
        assert_that(result.json()["phone_number"]).is_equal_to("testphonenumber")

        customer_id = result.json()["id"]

        print(result.json())
        delete_result = requests.delete(f"http://127.0.0.1:8000/api/customer/{customer_id}")

        assert_that(delete_result.status_code).is_equal_to(204)


