from django.urls import path
from .views import find_schedules

urlpatterns = [
    path('find-schedules/', find_schedules, name='schedules'),
]
