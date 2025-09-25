from django.db import models

class Drinks(models.Model):
    country = models.CharField(max_length=100)
    beer_servings = models.IntegerField()
    spirit_servings = models.IntegerField()
    wine_servings = models.IntegerField()
    total_litres_of_pure_alcohol = models.FloatField()

class LifeExpectancy(models.Model):
    gho_code = models.CharField(max_length=50)
    gho_display = models.CharField(max_length=100)
    publish_state_code = models.CharField(max_length=50)
    publish_state_display = models.CharField(max_length=100)
    year_code = models.CharField(max_length=10)
    year_display = models.CharField(max_length=10)
    region_code = models.CharField(max_length=50)
    region_display = models.CharField(max_length=100)
    world_bank_income_group_group_code = models.CharField(max_length=50)
    world_bank_income_group_display = models.CharField(max_length=100)
    country_code = models.CharField(max_length=10)
    country_display = models.CharField(max_length=100)
    sex_code = models.CharField(max_length=10)
    sex_display = models.CharField(max_length=20)
    display_value = models.CharField(max_length=20)
    numeric = models.FloatField()
