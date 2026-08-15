from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
)

from app.core.dependencies import get_current_user
from app.schemas.auth import UserResponse

from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    email = data.email.lower()

    existing_user = db.execute(
        select(User).where(User.email == email)
    ).scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered",
        )

    user = User(
        name=data.name,
        email=email,
        password_hash=hash_password(
            data.password
        ),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)

    return {
        "access_token": token,
        "token_type": "bearer",
    }


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    email = data.email.lower()

    user = db.execute(
        select(User).where(User.email == email)
    ).scalar_one_or_none()

    if user is None or not verify_password(
        data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(user.id)

    return {
        "access_token": token,
        "token_type": "bearer",
    }   

@router.post(
    "/token",
    response_model=TokenResponse,
)
def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    email = form_data.username.lower()

    user = db.execute(
        select(User).where(User.email == email)
    ).scalar_one_or_none()

    if user is None or not verify_password(
        form_data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(user.id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.get("/me",response_model=UserResponse,)
def get_me(current_user: User = Depends(get_current_user),):return current_user