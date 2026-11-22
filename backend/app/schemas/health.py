from typing import Literal

from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Shape of the /health answer."""

    status: Literal["ok"]
