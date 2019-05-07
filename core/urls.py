from django.urls import path
from . import views


urlpatterns = [
    path('', views.main, name='main'),
    path('store_score', views.store_score, name='store_score'),
]
