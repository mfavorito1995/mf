# Generated by Django 5.0.4 on 2024-04-11 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_place_place_address_alter_place_place_country_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='place_city',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]