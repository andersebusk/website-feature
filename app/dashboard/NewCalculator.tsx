import { useState } from 'react';

const useOilSavingsCalculation = () => {
    const [savings, setSavings] = useState({USD: 0, Liters: 0, CO2_Tons: 0});

    function olie_besparelser(
        Requested_BN: number,
        Load: number,
        Price_ME: number,
        ME_power: number,
        Days_sailing: number,
        Feedrate_without: number,
        Price_oil_L: number
    ): number[] {
        const variabel: number = 99;
        const Used_Aux_engine_oil_BN: number = 20;
        const Used_Aux_engine_oil_density: number = 0.91;
        const Used_Aux_engine_oil_price: number = 0;
        const Aux_oil_replace: number = 0;
        const High_BN_oil: number = 365;
        const Density_high: number = 0.95;
        const Price_high: number = 3.5;
        const Density_ME: number = 0.87;
        const Feedrate_BOB: number = 0.8;
        const ME_system_oil_BN: number = 8;

        const Oil_ME_kg: number = (variabel * (Requested_BN - High_BN_oil)) / (ME_system_oil_BN + ((Aux_oil_replace * Used_Aux_engine_oil_BN - Aux_oil_replace * High_BN_oil) / (1 - Aux_oil_replace)) - High_BN_oil);
        const Oil_ME_L: number = Oil_ME_kg / Density_ME;
        const Oil_ME_price: number = Oil_ME_L * Price_ME;

        const Oil_AUX_kg: number = (Oil_ME_kg * Aux_oil_replace) / (1 - Aux_oil_replace);
        const Oil_AUX_L: number = Oil_AUX_kg / Used_Aux_engine_oil_density;
        const Oil_AUX_price: number = Oil_AUX_L * Used_Aux_engine_oil_price;

        const Oil_High_kg: number = (((Oil_ME_kg + Oil_AUX_kg) * Requested_BN - (Oil_ME_kg * ME_system_oil_BN + Oil_AUX_kg * Used_Aux_engine_oil_BN)) / (High_BN_oil * (1 - (Requested_BN / High_BN_oil))));
        const Oil_High_L: number = Oil_High_kg / Density_high;
        const Oil_High_price: number = Oil_High_L * Price_high;

        const Blended_oil_kg_sum: number = Oil_ME_kg + Oil_AUX_kg + Oil_High_kg;
        const Blended_oil_L_sum: number = Oil_ME_L + Oil_AUX_L + Oil_High_L;
        const Blended_oil_price_sum: number = Oil_ME_price + Oil_AUX_price + Oil_High_price;

        const kWh_annual: number = ME_power * (Load/100) * Days_sailing * 24;

        const annual_consumption_ltr_without: number = kWh_annual * Feedrate_without * 0.001 / 0.95;
        const annual_consumption_ltr_BOB: number = kWh_annual * Feedrate_BOB * 0.001 / 0.95;

        const Price_oil_L_BOB: number = Blended_oil_price_sum / Blended_oil_L_sum;

        const SUM_without: number = annual_consumption_ltr_without * Price_oil_L;
        const SUM_BOB: number = annual_consumption_ltr_BOB * Price_oil_L_BOB;
    
        const Savings_USD: number = SUM_without - SUM_BOB;
        const Savings_L: number = annual_consumption_ltr_without - annual_consumption_ltr_BOB;
        const Savings_CO2_ton: number = (3 / 1000) * Savings_L;

        
        setSavings({USD: Savings_USD, Liters: Savings_L, CO2_Tons: Savings_CO2_ton});

        return [Savings_USD, Savings_L, Savings_CO2_ton];
    }

    return { savings, olie_besparelser, setSavings };
};

export default useOilSavingsCalculation;
