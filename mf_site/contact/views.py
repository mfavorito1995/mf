from django.shortcuts import render, reverse
from django.http import HttpResponse
from django.views.generic import TemplateView, FormView
from django.core.mail import send_mail
from django.conf import settings

import base64
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from requests import HTTPError

from .forms import ContactForm

class SuccessView(TemplateView):
    template_name = "contact/success.html"


def contact_info(request):
    return render(request, 'contact/contact_info.html')


# https://www.twilio.com/en-us/blog/build-contact-form-python-django-twilio-sendgrid
# TODO Get smtp working - gmail is a pain.
def contact_view(request):

    # Once form is submitted, do this:
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid(): # Check that it is valid
            form.save() # Save it to the db

            # Retrieve form data
            sender_email = form.cleaned_data.get("sender_email")
            subject = form.cleaned_data.get("subject")
            message = MIMEText(form.cleaned_data.get("message"))

            # ### GMAIL THINGS

            # SCOPES = ["https://www.googleapis.com/auth/gmail.send"]
            # flow = InstalledAppFlow.from_client_secrets_file('static/secrets/credentials.json', SCOPES)
            # creds = flow.run_local_server(port=54658)

            # service = build('gmail', 'v1', credentials=creds)
            # message['to'] = 'mfavorito1995@gmail.com'
            # message['subject'] = subject
            # create_message = {
            #     'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()
            #     }

            # try:
            #     message = (service.users().messages().send(userId="me", body=create_message).execute())
            #     print(F'sent message to {message} Message Id: {message["id"]}')
            # except HTTPError as error:
            #     print(F'An error occurred: {error}')
            #     message = None

            # ###

            send_mail(
                subject,
                message,
                send_mail,
                ["mfavorito1995@gmail.com"],
                fail_silently=False,
            )

            return render(request, 'contact/success.html')

    form=ContactForm()
    context={'form': form}
    return render(request, 'contact/contact.html', context)

###