# Generated by Django 5.0.4 on 2024-04-11 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_blog_date_when'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='date_when',
            field=models.DateField(null=True),
        ),
    ]