from pydantic import BaseModel
from typing import Optional

class CreateCustomer(BaseModel):
    first_name: str
    last_name: str
    address: str
    phone_number: str
    class Config:
        from_attributes = True

class CustomerBase(CreateCustomer):
    id: int
    class Config:
        from_attributes = True

class CreateDevice(BaseModel):
    device_type: str
    manufacturer: str
    device_model: str
    serial_number: str
    customer_id: Optional[int] = None
    class Config:
        from_attributes = True

class DeviceBase(CreateDevice):
    id: int
    class Config:
        from_attributes = True

class CreateOrder(BaseModel):
    order_description: str
    order_details: str
    class Config:
        from_attributes = True

class OrderBase(CreateOrder):
    id: int
    class Config:
        from_attributes = True

class CreateNote(BaseModel):
    title: str
    content: str
    class Config:
        from_attributes = True

class NoteBase(CreateNote):
    id: int
    class Config:
        from_attributes = True


