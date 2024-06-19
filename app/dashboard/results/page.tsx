'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import useOilSavingsCalculation from '../NewCalculator';
import useEnergySavingsCalculation from '../calculators/energycalc';
import useFuelSavingsCalculation from '../calculators/fuelcalcl';
import usePurifierSavingsCalculation from '../calculators/purifercalc';
import { BackButton } from '@/app/ui/backbutton';



const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [formDataAdd, setFormDataAdd] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const { olie_besparelser, savings } = useOilSavingsCalculation();
  const { energy_besparelser, savingsE } = useEnergySavingsCalculation();
  const { fuel_besparelser, savingsF } = useFuelSavingsCalculation();
  const { purifier_besparelser, savingsP } = usePurifierSavingsCalculation();
  const previousSavingsRef = useRef(savings);
  const previousSavingsE = useRef(savingsE);
  const previousSavingsF = useRef(savingsF);
  const previousSavingsP = useRef(savingsP);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipHover = () => {
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };
  

  useEffect(() => {
    try {
      const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '{}');
      const savedFormDataAdd = JSON.parse(sessionStorage.getItem('formDataAdd') || '{}');
      const savedLoginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');

      if (Object.keys(savedFormData).length > 0) {
        setFormData(savedFormData);
      } else {
        console.warn('No form data found in session storage');
      }

      if (Object.keys(savedFormDataAdd).length > 0) {
        setFormDataAdd(savedFormDataAdd);
      } else {
        console.warn('No additional form data found in session storage');
      }
      if (Object.keys(savedLoginData).length > 0) {
        setLoginData(savedLoginData);
      } else {
        console.warn('No login data found in session storage');
      }
      
        olie_besparelser(
            savedFormData.BN_value,
            savedFormData.oil_load,
            savedFormData.ME_oil_price,
            savedFormData.ME_power,
            savedFormData.annual_days_sailing,
            savedFormData.feedrate,
            savedFormData.commercial_oil_price,
            savedFormData.highBN,
            savedFormData.highBNPrice
        );

        energy_besparelser(
            savedFormData.annual_days_sailing, 
            savedFormDataAdd.fuel_price
        );

        fuel_besparelser(
            savedFormData.oil_load,
            savedFormData.ME_power,
            savedFormData.annual_days_sailing,
            savedFormDataAdd.fuel_price,
            savedFormDataAdd.SFOC_value
        );

        purifier_besparelser(
            savedFormDataAdd.discharge_interval,
            savedFormDataAdd.discharged_oil,
            savedFormData.ME_oil_price,
            savedFormDataAdd.maintenance_cost
        );

      

    } catch (error) {
      console.error('Error parsing form data from session storage', error);
    }
  }, []);

  if (!formData || !formDataAdd || !loginData) {
    return <div>Please fill out the rest of the fields...</div>;
  }
  

  const {
    vessel_name = 'N/A',
    ME_power = 'N/A',
    BN_value = 'N/A',
    scrubber = false,
    ME_oil_price = 'N/A',
    commercial_oil_price = 'N/A',
    oil_load = 'N/A',
    annual_days_sailing = 'N/A',
    fuel_oil_sulfur = 'N/A',
    feedrate = 'N/A',
    highBN = 'N/A',
    highBNPrice = 'N/A',
    MainEngineType = 'N/A',
    onboard_bn = 'N/A'



  } = formData;

  const {
    fuel_price = 'N/A',
    SFOC_value = 'N/A',
    maintenance_cost = 'N/A',
    discharged_oil = 'N/A',
    discharge_interval = 'N/A',
    fuel_oil_consumption = 'N/A'

  } = formDataAdd as any;

  const {
    company = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    country = 'N/A'
  } = loginData as any;


  const handleDownloadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (JSON.stringify(previousSavingsRef.current) !== JSON.stringify(savings)) {
      sessionStorage.setItem('savingsData', JSON.stringify(savings));
      console.log('Savings data saved to sessionStorage:', savings);
      previousSavingsRef.current = savings;
    }
    console.log('savedSavingsData:', savings);
    if (JSON.stringify(previousSavingsE.current) !== JSON.stringify(savingsE)) {
      sessionStorage.setItem('savingsDataE', JSON.stringify(savingsE));
      console.log('SavingsE data saved to sessionStorage:', savingsE);
      previousSavingsE.current = savingsE;
    }
    console.log('savedSavingsData:', savingsE);
    if (JSON.stringify(previousSavingsF.current) !== JSON.stringify(savingsF)) {
      sessionStorage.setItem('savingsDataF', JSON.stringify(savingsF));
      console.log('SavingsF data saved to sessionStorage:', savingsF);
      previousSavingsF.current = savingsF;
    }
    console.log('savedSavingsData:', savingsF);
    if (JSON.stringify(previousSavingsP.current) !== JSON.stringify(savingsP)) {
      sessionStorage.setItem('savingsDataP', JSON.stringify(savingsP));
      console.log('SavingsP data saved to sessionStorage:', savingsP);
      previousSavingsP.current = savingsP;
    }
    console.log('savedSavingsData:', savingsP);
    router.push('/downloadsite');
  };

  const handleBackAdditional = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard/additional');
  };

  const handleBackDashboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard');
  };


  return (
    <form className="space-y-3" onSubmit={handleDownloadImage} >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            <strong>Results</strong> <br /> <br />
            <strong>Thats it!</strong> <br />
            We have all the information we need. <br />
            Please check if the information is correct and click the button below to generate your savings overview.
          </h1>
        </div>

        <div>
          <strong>Your information:</strong>
          <p>Company: {company}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Country: {country}</p>
          <br />
          <strong>Vessel information:</strong>
          <p>Vessel name: {vessel_name}</p>
          <p>Scrubber fitted: {scrubber ? 'Yes' : 'No'}</p>
          <p>Fuel oil sulfur (S%): {fuel_oil_sulfur}</p>
          <p>Main engine type: {MainEngineType}</p>
          <p>Main engine power  output (kW): {ME_power}</p>
          <p>Average main engine Load (%): {oil_load}</p>
          <p>Annual days sailing: {annual_days_sailing}</p>
          <p>Cylinder oil feed rate (g/kWh): {feedrate}</p>
          <p>Onboard cylinder oil BN: {onboard_bn}</p>
          <p>Cost of primary cylinder oil (USD/L): {commercial_oil_price}</p>
          <p>Cost of main engine system oil (USD/L): {ME_oil_price}</p>
          <p>Requested cylinder oil BN from BOB System: {BN_value}</p>
          <p>High BN oil for blending: {highBN}</p>
          <p>Cost of high BN oil (USD/L): {highBNPrice}</p>
          <br />
          <strong>Additional information:</strong>
          <br />
          <strong>Fuel information</strong>
          <p>Fuel oil consumption per day (MT/day): {fuel_oil_consumption}</p>
          <p>Specific fuel oil consumption (g/kWh): {SFOC_value}</p>
          <p>Cost of fuel oil (USD/MT): {fuel_price}</p>
          <br />
          <strong>Main engine lube oil centrifuge</strong>
          <p>Amount of system oil discharged at every de-sludging (specific to your purifier) (L): {discharged_oil}</p>
          <p>Discharge interval from separator (h): {discharge_interval}</p>
          <p>Approximate cost of purifier maintenance annually (USD): {maintenance_cost}</p>
          <div className="w-full">
          <div className="flex items-center mb-3 mt-6">
            <label htmlFor="NB" className="mb-3 mt-3 block text-sm font-medium text-gray-900">
              NB
            </label>
            <div
              className="relative ml-2"
              onMouseEnter={handleTooltipHover}
              onMouseLeave={handleTooltipLeave}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <InformationCircleIcon
                className="h-5 w-5 text-gray-500 cursor-pointer"
                aria-hidden="true"
              />
              {showTooltip && (
                <div className="absolute z-10 bg-white shadow-md p-2 rounded-md mt-1 text-sm mb-3 mt-5 block text-sm font-medium text-gray-900"
                     style={{ width: '450px', height: '80px', padding: '10px' }}>
                  Our calculations are based on the assumption that the cylinder oil feed rate will be reduced to 0.8 after the installation of BOB.
                  Additionally, we assume that 1 ton of oil equals 1000 liters.
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
        <div>
          <GenerateSavings />
          <BackButton className="mt-4 w-1/6" type="submit" onClick={handleBackAdditional}>
        Go to Additional <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
        </BackButton> 
        <BackButton className="mt-4 w-1/6" type="submit" onClick={handleBackDashboard}>
        Go to General <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
        </BackButton>
        </div>
      </div>
    </form>
  );
};

interface Submission {
  onClick?: () => void;
}

function GenerateSavings({ onClick }: Submission) {
  return (
    <Button className="mt-4 w-1/6" type="submit" onClick={onClick}>
      Generate savings <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}


export default Page;
