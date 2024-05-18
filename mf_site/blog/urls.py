from django.urls import path

from . import views

app_name="blog"
urlpatterns = [
    path("", views.index, name='index'),
    path("<int:blog_id>/", views.a_blog, name="a_blog"),
    path("random/", views.random, name="random"),
    path("get_date_desc/", views.get_date_desc, name="get_date_desc"),
    path("get_date_asc/", views.get_date_asc, name="get_date_asc"),
    path("get_title_desc/", views.get_title_desc, name="get_title_desc"),
    path("get_title_asc/", views.get_title_asc, name="get_title_asc"),

]
