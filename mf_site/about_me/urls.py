from django.urls import path

from . import views

app_name = "about_me"
urlpatterns = [
    path("", views.index, name="index"),
]
