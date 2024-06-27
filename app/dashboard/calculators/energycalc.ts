import { useState } from 'react';

const useEnergySavingsCalculation = () => {
    const [savingsE, setSavings] = useState({USD_E: 0, Liters_E: 0, CO2_Tons_E: 0});

    function energy_besparelser(Days_sailing: number, fuel_USD_ton: number, system_oil_flow: number
    ): number[] {
        const purifier_electric: number = 4.5
        const delta_inlet: number = 58
        const c_vaLue: number = 2.0
        const oil_flow: number = system_oil_flow
        const fuel_oil_needed: number = 0.2

        const steam_consumption: number = (delta_inlet*c_vaLue*oil_flow)/3600

        const heating_needed: number = steam_consumption

        const annual_idle_days: number = 365 - Days_sailing

        const fuel_consumption_MT: number = (heating_needed * annual_idle_days * 24 * fuel_oil_needed) / 1000

        const savings_possible_P: number = (heating_needed * annual_idle_days * 24 * fuel_oil_needed) * fuel_USD_ton / 1000

        const fuel_ton_year: number = (purifier_electric * annual_idle_days * 24 * fuel_oil_needed) / 1000

        const savings_E_USD: number = ( purifier_electric * annual_idle_days * 24 * fuel_oil_needed)* fuel_USD_ton / 1000

        const total_savings_USD: number = savings_E_USD + savings_possible_P

        const total_savings_L_FO: number = (fuel_consumption_MT + fuel_ton_year)*1000

        const total_savings_CO2_ton: number = fuel_consumption_MT * 3.24 + fuel_ton_year * 3.24

        setSavings({USD_E: total_savings_USD, Liters_E: total_savings_L_FO, CO2_Tons_E: total_savings_CO2_ton});

        return [total_savings_USD, total_savings_L_FO, total_savings_CO2_ton];
    }

    return { savingsE, energy_besparelser, setSavings};
};

export default useEnergySavingsCalculation;