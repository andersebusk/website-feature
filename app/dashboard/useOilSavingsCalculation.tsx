import { useState } from 'react';
import ME_power from './page';
import BN_value from './page';
import ME_oil from './page';
import ME_oil_price from './page';
import { useContext } from 'react';
import { FormValuesContext } from './results/FormValuesContext';


const useOilSavingsCalculation = () => {
    const [savings, setSavings] = useState({
        Savings_USD: '',
        Savings_L: '',
        Savings_CO2_ton: ''
    });
const formValues = useContext(FormValuesContext);

    // Parse the form values to numbers
    const ME_power = Number(formValues.ME_power);
    const BN_value = Number(formValues.BN_value);
    const ME_oil = Number(formValues.ME_oil);
    const ME_oil_price = Number(formValues.ME_oil_price);

    const olie_besparelser = (
        requestedBN: number,
        auxOilReplace: number,
        highBNOil: number,
        densityHigh: number,
        priceHigh: number,
        meSystemOilBN: number,
        densityME: number,
        priceME: number,
        mePower: number,
        daysSailing: number,
        feedrateWithout: number,
        feedrateBOB: number,
        priceOilL: number
    ) => {
        // Antagelser for brugt hjælpemotorolie
        const Used_Aux_engine_oil_BN = 20;
        const Used_Aux_engine_oil_density = 0.91;
        const Used_Aux_engine_oil_price = 0; // Sæt den faktiske pris her

        // Beregning af hovedmotorolie
        const Oil_ME_kg = (requestedBN - highBNOil) / (meSystemOilBN - highBNOil);
        const Oil_ME_L = Oil_ME_kg / densityME;
        const Oil_ME_price = Oil_ME_L * priceME;

        // Beregning af hjælpemotorolie
        const Oil_AUX_kg = Oil_ME_kg * auxOilReplace / (1 - auxOilReplace);
        const Oil_AUX_L = Oil_AUX_kg / Used_Aux_engine_oil_density;
        const Oil_AUX_price = Oil_AUX_L * Used_Aux_engine_oil_price;

        // Beregning af høj BN olie
        const Oil_High_kg = (Oil_ME_kg * meSystemOilBN + Oil_AUX_kg * Used_Aux_engine_oil_BN) / highBNOil;
        const Oil_High_L = Oil_High_kg / densityHigh;
        const Oil_high_price = Oil_High_L * priceHigh;

        // Samlet blanding af olie
        const Blended_oil_L_sum = Oil_ME_L + Oil_AUX_L + Oil_High_L;
        const Blended_oil_price_sum = Oil_ME_price + Oil_AUX_price + Oil_high_price;

        // Årligt forbrug og besparelser
        const kWh_annual = mePower * 0.6 * daysSailing * 24;
        const annual_consumption_ltr_without = kWh_annual * feedrateWithout * 0.001 / 0.95;
        const annual_consumption_ltr_BOB = kWh_annual * feedrateBOB * 0.001 / 0.95;
        const Price_oil_L_BOB = Blended_oil_price_sum / Blended_oil_L_sum;

        const SUM_without = annual_consumption_ltr_without * priceOilL;
        const SUM_BOB = annual_consumption_ltr_BOB * Price_oil_L_BOB;

        const Savings_USD = SUM_without - SUM_BOB;
        const Savings_L = annual_consumption_ltr_without - annual_consumption_ltr_BOB;
        const Savings_CO2_ton = 3 / 1000 * Savings_L;

        setSavings({
            Savings_USD: Savings_USD.toFixed(2),
            Savings_L: Savings_L.toFixed(2),
            Savings_CO2_ton: Savings_CO2_ton.toFixed(2)
        });
    };

    return {
        savings,
        olie_besparelser
    };
};

export default useOilSavingsCalculation;
