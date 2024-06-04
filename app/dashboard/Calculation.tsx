import React, { useEffect } from 'react';
import useOilSavingsCalculation from './NewCalculator'; // Assuming this is the correct path

const calculation = () => {
    const { olie_besparelser, savings } = useOilSavingsCalculation();
    const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '');
    const savedFormDataAdd = JSON.parse(sessionStorage.getItem('formDataAdd') || '');

    useEffect(() => {
        olie_besparelser(
            savedFormData.BN_value,
            savedFormData.ME_oil,
            savedFormDataAdd.oil_load,
            savedFormData.ME_oil_price,
            savedFormData.ME_power,
            savedFormDataAdd.annual_days_sailing,
            savedFormDataAdd.feedrate,
            savedFormDataAdd.oil_price
        );
    }, [olie_besparelser, savedFormData, savedFormDataAdd]);

    return (
        <div>
            <h1>Oil Savings Calculation</h1>
            <p>Savings in USD: {savings[0]}</p>
            <p>Savings in Liters: {savings[1]}</p>
            <p>Savings in CO2 Tons: {savings[2]}</p>
            {/* Include other JSX elements as needed */}
        </div>
    );
};

export default calculation;
