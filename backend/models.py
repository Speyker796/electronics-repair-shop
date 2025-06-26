from database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, text, ForeignKey
from sqlalchemy.orm import relationship

# Model klienta w bazie danych
class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    devices = relationship("Device", back_populates="owner")
    orders = relationship("Order", back_populates="customer")

#Model urządzenia w bazie danych
class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, nullable=False)
    device_type = Column(String, nullable=False)
    manufacturer = Column(String, nullable=False)
    device_model = Column(String, nullable=False)
    serial_number = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    customer_id = Column(Integer, ForeignKey("customers.id"))

    owner = relationship("Customer", back_populates="devices")
    orders = relationship("Order", back_populates="device")

#Model zlecenia w bazie danych
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, nullable=False)
    order_description = Column(String, nullable=False)
    order_details = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    device_id = Column(Integer, ForeignKey("devices.id"))
    customer_id = Column(Integer, ForeignKey("customers.id"))

    device = relationship("Device", back_populates="orders")
    customer = relationship("Customer", back_populates="orders")
    notes = relationship("Note", back_populates="order")

#Model notatek w bazie danych
class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    order_id = Column(Integer, ForeignKey("orders.id"))

    order = relationship("Order", back_populates="notes")