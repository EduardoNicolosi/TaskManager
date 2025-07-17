from fastapi import FastAPI
from app.routers import tasks
from app.database import engine
from app import models
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/tasks")
