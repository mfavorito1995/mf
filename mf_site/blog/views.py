from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.conf import settings
from django.core.serializers import serialize
from django.db.models import Q

import json

from .models import Blog, Category, PostType

def index(request):
    blogs_date_desc = Blog.objects.order_by("publish_date")

    # Get the categories - we use this in the filters...
    categories = json.dumps(list(Category.objects.values_list('name', flat=True).distinct()))

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
        "categories": categories,
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


def order_by_string_generator(params):

    print('field string???')

    if params.get('field'):
        field_string = params.get('field')
    else:
        field_string = 'publish_date'

    if params.get('direction') == 'asc':
        field_string = "-" + field_string

    return field_string


def filter_value_generator(field: str, value: str):

    if field == 'category':
        # Look up id absed on value
        category = Category.objects.filter(name=value).first()

        return "category__id", category

    if field == 'post_type':
        # Look up id absed on value
        post_type = PostType.objects.filter(name=value).first()

        return "post_type__id", post_type


def get_field_direction(request):

    # Get needed info from request based on params in url query string
    params = {
        'field': request.GET.get('field'),
        'direction': request.GET.get('direction'),
        'filter_params': request.GET.get('filter_params'),
    }


    field_string = order_by_string_generator(params)

    if params.get('filter_params'):
        # conver the str data into a dict? Can this be done more easily??? JS object?
        print('!!!', params.get('filter_params'))
        filter_params = eval(params.get('filter_params'))

        # Create the Q Query object
        query = Q()
        #Iterate over the provided filter dict - are these single value url params?
        for field, value in filter_params.items():
            if value:
                print(field, value)

                filterField, filterValue = filter_value_generator(field, value)

                query &= Q(**{field:filterValue}) # *= is just like += but for lists???
                print(query)
        raw_list = Blog.objects.filter(query).order_by(field_string)
    else:
        raw_list = Blog.objects.order_by(field_string)

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
        for b in raw_list
    ]

    return JsonResponse(blog_list, safe=False)  
