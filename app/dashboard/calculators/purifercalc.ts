import { useState } from 'react';

const usePurifierSavingsCalculation = () => {
    const [savingsP, setSavings] = useState({USD_P: 0, Liters_P: 0, CO2_Tons_P: 0});

    function purifier_besparelser(
        average_discharge_interval: number,
        average_volume_discharged: number,
        price_L: number,
        maintenance: number
    ): number[] {
        const running_hours: number = 8760

        const liters_hour: number = average_volume_discharged / average_discharge_interval

        const liter_lost_year: number = running_hours * liters_hour

        const annual_lost_lube: number = liter_lost_year * price_L
         
        const hourly_cost: number = maintenance / running_hours

        const hourly_cost_running: number = running_hours * hourly_cost

        const Purifier_cost_year: number = annual_lost_lube + hourly_cost_running

        const Savings_CO2_ton: number = liter_lost_year * 3/1000

        const Savings_L: number = annual_lost_lube

        setSavings({USD_P: Purifier_cost_year, Liters_P: Savings_L, CO2_Tons_P: Savings_CO2_ton});
    
        return [Purifier_cost_year, Savings_L, Savings_CO2_ton];
    }

    return { savingsP, purifier_besparelser, setSavings};
};

export default usePurifierSavingsCalculation;