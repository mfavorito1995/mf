from django.urls import path

from . import views

app_name="blog"
urlpatterns = [
    path("", views.index, name='index'),
    path("gallery", views.gallery, name="gallery"),
    path("<int:blog_id>/", views.a_blog, name="a_blog")
]
