"use client";
import React, { useRef, useEffect } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { CalendarIcon, ChartBarIcon, BeakerIcon, ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/button'; // Adjust the import according to your project's structure
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';

export default function SubmissionFormAdd() {
  const purifierOilConsumptionRef = useRef<HTMLInputElement>(null);
  const dischargedOilRef = useRef<HTMLInputElement>(null);
  const dischargeIntervalRef = useRef<HTMLInputElement>(null);
  const fuelOilConsumptionRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); 


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      purifierOilConsumptionRef.current &&
      dischargedOilRef.current &&
      dischargeIntervalRef.current &&
      fuelOilConsumptionRef.current
    ) {


      const formDataAdd = {
        purifier_oil: purifierOilConsumptionRef.current.value,
        discharged_oil: dischargedOilRef.current.value,
        discharge_interval: dischargeIntervalRef.current.value,
        fuel_oil_consumption: fuelOilConsumptionRef.current.value
      };


      
      console.log('Form data to be saved:', formDataAdd); // Log the data before saving
      sessionStorage.setItem('formDataAdd', JSON.stringify(formDataAdd));
      console.log('Form data saved to session storage:', formDataAdd);
      

      router.push('/dashboard/results');
    }
  };

  useEffect(() => {
    const formDataAddFromStorage = sessionStorage.getItem('formDataAdd');
    if (formDataAddFromStorage && formDataAddFromStorage !== '') {
      try {
        const savedFormDataAdd = JSON.parse(formDataAddFromStorage);
        console.log('Retrieved form data from session storage:', savedFormDataAdd);
        if (savedFormDataAdd) {
          if (purifierOilConsumptionRef.current) purifierOilConsumptionRef.current.value = savedFormDataAdd.purifier_oil;
          if (dischargedOilRef.current) dischargedOilRef.current.value = savedFormDataAdd.discharged_oil;
          if (dischargeIntervalRef.current) dischargeIntervalRef.current.value = savedFormDataAdd.discharge_interval;
          if (fuelOilConsumptionRef.current) fuelOilConsumptionRef.current.value = savedFormDataAdd.fuel_oil_consumption;
        }
      } catch (error) {
        console.error('Error parsing form data from session storage', error);
      }
    }
  }, []);

  return (
<form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          <strong>Additional information (Step 2/3)</strong> <br /> <br />
          The following information is more specific to your vessel, <br /> 
          and will help us provide you with the best possible service. <br /> 
          Please fill in the following fields:
        </h1>
        <div className="w-full">
          <div>
            <label 
              className="mb-3 mt-5 block text-xs font-medium text-gray-900" 
              htmlFor="fuel_oil_consumption">
              Fuil oil consumption per day
            </label>
            <div className="relative">
              <input
                className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="fuel_oil_consumption"
                type="number"
                step="0.01"
                name="fuel_oil_consumption"
                ref={fuelOilConsumptionRef}
                placeholder="*Enter your fuel oil consumption per day"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="discharged_oil"
            >
              Discharged oil
            </label>
            <div className="relative">
              <input
                className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="discharged_oil"
                type="number"
                step="0.01"
                name="discharged_oil"
                placeholder="*Amount of discharged oil at every de-sludging (specific to your purifier)"
                ref = {dischargedOilRef}
                required
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
              Discharge interval
            </label>
            <div className="relative">
              <input
                className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="discharge_interval"
                type="number"
                step="0.01"
                name="discharge_interval"
                placeholder="*Discharge interval from separator"
                ref = {dischargeIntervalRef}
                required
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          </div>
          <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="purifier_oil_consumption"
            >
              ME purifier oil consumption
            </label>
            <div className="relative">
              <input
                className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="purifier_oil_consumption"
                type="number"
                step="0.01"
                name="purifier_oil_consumption"
                placeholder="*Enter the aprroximate oil consumption via the purifier (due to desludding)"
                ref = {purifierOilConsumptionRef}
                required
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          </div>

        <SubmitButton />
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
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
    <Button className="mt-4 w-1/6" type="submit" onClick={onClick}>
      Next <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
    </Button>
  );
}

