from django.urls import path

from . import views

app_name="blog"
urlpatterns = [
    path("", views.index, name='index'),
    path("<int:blog_id>/", views.a_blog, name="a_blog"),
    path("random/", views.random, name="random"),
    path("get_most_recent/", views.get_most_recent, name="get_most_recent")
]
