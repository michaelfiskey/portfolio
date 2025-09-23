from django.urls import path
from .views import guess_the_number

urlpatterns = [
    path('make-guess/', guess_the_number, name='number'),
]