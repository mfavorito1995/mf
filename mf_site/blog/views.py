from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404

from .models import Blog

def index(request):
    return HttpResponse("Blog app")

def gallery(request):
    blogs_date_desc = Blog.objects.order_by("publish_date")

    # Set the data in the context
    context = {
        "blogs_date_desc": blogs_date_desc
    }

    return render(request, "blog/gallery.html", context)

def a_blog(request, blog_id):
    try:
        blog = Blog.objects.get(pk=blog_id)
    except Blog.DoesNotExist:
        raise Http404("Blog does not exist ... yet!")

    content = blog.content_file.read().decode('utf-8')
    context = {
        "blog_id": blog_id,
        "blog": blog,
        "content": content
    }

    return render(request, "blog/blog.html", context)
