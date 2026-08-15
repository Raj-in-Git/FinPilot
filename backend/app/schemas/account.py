from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class AccountCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    type: str = Field(min_length=1, max_length=50)
    balance: Decimal = Field(default=Decimal("0.00"))
    currency: str = Field(default="INR", min_length=3, max_length=3)


class AccountUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    type: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )

    balance: Decimal | None = None

    currency: str | None = Field(
        default=None,
        min_length=3,
        max_length=3,
    )


class AccountResponse(BaseModel):
    id: int
    name: str
    type: str
    balance: Decimal
    currency: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )