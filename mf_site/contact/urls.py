from django.urls import path

from . import views

urlpatterns = [
    # path("", views.contact_view, name="contact info"),
    path("", views.contact_info, name="contact info"),
    path("success/", views.SuccessView.as_view(), name="success")
]