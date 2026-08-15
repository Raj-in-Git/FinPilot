from decimal import Decimal

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.account import Account
from app.models.transaction import Transaction
from app.schemas.transaction import (
    TransactionCreate,
    TransactionUpdate,
)


def get_balance_change(
    transaction_type: str,
    amount: Decimal,
) -> Decimal:
    if transaction_type == "income":
        return amount

    return -amount


def create_transaction(
    db: Session,
    data: TransactionCreate,
) -> Transaction:
    account = db.get(Account, data.account_id)

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )

    transaction = Transaction(
        account_id=data.account_id,
        type=data.type,
        category=data.category,
        description=data.description,
        amount=data.amount,
        date=data.date,
        notes=data.notes,
    )

    account.balance += get_balance_change(
        data.type,
        data.amount,
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    return transaction


def update_transaction(
    db: Session,
    transaction_id: int,
    data: TransactionUpdate,
) -> Transaction:
    transaction = db.get(
        Transaction,
        transaction_id,
    )

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    old_account = db.get(
        Account,
        transaction.account_id,
    )

    if old_account is None:
        raise HTTPException(
            status_code=404,
            detail="Original account not found",
        )

    # 1. Reverse the old transaction
    old_account.balance -= get_balance_change(
        transaction.type,
        transaction.amount,
    )

    update_data = data.model_dump(
        exclude_unset=True
    )

    new_account_id = update_data.get(
        "account_id",
        transaction.account_id,
    )

    new_account = db.get(
        Account,
        new_account_id,
    )

    if new_account is None:
        raise HTTPException(
            status_code=404,
            detail="New account not found",
        )

    # 2. Apply new transaction data
    for field, value in update_data.items():
        setattr(transaction, field, value)

    # 3. Apply the new transaction effect
    new_account.balance += get_balance_change(
        transaction.type,
        transaction.amount,
    )

    db.commit()
    db.refresh(transaction)

    return transaction


def delete_transaction(
    db: Session,
    transaction_id: int,
) -> None:
    transaction = db.get(
        Transaction,
        transaction_id,
    )

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    account = db.get(
        Account,
        transaction.account_id,
    )

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )

    # Reverse the transaction before deleting it
    account.balance -= get_balance_change(
        transaction.type,
        transaction.amount,
    )

    db.delete(transaction)
    db.commit()