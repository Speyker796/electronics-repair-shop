from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import database
import schemas

router = APIRouter(
    prefix="/api/notes",
    tags=["Notes"]
)

@router.post("/", response_model=schemas.NoteBase)
def create_note(note: schemas.CreateNote, db: Session = Depends(database.get_db)):
    return crud.create_note(db=db, note=note)

@router.get("/{note_id}", response_model=schemas.NoteBase)
def read_note(note_id: int, db: Session = Depends(database.get_db)):
    db_note = crud.get_note(db, note_id=note_id)
    return db_note

@router.get("/", response_model=list[schemas.NoteBase])
def read_notes(db: Session = Depends(database.get_db)):
    notes = crud.get_notes(db)
    return notes

@router.delete("/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(database.get_db)):
    crud.delete_note(db, note_id=note_id)

@router.put("/{note_id}", response_model=schemas.NoteBase)
def update_note(note_id: int, note: schemas.CreateNote, db: Session = Depends(database.get_db)):
    return crud.update_note(db=db, note_id=note_id, note=note)