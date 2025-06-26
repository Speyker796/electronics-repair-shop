from fastapi import HTTPException
from sqlalchemy.orm import Session
import models
import schemas
# from models import Customer


# CRUD KLIENT
def get_customer(db: Session, customer_id: int):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail="There is no such customer in the database")
    return customer

def get_customers(db: Session):
    customers = db.query(models.Customer).all()
    if not customers:
        raise HTTPException(status_code=404, detail="There are no customers in the database yet")
    return customers

def create_customer(db: Session, customer: schemas.CreateCustomer):
    db_customer = models.Customer(first_name=customer.first_name, last_name=customer.last_name,
                                  address=customer.address, phone_number=customer.phone_number)
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def delete_customer(db: Session, customer_id: int):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="There is no such customer in the database")
    db.delete(db_customer)
    db.commit()

def update_customer(db:Session, customer_id: int, customer: schemas.CreateCustomer):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="There is no such customer in the database")
    db_customer.first_name = customer.first_name
    db_customer.last_name = customer.last_name
    db_customer.address = customer.address
    db_customer.phone_number = customer.phone_number
    db.commit()
    db.refresh(db_customer)
    return db_customer

#CRUD URZADZENIE
def get_device(db: Session, device_id: int):
    device = db.query(models.Device).filter(models.Device.id == device_id).first()
    if device is None:
        raise HTTPException(status_code=404, detail="There is no such device in the database")
    return device

def get_devices(db: Session):
    devices = db.query(models.Device).all()
    if not devices:
        raise HTTPException(status_code=404, detail="There are no devices in the database")
    return devices

def create_device(db: Session, device = schemas.CreateDevice):
    db_device = models.Device(device_type=device.device_type, manufacturer=device.manufacturer,
                                  device_model=device.device_model, serial_number=device.serial_number)
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

def delete_device(db: Session, device_id: int):
    db_device = db.query(models.Device).filter(models.Device.id == device_id).first()
    if not db_device:
        raise HTTPException(status_code=404, detail="There is no such device in the database")
    db.delete(db_device)
    db.commit()

def update_device(db:Session, device_id: int, device: schemas.CreateDevice):
    db_device = db.query(models.Device).filter(models.Device.id == device_id).first()
    if not db_device:
        raise HTTPException(status_code=404, detail="There is no such device in the database")
    db_device.device_type = device.device_type
    db_device.manufacturer = device.manufacturer
    db_device.device_model = device.device_model
    db_device.serial_number = device.serial_number
    db.commit()
    db.refresh(db_device)
    return db_device

#CRUD ZLECENIA
def get_order(db: Session, order_id: int):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="There is no such order in the database")
    return order

def get_orders(db:Session):
    orders = db.query(models.Order).all()
    if not orders:
        raise HTTPException(status_code=404, detail="There are no orders in the database")
    return orders

def create_order(db: Session, order: schemas.CreateOrder):
    db_order = models.Order(order_description=order.order_description, order_details=order.order_details)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="There is no such order in the database")
    db.delete(db_order)
    db.commit()

def update_order(db:Session, order_id: int, order: schemas.CreateOrder):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="There is no such order in the database")
    db_order.order_description = order.order_description
    db_order.order_details = order.order_details
    db.commit()
    db.refresh(db_order)
    return db_order


#CRUD NOTES
def get_note(db: Session, note_id: int):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=404, detail="There is no such note in the database")
    return note

def get_notes(db:Session):
    notes = db.query(models.Note).all()
    if not notes:
        raise HTTPException(status_code=404, detail="There are no notes in the database yet")
    return notes

def create_note(db: Session, note: schemas.CreateNote):
    db_note = models.Note(title=note.title, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def delete_note(db: Session, note_id: int):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="There is no such note in the database")
    db.delete(db_note)
    db.commit()

def update_note(db:Session, note_id: int, note: schemas.CreateNote):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="There is no such note in the database")
    db_note.title = note.title
    db_note.content = note.content
    db.commit()
    db.refresh(db_note)
    return db_note
