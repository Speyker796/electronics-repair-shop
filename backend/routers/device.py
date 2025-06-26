from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import database
import schemas

router = APIRouter(
    prefix="/api/device",
    tags=["Device"]
)

@router.post("/", response_model=schemas.DeviceBase)
def create_device(device: schemas.CreateDevice, db: Session = Depends(database.get_db)):
    return crud.create_device(db=db, device=device)

@router.get("/{device_id}", response_model=schemas.DeviceBase)
def read_device(device_id: int, db: Session = Depends(database.get_db)):
    db_device = crud.get_device(db, device_id=device_id)
    return db_device

@router.get("/", response_model=list[schemas.DeviceBase])
def read_devices(db: Session = Depends(database.get_db)):
    devices = crud.get_devices(db)
    return devices

@router.delete("/{device_id}", status_code=204)
def delete_device(device_id: int, db: Session = Depends(database.get_db)):
    crud.delete_device(db, device_id=device_id)

@router.put("/{device_id}", response_model=schemas.DeviceBase)
def update_device(device_id: int, device: schemas.CreateDevice, db: Session = Depends(database.get_db)):
    return crud.update_device(db=db, device_id=device_id, device=device)