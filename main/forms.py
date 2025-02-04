from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    purpose = forms.ChoiceField(choices=[
        ('job', 'Job Opportunity'),
        ('project', 'Project Collaboration'),
        ('general', 'General Inquiry'),
    ])
    message = forms.CharField(widget=forms.Textarea) 