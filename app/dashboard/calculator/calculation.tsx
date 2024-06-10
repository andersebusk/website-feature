'use client';
import React, { useEffect } from 'react';
import UseOilSavingsCalculation from '../NewCalculator';

const Calculation = () => {
    const { olie_besparelser, savings } = UseOilSavingsCalculation();
    const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '');

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
    }, [olie_besparelser, savedFormData]);

    useEffect(() => {
        const savedSavingsData = JSON.parse(sessionStorage.getItem('savingsData') || '{}');
        if (JSON.stringify(savedSavingsData) !== JSON.stringify(savings)) {
            sessionStorage.setItem('savingsData', JSON.stringify(savings));
            console.log('Savings data saved to sessionStorage:', savings);
        }
    }, [savings]);

    console.log('savedFormData:', savedFormData);

    return null;
};

export default Calculation;
