from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.conf import settings
from django.core.serializers import serialize


from .models import Blog

def index(request):
    blogs_date_desc = Blog.objects.order_by("publish_date")

    # Calculate the number of extra cards needed to fill the last row
    n_row_cards = 4  # You can adjust this value as needed
    
    extra_cards_needed = n_row_cards - (len(blogs_date_desc) % n_row_cards)
    if extra_cards_needed:
        extra_cards_list = range(extra_cards_needed)
    else: extra_cards_list = None
    
    random_blog = Blog.objects.order_by('?').first()
    print(random_blog.id, '_______')

    # Set the data in the context
    context = {
        "blogs_date_desc": blogs_date_desc,
        "extra_cards_list": extra_cards_list,
        "n_row_cards": n_row_cards,
        "card_width": f"1/{n_row_cards}",
        "random_blog": random_blog.id,
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

    # check if currently on a blog - do we check the url or the route?
    # if there is a blog go to any other vlog
    # otherwise just to any other blog

def random(request):
    print(request.META)
    print(request.path)
    # if request.path.startswith('/blog/'):
    #     # Request originated from a blog page
    #     current_blog_id = request.GET.get('current_blog_id')
    #     random_blog = Blog.objects.exclude(id=current_blog_id).order_by('?').first()
    # else:
    #     # Request did not originate from a blog page
    #     random_blog = Blog.objects.order_by('?').first()
    
    # if random_blog:
    #     return redirect(random_blog.get_absolute_url())
    # else:
    #     # Handle case where no blogs exist
    return redirect('blog:index')

def get_most_recent(request):
    blogs_date_desc = Blog.objects.order_by("publish_date")
    blog_list = [
        {
            'id': b.id,
            'title': str(b.title),
            'display_date': str(b.display_date),
            'place': str(b.place),
            'music': str(b.music),
            'category': ", ".join(sorted([x.name for x in b.category.all()])),
            'galley_image': str(b.gallery_image),
        }
        for b in blogs_date_desc
    ]

    return JsonResponse(blog_list, safe=False)
    
    # what information do I need?
    # blog id
    # place
    # music
    # display_date
    # category
    # gallery_image

