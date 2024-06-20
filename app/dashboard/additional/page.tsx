"use client";
import React, { useRef, useEffect } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { CalendarIcon, ChartBarIcon, BeakerIcon, ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/button'; // Adjust the import according to your project's structure
import { useRouter } from 'next/navigation';
import { BackButton } from '../../ui/backbutton';
import { inter, lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import styles from '@/app/ui/blend.module.css';

export default function SubmissionFormAdd() {
  const fuelPriceRef = useRef<HTMLInputElement>(null);
  const dischargedOilRef = useRef<HTMLInputElement>(null);
  const dischargeIntervalRef = useRef<HTMLInputElement>(null);
  const fuelOilConsumptionRef = useRef<HTMLInputElement>(null);
  const SFOCref = useRef<HTMLInputElement>(null);
  const approxCostRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); 

  const saveFieldToSessionStorage = (field: string, value: any) => {
    const formDataFromStorage = sessionStorage.getItem('formDataAdd');
    let savedFormDataAdd = formDataFromStorage ? JSON.parse(formDataFromStorage) : {};
    savedFormDataAdd[field] = value;
    sessionStorage.setItem('formDataAdd', JSON.stringify(savedFormDataAdd));
  };

  const handleInputChange = (ref: React.RefObject<HTMLInputElement>, field: string) => {
    if (ref.current) {
      saveFieldToSessionStorage(field, ref.current.value);
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      fuelPriceRef.current &&
      dischargedOilRef.current &&
      dischargeIntervalRef.current &&
      fuelOilConsumptionRef.current &&
      SFOCref.current &&
      approxCostRef.current
    ) {


      const formDataAdd = {
        fuel_price: fuelPriceRef.current.value,
        discharged_oil: dischargedOilRef.current.value,
        discharge_interval: dischargeIntervalRef.current.value,
        fuel_oil_consumption: fuelOilConsumptionRef.current.value,
        SFOC_value: SFOCref.current.value,
        maintenance_cost : approxCostRef.current.value
      };


      
      console.log('Form data to be saved:', formDataAdd); // Log the data before saving
      sessionStorage.setItem('formDataAdd', JSON.stringify(formDataAdd));
      console.log('Form data saved to session storage:', formDataAdd);
      

      router.push('/dashboard/results');
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard');
  }

  useEffect(() => {
    const formDataAddFromStorage = sessionStorage.getItem('formDataAdd');
    if (formDataAddFromStorage && formDataAddFromStorage !== '') {
      try {
        const savedFormDataAdd = JSON.parse(formDataAddFromStorage);
        console.log('Retrieved form data from session storage:', savedFormDataAdd);
        if (savedFormDataAdd) {
          if (fuelPriceRef.current) fuelPriceRef.current.value = savedFormDataAdd.fuel_price;
          if (dischargedOilRef.current) dischargedOilRef.current.value = savedFormDataAdd.discharged_oil;
          if (dischargeIntervalRef.current) dischargeIntervalRef.current.value = savedFormDataAdd.discharge_interval;
          if (fuelOilConsumptionRef.current) fuelOilConsumptionRef.current.value = savedFormDataAdd.fuel_oil_consumption;
          if (SFOCref.current) SFOCref.current.value = savedFormDataAdd.SFOC_value;
          if (approxCostRef.current) approxCostRef.current.value = savedFormDataAdd.maintenance_cost;
        }
      } catch (error) {
        console.error('Error parsing form data from session storage', error);
      }
    }
  }, []);

  return (
<form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 w-1/2 rounded-lg bg-gray-50 px-4 py-3">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          <strong>Additional information (Step 2/3)</strong> <br /> <br />
          The following information is more specific to your vessel, <br /> 
          and will help us provide you with the best possible service. <br /> 
          Please fill in the following fields: <br />
        </h1>
        <div className="w-full">
          <div>
            <label 
              className="mb-3 mt-5 block text-xs font-medium text-gray-900" 
              htmlFor="fuel_oil_consumption">
              Fuel oil consumption per day (MT/day)
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="fuel_oil_consumption"
                type="number"
                step="0.01"
                name="fuel_oil_consumption"
                ref={fuelOilConsumptionRef}
                placeholder="*"
                required
                onBlur={() => handleInputChange(fuelOilConsumptionRef, 'fuel_oil_consumption')}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          
        <div className = "w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="SFOC"
            >
              SFOC (g/kWh)
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="SFOC"
                type="number"
                step="0.01"
                name="SFOC"
                placeholder="*Specific fuel oil consumption"
                ref = {SFOCref}
                required
                onBlur={() => handleInputChange(SFOCref, 'SFOC_value')}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          </div>

          <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="fuel_price"
            >
              Cost of fuel oil (USD/MT)
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="fuel_price"
                type="number"
                step="0.01"
                name="fuel_price"
                placeholder="*"
                ref = {fuelPriceRef}
                required
                onBlur={() => handleInputChange(fuelPriceRef, 'fuel_price')}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          </div>
          <br />
          <h1 className={`${lusitana.className} mb-3 text-xl`}>
            <br />
          <strong>Main engine lube oil centrifuge</strong> <br /> <br />
          The following information is specific to your main engine lube oil centrifuge. <br /> <br />
          </h1>
          <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="discharged_oil"
            >
              Amount of system oil discharged at every de-sludging (specific to your purifier) (L)
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="discharged_oil"
                type="number"
                step="0.01"
                name="discharged_oil"
                placeholder="*"
                ref = {dischargedOilRef}
                required
                onBlur={() => handleInputChange(dischargedOilRef, 'discharged_oil')}
              />
              <span style={{ right: '1185px', top: '16px' }} className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
          <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="discharge_interval"
            >
              Discharge interval from separator (h)
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="discharge_interval"
                type="number"
                step="0.01"
                name="discharge_interval"
                placeholder="*Enter the interval in hours"
                ref = {dischargeIntervalRef}
                required
                onBlur={() => handleInputChange(dischargeIntervalRef, 'discharge_interval')}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          </div>
          <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="approx_cost_purifier_annually_spares"
            >
              Approximate cost of purifier maintenance annually (USD)
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="approx_cost_purifier_annually_spares"
                type="number"
                step="0.01"
                name="approx_cost_purifier_annually_spares"
                placeholder="*"
                ref = {approxCostRef}
                required
                onBlur={() => handleInputChange(approxCostRef, 'maintenance_cost')}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          </div>

        <SubmitButton />
        <BackButton className="mt-4 w-2/6" type="submit" onClick={handleBack}>
        Back <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
        </BackButton>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
        <div className={styles.blendimageadd}>
          <Image
            src="/blend1.png"
            width={400}
            height={760}
            alt='Screenshots of the dashboard project showing desktop version'
          />
            <h1></h1>
          </div>
      </div>
      </div>
    </form>
  );
}

interface Submission {
  onClick?: () => void;
}

function SubmitButton({ onClick }: Submission) {
  return (
    <Button className="mt-4 w-2/6" type="submit" onClick={onClick}>
      Next <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
    </Button>
  );
}

