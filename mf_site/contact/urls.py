from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("contact/", views.ContactView.as_view(), name="contact"), # Class based view
    path("success/", views.SuccessView.as_view(), name="success")
]