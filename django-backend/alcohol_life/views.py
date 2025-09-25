from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Drinks, LifeExpectancy
import pandas as pd
import numpy as np

def clean_data(d: pd.DataFrame, le: pd.DataFrame) -> pd.DataFrame:

    # fix discrepencies le['country_display'] and d['country'] columns before merging on them
    country_map = {
        'Bolivia (Plurinational State of)' : 'Bolivia', 
        'Saint Lucia' : 'St. Lucia',
        'Syrian Arab Republic' : 'Syria',
        'Sao Tome and Principe' : 'Sao Tome & Principe',
        'Republic of Korea' : 'South Korea',
        'Antigua and Barbuda' : 'Antigua & Barbuda',
        'Saint Vincent and the Grenadines' : 'St. Vincent & the Grenadines',
        'Saint Kitts and Nevis' : 'St. Kitts & Nevis',
        'United Republic of Tanzania' : 'Tanzania',
        'The former Yugoslav republic of Macedonia' : 'Macedonia',
        'South Sudan' : 'Sudan',
        'Micronesia (Federated States of)' : 'Micronesia',
        'Brunei Darussalam' : 'Brunei',
        'United Kingdom of Great Britain and Northern Ireland' : 'United Kingdom',
        "Côte d'Ivoire" : "Cote d'Ivoire",
        'United States of America' : 'USA',
        "Democratic People's Republic of Korea" : "North Korea",
        'Viet Nam' : 'Vietnam',
        'Democratic Republic of the Congo' : 'DR Congo',
        'Republic of Moldova' : 'Moldova',
        'Iran (Islamic Republic of)' : 'Iran',
        'Bosnia and Herzegovina' : 'Bosnia-Herzegovina',
        'Timor_Leste' : 'Timor-Leste',
        'Venezuela (Bolivarian Republic of)' : 'Venezuela',
        "Lao People's Democratic Republic" : "Laos",
        'Trinidad and Tobago' : 'Trinidad & Tobago',
        'Guinea_Bissau' : 'Guinea-Bissau'
    }
    le['country_display'] = le['country_display'].replace(country_map)

    ds = pd.merge(le, d, left_on='country_display', right_on='country', how='inner')

    # update life expectancy numbers to be consistent ('WHOSIS_000015' was counting years AFTER 60).
    ds['numeric'] = np.where(
        ds['gho_code'] == 'WHOSIS_000015',
        ds['numeric'].astype(float) + 60,
        ds['numeric'].astype(float)
    )
    ds['display_value'] = ds['numeric'].astype(int).round(0)

    return ds

@api_view(['GET'])
@permission_classes([AllowAny])
def get_data(request):
    try:
        drinks_df = pd.DataFrame(list(Drinks.objects.all().values()))
        life_expectancy_df = pd.DataFrame(list(LifeExpectancy.objects.all().values()))

        ds = clean_data(drinks_df, life_expectancy_df)

        return Response({'message': 'successfully got data!', 'dataset' : ds.to_json()})

    except Exception as e:
        print("ERROR:", e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)