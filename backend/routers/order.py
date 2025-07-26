from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import database
import schemas

router = APIRouter(
    prefix="/api/order",
    tags=["Order"]
)

@router.post("/", response_model=schemas.OrderOut)
def create_order(order: schemas.CreateOrder, db: Session = Depends(database.get_db)):
    return crud.create_order(db=db, order=order)

@router.get("/{order_id}", response_model=schemas.OrderOut)
def get_order(order_id: int, db: Session = Depends(database.get_db)):
    db_order = crud.get_order(db, order_id=order_id)
    return db_order

@router.get("/", response_model=list[schemas.OrderOut])
def get_orders(db: Session = Depends(database.get_db)):
    orders = crud.get_orders(db)
    return orders

@router.delete("/{order_id}", status_code=204)
def delete_order(order_id: int, db: Session = Depends(database.get_db)):
    crud.delete_order(db, order_id=order_id)

@router.put("/{order_id}", response_model=schemas.OrderOut)
def update_order(order_id: int, order: schemas.CreateOrder, db: Session = Depends(database.get_db)):
    return crud.update_order(db=db, order_id=order_id, order=order)

#ay yo