import os
import datetime as dt
import pytz

# FastAPI
from fastapi import FastAPI, HTTPException
from pydantic import ValidationError

# celery
from celery_config.tasks import get_recommendations
from models import CreateRecommendationsDto
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.get("/heartbeat")
def check_service():
    return True

@app.post("/job")
def post_publish_job(data: CreateRecommendationsDto):
    try:
        flights = [flight.dict() for flight in data.flights]
        ip_coord = data.ip_coord.dict()
        
        tz_Santiago = pytz.timezone('America/Santiago')
        job = get_recommendations.delay(flights, ip_coord)
        current_date = dt.datetime.now(tz_Santiago).strftime('%d-%m-%Y %H:%M:%S')

        return {
            "message": "new recommendation", 
            "job_id": job.id,
            "date": current_date
        }
    except ValidationError as e:
        print("Validation Error:", e)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print("Internal Server Error:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/job/{job_id}")
def get_job(job_id: str):
    try:
        job = get_recommendations.AsyncResult(job_id)
        
        return {
            "ready": job.ready(),
            "result": job.result,
        }
    except Exception as e:
        print("Internal Server Error:", e)
        raise HTTPException(status_code=500, detail=str(e))