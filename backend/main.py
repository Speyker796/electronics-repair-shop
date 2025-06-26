from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import models
from database import engine
from routers import customer, device, order, notes

middleware = [
    Middleware(
        CORSMiddleware, #type: ignore
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

models.Base.metadata.create_all(bind=engine)



app = FastAPI(middleware=middleware)
app.include_router(customer.router)
app.include_router(device.router)
app.include_router(order.router)
app.include_router(notes.router)


# TODO FRONTEND, PODSTAWOWY FORMULARZ DO WPROWADZANIA DANYCH, ZAKŁADKA KLIENTA


