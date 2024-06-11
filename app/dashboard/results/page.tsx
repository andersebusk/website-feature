'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import domtoimage from 'dom-to-image';
import useOilSavingsCalculation from '../NewCalculator';


const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [formDataAdd, setFormDataAdd] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [savingsData, setSavingsData] = useState(null);
  const { olie_besparelser, savings } = useOilSavingsCalculation();
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

  console.log('savedSavingsData:', savings);
  

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
      

    } catch (error) {
      console.error('Error parsing form data from session storage', error);
    }
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
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
    feedrate = 'N/A'

  } = formData;

  const {
    purifier_oil = 'N/A',
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
    router.push('/downloadsite');
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
          <p>Vessel Name: {vessel_name}</p>
          <p>ME Power: {ME_power}</p>
          <p>BN Value: {BN_value}</p>
          <p>Scrubber: {scrubber ? 'Yes' : 'No'}</p>
          <p>ME Oil Price: {ME_oil_price}</p>
          <p>Commercial Oil Price: {commercial_oil_price}</p>
          <p>Oil Load: {oil_load}</p>
          <p>Annual Days Sailing: {annual_days_sailing}</p>
          <p>Fuel Oil Sulfur: {fuel_oil_sulfur}</p>
          <p>Feedrate: {feedrate}</p>
          <p>ME purifier oil consumption: {purifier_oil}</p>
          <p>Discharged Oil: {discharged_oil}</p>
          <p>Discharge Interval: {discharge_interval}</p>
          <p>Fuel Oil Consumption: {fuel_oil_consumption}</p>
          <br/>
        </div>
        <div>
          <GenerateSavings />
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
    <Button className="mt-5 w-1/7" type="submit" onClick={onClick}>
      Generate savings <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}


export default Page;
