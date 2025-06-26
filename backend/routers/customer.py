from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import database
import schemas

router = APIRouter(
    prefix="/api/customer",
    tags=["Customer"]
)

@router.post("/", response_model=schemas.CustomerBase)
def create_customer(customer: schemas.CreateCustomer, db: Session = Depends(database.get_db)):
    return crud.create_customer(db=db, customer=customer)

@router.get("/{customer_id}", response_model=schemas.CustomerBase)
def read_customer(customer_id: int, db: Session = Depends(database.get_db)):
    db_customer = crud.get_customer(db, customer_id=customer_id)
    return db_customer

@router.get("/", response_model=list[schemas.CustomerBase])
def read_customers(db: Session = Depends(database.get_db)):
    customers = crud.get_customers(db)
    return customers

@router.delete("/{customer_id}", status_code=204)
def delete_customer(customer_id: int, db: Session = Depends(database.get_db)):
    crud.delete_customer(db, customer_id=customer_id)

@router.put("/{customer_id}", response_model=schemas.CustomerBase)
def update_customer(customer_id: int, customer: schemas.CreateCustomer, db: Session = Depends(database.get_db)):
    return crud.update_customer(db=db, customer_id=customer_id, customer=customer)
