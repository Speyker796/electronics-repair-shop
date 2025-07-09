from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, computed_field
from typing import List, Optional


class CustomerBase(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]


class DeviceBase(BaseModel):
    device_type: Optional[str]
    manufacturer: Optional[str]
    device_model: Optional[str]
    serial_number: Optional[str]


class OrderBase(BaseModel):
    order_description: Optional[str]
    order_details: Optional[str]


class CreateCustomer(CustomerBase):
    first_name: str
    last_name: str
    address: str
    phone_number: str

    # class Config:
    #     from_attributes = True


class CustomerOut(CustomerBase):
    id: int
    first_name: str
    last_name: str
    address: str
    phone_number: str

    class Config:
        from_attributes = True


class CustomerOutWithDevices(CustomerBase):
    id: int
    first_name: str
    last_name: str
    address: str
    phone_number: str
    devices: Optional[List[DeviceOut]]

    class Config:
        from_attributes = True


class CreateDevice(DeviceBase):
    device_type: str
    manufacturer: str
    device_model: str
    serial_number: str
    customer_id: int

    # class Config:
    #     from_attributes = True


class DeviceOut(DeviceBase):
    id: int
    device_type: str
    manufacturer: str
    device_model: str
    serial_number: str

    class Config:
        from_attributes = True


class DeviceOutWithOwner(DeviceBase):
    id: int
    device_type: str
    manufacturer: str
    device_model: str
    serial_number: str
    owner: Optional[CustomerOut]

    class Config:
        from_attributes = True


class CreateOrder(OrderBase):
    order_description: str
    order_details: str
    customer_id: Optional[int] = None
    device_id: Optional[int] = None

    # class Config:
    #     from_attributes = True


class OrderOut(OrderBase):
    id: int
    order_description: str
    order_details: str
    customer_id: Optional[int]
    device_id: Optional[int]
    created_at: Optional[datetime]

    # @computed_field
    # def created_at_str(self) -> Optional[str]:
    #     if self.created_at:
    #         return self.created_at.strftime('%Y-%m-%d %H:%M')
    #     return None

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
