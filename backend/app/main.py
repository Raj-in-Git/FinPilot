from fastapi import FastAPI

app = FastAPI(
    title="FinPilot API",
    description="Personal Finance Management API",
    version="1.0.0",
)


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