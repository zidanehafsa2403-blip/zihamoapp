"""Backend API tests for ZIHAMO orders and enquiries endpoints."""
import os
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://zihamo-pharma.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "ZIHAMO API"


def test_create_order_empty_items_rejected(client):
    payload = {
        "name": "TEST User", "phone": "9999999999", "email": "test_empty@example.com",
        "company": "TestCo", "address": "1 Test St", "city": "Bengaluru", "pincode": "560001",
        "items": [], "subtotal": 0, "total": 0
    }
    r = client.post(f"{API}/orders", json=payload)
    assert r.status_code == 400


def test_create_order_invalid_email(client):
    payload = {
        "name": "TEST", "phone": "9999999999", "email": "not-an-email",
        "address": "1 Test St", "pincode": "560001",
        "items": [{"id": "p1", "sku": "SKU1", "name": "Item", "quantity": 1, "price": 100}],
        "subtotal": 100, "total": 100
    }
    r = client.post(f"{API}/orders", json=payload)
    assert r.status_code == 422


def test_create_order_success_and_persist(client):
    payload = {
        "name": "TEST Full", "phone": "9876543210", "email": "test_full@example.com",
        "company": "TESTCorp", "gstin": "29ABCDE1234F1Z5",
        "address": "42 Test Rd", "city": "Bengaluru", "pincode": "560002",
        "items": [
            {"id": "p1", "sku": "BOT101", "name": "Bottle", "category": "Drinkware", "quantity": 2, "price": 499},
            {"id": "p2", "sku": "MUG201", "name": "Mug", "category": "Drinkware", "quantity": 1, "price": 299}
        ],
        "subtotal": 1297, "total": 1297
    }
    r = client.post(f"{API}/orders", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["order_no"].startswith("ZH") and len(data["order_no"]) == 8
    assert data["email"] == payload["email"]
    assert data["total"] == 1297
    assert len(data["items"]) == 2
    assert data["status"] == "placed"
    order_no = data["order_no"]

    # GET list and verify persistence
    r2 = client.get(f"{API}/orders")
    assert r2.status_code == 200
    orders = r2.json()
    assert isinstance(orders, list)
    match = [o for o in orders if o.get("order_no") == order_no]
    assert len(match) == 1
    assert match[0]["items"][0]["sku"] == "BOT101"
    assert match[0]["pincode"] == "560002"


def test_enquiries_endpoints(client):
    payload = {
        "company": "TESTCo", "contact_name": "TEST Contact",
        "email": "test_enq@example.com", "phone": "9000000000",
        "message": "test enquiry",
        "items": [{"id": "p1", "name": "Item", "category": "Drinkware", "quantity": 5}]
    }
    r = client.post(f"{API}/enquiries", json=payload)
    assert r.status_code == 200
    eid = r.json()["id"]
    r2 = client.get(f"{API}/enquiries")
    assert r2.status_code == 200
    assert any(e["id"] == eid for e in r2.json())
