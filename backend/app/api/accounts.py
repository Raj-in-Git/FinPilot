from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.account import Account
from app.schemas.account import (
    AccountCreate,
    AccountResponse,
    AccountUpdate,
)
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/api/accounts",
    tags=["Accounts"],
)


@router.post(
    "",
    response_model=AccountResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_account(
    account_data: AccountCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = Account(
    name=account_data.name,
    type=account_data.type,
    balance=account_data.balance,
    currency=account_data.currency.upper(),
    user_id=current_user.id,
)

    db.add(account)
    db.commit()
    db.refresh(account)

    return account


@router.get(
    "",
    response_model=list[AccountResponse],
)
def get_accounts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = db.execute(
    select(Account)
    .where(Account.user_id == current_user.id)
    .order_by(Account.id)
)

    return result.scalars().all()


@router.get(
    "/{account_id}",
    response_model=AccountResponse,
)
def get_account(
    account_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = db.execute(
    select(Account).where(
        Account.id == account_id,
        Account.user_id == current_user.id,
    )
).scalar_one_or_none()

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )

    return account


@router.put(
    "/{account_id}",
    response_model=AccountResponse,
)
def update_account(
    account_id: int,
    account_data: AccountUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = db.execute(
        select(Account).where(
            Account.id == account_id,
            Account.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )

    update_data = account_data.model_dump(
        exclude_unset=True
    )

    if "currency" in update_data:
        update_data["currency"] = (
            update_data["currency"].upper()
        )

    for field, value in update_data.items():
        setattr(account, field, value)

    db.commit()
    db.refresh(account)

    return account


@router.delete(
    "/{account_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_account(
    account_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = db.execute(
        select(Account).where(
            Account.id == account_id,
            Account.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )

    db.delete(account)
    db.commit()