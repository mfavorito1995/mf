from django.shortcuts import render, reverse
from django.http import HttpResponse
from django.views.generic import TemplateView, FormView
from django.core.mail import send_mail
from django.conf import settings

from .forms import ContactForm

def index(request):
    return HttpResponse("Contact me")

class SuccessView(TemplateView):
    template_name = "contact/success.html"

class ContactView(FormView):
    form_class = ContactForm
    template_name = "contact/contact.html"

    def get_success_url(self):
        return reverse('success')
    
    def form_valid(self, form):

        sender_email = form.cleaned_data.get("sender_email")
        subject = form.cleaned_data.get("subject")
        message = form.cleaned_data.get("message")

        full_message = f"""
        
            Below message received from {sender_email}, {subject}
            ___________________________________________________

            {message}

        """

        send_mail(
            subject="Received contact form submission",
            message=full_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list = [settings.NOTIFY_EMAIL]
        )

        return super(ContactView, self).form_valid(form)
