# Generated by Django 5.0.4 on 2024-04-11 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_place_place_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='date_when',
            field=models.DateTimeField(null=True),
        ),
    ]
