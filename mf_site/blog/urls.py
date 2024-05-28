from django.urls import path

from . import views

app_name="blog"
urlpatterns = [
    path("", views.index, name='index'),
    path("<int:blog_id>/", views.a_blog, name="a_blog"),
    path("random/", views.random, name="random"),
    path("get_field_direction", views.get_field_direction, name="get_field_direction"),
    # path("get_filtered_blogs", views.get_filtered_blogs, name="get_filtered_blogs")

]
