from django.db import models

class Drinks(models.Model):
    country = models.CharField(max_length=100)
    beer_servings = models.IntegerField()
    spirit_servings = models.IntegerField()
    wine_servings = models.IntegerField()
    total_litres_of_pure_alcohol = models.FloatField()

class LifeExpectancy(models.Model):
    GhoCode = models.CharField(max_length=50)
    GhoDisplay = models.CharField(max_length=100)
    PublishStateCode = models.CharField(max_length=50)
    PublishStateDisplay = models.CharField(max_length=100)
    YearCode = models.CharField(max_length=10)
    YearDisplay = models.CharField(max_length=10)
    RegionCode = models.CharField(max_length=50)
    RegionDisplay = models.CharField(max_length=100)
    WorldBankIncomeGroupGroupCode = models.CharField(max_length=50)
    WorldBankIncomeGroupDisplay = models.CharField(max_length=100)
    CountryCode = models.CharField(max_length=10)
    CountryDisplay = models.CharField(max_length=100)
    SexCode = models.CharField(max_length=10)
    SexDisplay = models.CharField(max_length=20)
    DisplayValue = models.CharField(max_length=20)
    Numeric = models.FloatField()
