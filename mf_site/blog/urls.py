from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("gallery", views.gallery, name="gallery"),
    path("<int:blog_id>/", views.a_blog, name="a_blog")
]
