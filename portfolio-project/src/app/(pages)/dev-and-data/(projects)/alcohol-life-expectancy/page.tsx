"use client";
import React, { useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Plot from 'react-plotly.js';


const Page = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const page = pageRef.current;
        gsap.fromTo(page, { opacity: 0 }, { opacity: 1, duration: 2 });
    });

    useEffect(() => {
        const getPlot1Data = async () => {
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URL}/api/alcohol-life/get-data/`)
                const data = await response.json()
                
                console.log(data)
                
                return data
            }
            catch (error) {
            console.log('ERROR GETTING DATA')
            }
        }
        getPlot1Data()

    }, []);

    type PlotlyBoxPlotData = {
        country_display: string;
        display_value: number;
    };

    interface PlotlyBoxPlotProps {
        data: PlotlyBoxPlotData[];
    }

    const PlotlyBoxPlot: React.FC<PlotlyBoxPlotProps> = ({ data }) => {
        // Prepare data for Plotly
        const countries = data.map(row => row.country_display);
        const values = data.map(row => row.display_value);

        return (
            <Plot
            data={[
                {
                y: values,
                x: countries,
                type: 'box',
                boxpoints: 'all',
                }
            ]}
            layout={{
                title: 'Life Expectancy by Country (A-Z)',
                xaxis: { tickangle: 45 },
                width: 1300,
                height: 700,
            }}
            />
        );
    };

    return (
        <div ref={pageRef} className="page-container">
            <div className="mt-5 mb-12 sm:ml-0 text-center sm:text-left">
                <h1 className="h1 ">Alcohol & Life Expectancy.</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-blue-500 mx-auto sm:ml-5 mt-2"></div>
            </div>
            <div className="bg-white backdrop-blur-sm p-3 sm:p-8 shadow-2xl rounded-lg">
                <div className="text-center mb-8">
                    <h2 className="h2 !font-bold mb-3 !from-sky-400 !to-blue-700 ">Alcohol Consumption & Life Expectancy</h2>
                    <p className="text-stone-600 text-lg max-w-7xl mx-auto">
                        "Did you know that people who drink a glass of wine a day are said to live longer than those who abstain completely?" 
                        This "fun fact" is something I've heard many times, and you may have encountered it as well. 
                        I've always questioned how true this claim really is.
                        We were frequently told, "Don't do drugs. Don't drink alcohol." growing up.
                        For those of us born in the early 2000s, the Drug Abuse Resistance Education (D.A.R.E.) 
                        program, despite research showing it was mostly ineffective, controversy over its use of children as informants, 
                        and its decline around 2009, still shaped how schools taught about substance use. 
                        As a result, we were consistently educated to avoid drugs and alcohol altogether. 
                        Setting aside the politics and controversies surrounding the program, 
                        the message "Don't drink alcohol" still seemed reasonable from a health perspective.
                    </p>
                    <ul className='text-stone-600 text-lg max-w-7xl mx-auto'>
                        <li>J-curve</li>
                        <li>Socioeconomic status</li>
                    </ul>
                </div>
            <SyntaxHighlighter language="python" style={dark}>
    {`
    # le = life expectancy
    # d = drinks
    # ds = dataset

    import pandas as pd
    import numpy as np

    # load both datasets into pandas dataframes
    d_raw = pd.read_csv('drinks.csv')
    le_raw = pd.read_csv('life_expectancy.csv')

    # make a copy of each dataframe and clean data to prepare for merge
    d = d_raw.copy()
    le = le_raw.copy()
    d.drop('index', axis=1, inplace=True)
    le.drop('index', axis=1, inplace=True)

    # fix discrepencies le['CountryDisplay'] and d['country'] columns before merging on them
    missmatched_countries = le[~le['CountryDisplay'].isin(d['country'])]
    print(missmatched_countries['CountryDisplay'].unique())

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
    le['CountryDisplay'] = le['CountryDisplay'].replace(country_map)

    missmatched_countries = le[~le['CountryDisplay'].isin(d['country'])]
    print(missmatched_countries['CountryDisplay'].unique())

    ds = pd.merge(le, d, left_on='CountryDisplay', right_on='country', how='inner')
    print(f'le shape: {le.shape} ds shape: {ds.shape}')

    # update life expectancy numbers to be consistent ('WHOSIS_000015' was counting years AFTER 60).
    ds['Numeric'] = np.where(
        ds['GhoCode'] == 'WHOSIS_000015',
        ds['Numeric'].astype(float) + 60,
        ds['Numeric'].astype(float)
    )
    ds['DisplayValue'] = ds['Numeric'].astype(int).round(0)
    `}
            </SyntaxHighlighter>
            </div>

        </div>
    );
}
export default Page;