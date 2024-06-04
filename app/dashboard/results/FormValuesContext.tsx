// FormValuesContext.tsx

import React from 'react';

interface FormValues {
  vesselName: string;
  ME_power: string;
  BN_value: string;
  ME_oil: string;
  ME_oil_price: string;
}

const defaultFormValues: FormValues = {
  vesselName: '',
  ME_power: '',
  BN_value: '',
  ME_oil: '',
  ME_oil_price: '',
};

export const FormValuesContext = React.createContext(defaultFormValues);