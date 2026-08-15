from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.account import Account
from app.models.transaction import Transaction
from app.schemas.transaction import (
    TransactionCreate,
    TransactionResponse,
    TransactionUpdate,
)
from app.services.transaction_service import (
    create_transaction,
    update_transaction,
    delete_transaction,
)

from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/api/transactions",
    tags=["Transactions"],
)


@router.post(
    "",
    response_model=TransactionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_transaction_api(
    transaction_data: TransactionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    account = db.execute(
        select(Account).where(
            Account.id == transaction_data.account_id,
            Account.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )

    return create_transaction(
        db,
        transaction_data,
    )


@router.get(
    "",
    response_model=list[TransactionResponse],
)
def get_transactions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = db.execute(
    select(Transaction)
    .join(Account)
    .where(Account.user_id == current_user.id)
    .order_by(Transaction.date.desc())
)

    return result.scalars().all()


@router.get(
    "/{transaction_id}",
    response_model=TransactionResponse,
)
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transaction = db.execute(
    select(Transaction)
    .join(Account)
    .where(
        Transaction.id == transaction_id,
        Account.user_id == current_user.id,
    )
).scalar_one_or_none()

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    return transaction

@router.put(
    "/{transaction_id}",
    response_model=TransactionResponse,
)
def update_transaction_api(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transaction = db.execute(
        select(Transaction)
        .join(Account)
        .where(
            Transaction.id == transaction_id,
            Account.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    return update_transaction(
        db,
        transaction_id,
        transaction_data,
    )


@router.delete(
    "/{transaction_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_transaction_api(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transaction = db.execute(
        select(Transaction)
        .join(Account)
        .where(
            Transaction.id == transaction_id,
            Account.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    delete_transaction(
        db,
        transaction_id,
    )