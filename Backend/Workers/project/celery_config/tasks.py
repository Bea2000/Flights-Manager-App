# celery
from celery import shared_task
from celery_config.controllers import calculate_recommendations

# standard
import time

# The "shared_task" decorator allows creation
# of Celery tasks for reusable apps as it doesn't
# need the instance of the Celery app.
# @celery_app.task()
@shared_task
def get_recommendations(flights, ip_coord):
    result = calculate_recommendations(flights, ip_coord)
    return result