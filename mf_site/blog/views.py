from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.conf import settings

from .models import Blog

def index(request):
    blogs_date_desc = Blog.objects.order_by("publish_date")

    # Calculate the number of extra cards needed to fill the last row
    n_row_cards = 4  # You can adjust this value as needed
    
    extra_cards_needed = n_row_cards - (len(blogs_date_desc) % n_row_cards)
    if extra_cards_needed:
        extra_cards_list = range(extra_cards_needed)
    else: extra_cards_list = None
    
    # Set the data in the context
    context = {
        "blogs_date_desc": blogs_date_desc,
        "extra_cards_list": extra_cards_list,
        "n_row_cards": n_row_cards,
        "card_width": f"1/{n_row_cards}"
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
