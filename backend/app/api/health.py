from fastapi import APIRouter

from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Answer 'ok' if the API is running. Used by people, Docker and CI."""
    return HealthResponse(status="ok")
