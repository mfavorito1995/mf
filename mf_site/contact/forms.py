from django import forms

class ContactForm(forms.Form):

    sender_email = forms.EmailField(widget=forms.TextInput(attrs={"placeholder": "E-mail"}))
    subject = forms.CharField(widget=forms.TextInput(attrs={"placeholder": "Subject"}))
    message = forms.CharField(widget=forms.Textarea(attrs={"placeholder": "Your message"}))
    