"use client";
import React, { useRef, useEffect, useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { UserIcon, CogIcon, BeakerIcon, ArrowRightIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button'; // Adjust the import according to your project's structure
import { lusitana } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation'; // Import useRouter from 'next/router'
import { Main } from 'next/document';

export default function SubmissionForm() {

  const [hasScrubber, setHasScrubber] = useState(false);

  const handleScrubberClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasScrubber(e.target.checked);
  };

  const vesselNameRef = useRef<HTMLInputElement>(null);
  const ME_powerRef = useRef<HTMLInputElement>(null);
  const BN_valueRef = useRef<HTMLInputElement>(null);
  const ME_oil_priceRef = useRef<HTMLInputElement>(null);
  const commercial_oil_priceRef = useRef<HTMLInputElement>(null);
  const oilLoadRef = useRef<HTMLInputElement>(null);
  const annualDaysSailingRef = useRef<HTMLInputElement>(null);
  const fuelOilSulfurRef = useRef<HTMLSelectElement>(null);
  const feedrateRef = useRef<HTMLInputElement>(null);
  const MainEngineTypeRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (
      vesselNameRef.current &&
      ME_powerRef.current &&
      BN_valueRef.current &&
      ME_oil_priceRef.current &&
      commercial_oil_priceRef.current &&
      oilLoadRef.current &&
      annualDaysSailingRef.current &&
      fuelOilSulfurRef.current &&
      feedrateRef.current &&
      MainEngineTypeRef.current
    ) {
      const formData = {
        vessel_name: vesselNameRef.current.value,
        ME_power: ME_powerRef.current.value,
        BN_value: BN_valueRef.current.value,
        ME_oil_price: ME_oil_priceRef.current.value,
        commercial_oil_price: commercial_oil_priceRef.current.value,
        oil_load: oilLoadRef.current.value,
        annual_days_sailing: annualDaysSailingRef.current.value,
        fuel_oil_sulfur: fuelOilSulfurRef.current.value,
        feedrate: feedrateRef.current.value,
        MainEngineType: MainEngineTypeRef.current.value,
        scrubber: hasScrubber
      };
      console.log('Form data to be saved:', formData);
      sessionStorage.setItem('formData', JSON.stringify(formData));
      console.log('Form data saved to session storage:', formData);
      router.push('/dashboard/additional');
    }
  };

  useEffect(() => {
    const formDataFromStorage = sessionStorage.getItem('formData');
    if (formDataFromStorage && formDataFromStorage !== '') {
      try {
        const savedFormData = JSON.parse(formDataFromStorage);
        console.log('Retrieved form data from session storage:', savedFormData);
        if (savedFormData) {
          if (vesselNameRef.current) vesselNameRef.current.value = savedFormData.vessel_name;
          if (ME_powerRef.current) ME_powerRef.current.value = savedFormData.ME_power;
          if (BN_valueRef.current) BN_valueRef.current.value = savedFormData.BN_value;
          if (ME_oil_priceRef.current) ME_oil_priceRef.current.value = savedFormData.ME_oil_price;
          setHasScrubber(savedFormData.scrubber);
          if (commercial_oil_priceRef.current) commercial_oil_priceRef.current.value = savedFormData.commercial_oil_price;
          if (oilLoadRef.current) oilLoadRef.current.value = savedFormData.oil_load;
          if (annualDaysSailingRef.current) annualDaysSailingRef.current.value = savedFormData.annual_days_sailing;
          if (fuelOilSulfurRef.current) fuelOilSulfurRef.current.value = savedFormData.fuel_oil_sulfur;
          if (feedrateRef.current) feedrateRef.current.value = savedFormData.feedrate;
          if (MainEngineTypeRef.current) MainEngineTypeRef.current.value = savedFormData.MainEngineType;
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
          <strong>Information about your vessel (Step 1/3)</strong> <br /> <br />
          The following information won't be stored or shared with anyone. <br /> <br />
          Please enter this information about your vessel:
        </h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="vessel_name">
              Vessel name
            </label>
            <div className="relative">
              <input
                className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="vessel_name"
                type="text"
                name="vessel_name"
                ref={vesselNameRef}
                placeholder="*Enter the name of your vessel"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="flex items-center mb-3 mt-6">
          <input type="checkbox" id="scrubber" name="scrubber" className="mr-2" onChange={handleScrubberClick} checked={hasScrubber} />
          <label htmlFor="scrubber" className="text-sm">The vessel has a scrubber installed</label>
          </div>
          <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="ME_type">
                Main engine type
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="ME_type"
                  type="text"
                  name="ME_type"
                  ref={MainEngineTypeRef}
                  placeholder="*Enter the type of your main engine"
                  required
                />
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          <div className="mt-4">
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="ME_power">
                Main engine power (kW/h)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="ME_power"
                  type="number"
                  name="ME_power"
                  ref={ME_powerRef}
                  placeholder="*Power output of your main engine"
                  required
                />
                <span style={{ right: '0', top: '16px' }} className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <CogIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="w-full">
            <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="oil_load"
              >
                Load of the oil (%)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="oil_load"
                  type="number"
                  name="oil_load"
                  placeholder="*Load of the oil (%)"
                  ref = {oilLoadRef}
                  required
                />
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="annual_days_sailing"
              >
                Annual days sailing
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="annual_days_sailing"
                  type="number"
                  name="annual_days_sailing"
                  placeholder="*Annual days of sailing"
                  ref = {annualDaysSailingRef}
                  required
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            </div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="fuel_oil_sulfur"
            >
              Fuel oil sulfur
            </label>
              <div className="relative">
              <select
                className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="fuel_oil_sulfur"
                name="fuel_oil_sulfur"
                ref = {fuelOilSulfurRef}
                
              >
                <option value="">*Select a value</option>
                <option value="0-0.5">Between 0 and 0.5</option>
                <option value="above-0.5">Above 0.5</option>
              </select>
            
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
            <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="feedrate"
              >
                Feedrate (g/kWh)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="feedrate"
                  type="number"
                  step="0.01"
                  name="feedrate"
                  placeholder="*Feedrate of your main engine oil"
                  ref = {feedrateRef}
                  required
                />
                <span style={{ right: '1200px', top: '16px' }} className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="BN_value">
                Requested BN value
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="BN_value"
                  type="number"
                  name="BN_value"
                  ref={BN_valueRef}
                  placeholder="*BN value of cylinder oil"
                  required
                />
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="com_oil_price">
                Commercial oil price (USD/L)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py/[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="com_oil_price"
                  type="number"
                  name="com_oil_price"
                  ref={commercial_oil_priceRef}
                  placeholder="*Price of commercial cylinder oil"
                  required
                />
                <span style={{ right: '1174px', top: '16px' }} className="pointer-events-none absolute top-1/2 h/[18px] w/[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="ME_oil_price">
                Main engine system oil price (USD/L)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/6 rounded-md border border-gray-200 py/[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="ME_oil_price"
                  type="number"
                  step="0.01"
                  name="ME_oil_price"
                  ref={ME_oil_priceRef}
                  placeholder="*Price of main engine oil"
                  required
                />
                <span style={{ right: '1174px', top: '16px' }} className="pointer-events-none absolute top-1/2 h/[18px] w/[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <SubmitButton />
          <div className="flex h-8 items-end space-x-1">
            {/* Add form errors here */}
          </div>
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




 

