from django.shortcuts import render

from django.urls import path
from .views import get_data

urlpatterns = [
    path('get-data/', get_data, name='alcohol_life_data'),
]
