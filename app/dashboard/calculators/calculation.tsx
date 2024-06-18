'use client';
import React, { useEffect } from 'react';
import useOilSavingsCalculation from '../NewCalculator'; // Assuming this is the correct path

const calculation = () => {
    const { olie_besparelser, savings } = useOilSavingsCalculation();
    const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '');

// Make sure to parse other input values similarly if needed


// Make sure to parse other input values similarly if needed


    useEffect(() => {
        olie_besparelser(
            savedFormData.BN_value,
            savedFormData.oil_load,
            savedFormData.ME_oil_price,
            savedFormData.ME_power,
            savedFormData.annual_days_sailing,
            savedFormData.feedrate,
            savedFormData.commercial_oil_price
        );
    }, []);

    useEffect(() => {
        const savedSavingsData = JSON.parse(sessionStorage.getItem('savingsData') || '{}');
        if (JSON.stringify(savedSavingsData) !== JSON.stringify(savings)) {
            sessionStorage.setItem('savingsData', JSON.stringify(savings));
            console.log('Savings data saved to sessionStorage:', savings);
        }
    }, [savings]);

    console.log('savedFormData:', savedFormData);

    return (
        <div>
            <h1>Oil Savings Calculation</h1>
            <p>Savings in USD: {savings.USD}</p>
            <p>Savings in Liters: {savings.Liters}</p>
            <p>Savings in CO2 Tons: {savings.CO2_Tons}</p>
        </div>
    );
};

export default calculation;