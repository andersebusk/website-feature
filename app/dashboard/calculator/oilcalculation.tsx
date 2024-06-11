'use client';
import React, { useEffect, useRef } from 'react';
import UseOilSavingsCalculation from '../NewCalculator';

const Calculation = () => {
    const { olie_besparelser, savings } = UseOilSavingsCalculation();
    const previousSavingsRef = useRef(savings);

    // Parse the form data safely with a fallback
    const savedFormData = sessionStorage.getItem('formData') ? JSON.parse(sessionStorage.getItem('formData') || '{}') : {};

    useEffect(() => {
        // Ensure that all necessary fields are available before calling olie_besparelser
        if (savedFormData.BN_value && savedFormData.oil_load && savedFormData.ME_oil_price && 
            savedFormData.ME_power && savedFormData.annual_days_sailing && 
            savedFormData.feedrate && savedFormData.commercial_oil_price) {
            
            olie_besparelser(
                savedFormData.BN_value,
                savedFormData.oil_load,
                savedFormData.ME_oil_price,
                savedFormData.ME_power,
                savedFormData.annual_days_sailing,
                savedFormData.feedrate,
                savedFormData.commercial_oil_price
            );
        }
    }, []);

    useEffect(() => {
        if (JSON.stringify(previousSavingsRef.current) !== JSON.stringify(savings)) {
            sessionStorage.setItem('savingsData', JSON.stringify(savings));
            console.log('Savings data saved to sessionStorage:', savings);
            previousSavingsRef.current = savings;
        }
    }, [savings]);

    console.log('savedSavingsData:', savings);

    return null;
};

export default Calculation;
