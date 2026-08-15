from datetime import  datetime
from datetime import date as Date
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class TransactionCreate(BaseModel):
    account_id: int

    type: Literal["income", "expense"]

    category: str = Field(
        min_length=1,
        max_length=50,
    )

    description: str = Field(
        min_length=1,
        max_length=200,
    )

    amount: Decimal = Field(
        gt=0,
    )

    date: Date

    notes: str | None = None


class TransactionUpdate(BaseModel):
    account_id: int | None = None

    type: Literal["income", "expense"] | None = None

    category: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )

    description: str | None = Field(
        default=None,
        min_length=1,
        max_length=200,
    )

    amount: Decimal | None = Field(
        default=None,
        gt=0,
    )

    date: Date | None = None

    notes: str | None = None


class TransactionResponse(BaseModel):
    id: int
    account_id: int
    type: str
    category: str
    description: str
    amount: Decimal
    date: Date
    notes: str | None
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )