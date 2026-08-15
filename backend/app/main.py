from fastapi import FastAPI
from sqlalchemy import text
from app.api.accounts import router as accounts_router
from app.api.transactions import router as transactions_router
from app.db.session import engine
from app.api.auth import router as auth_router


app = FastAPI(
    title="FinPilot API",
    description="Personal Finance Management API",
    version="1.0.0",
)
app.include_router(accounts_router)
app.include_router(transactions_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {
        "message": "FinPilot API is running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/health/db")
def database_health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception as error:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(error),
        }