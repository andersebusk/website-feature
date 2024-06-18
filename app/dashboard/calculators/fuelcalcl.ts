import { useState } from 'react';

const useFuelSavingsCalculation = () => {
    const [savingsF, setSavings] = useState({USD_F: 0, Liters_F: 0, CO2_Tons_F: 0});

    function fuel_besparelser(
        Load: number,
        ME_power: number,
        Days_sailing: number,
        USD_MT: number,
        FOC: number
    ): number[] {
        const ME_efficiency: number = 0.008

        const TD: number = (((FOC * ME_power)/1000)/1000)*24* (Load/100)

        const annual_MT_FO: number = TD * Days_sailing

        const FO_USD: number = annual_MT_FO * USD_MT

        const savings_FO_USD: number = ME_efficiency * FO_USD

        const savings_FO_L: number = (annual_MT_FO-(annual_MT_FO*(1-ME_efficiency)))*1000

        const savings_FO_CO2: number = (savings_FO_L/1000)*3.24

        setSavings({USD_F: savings_FO_USD, Liters_F: savings_FO_L, CO2_Tons_F: savings_FO_CO2});

        return [savings_FO_USD, savings_FO_L, savings_FO_CO2];
    }

    return { savingsF, fuel_besparelser, setSavings };
};

export default useFuelSavingsCalculation;