"use client";
import React, { useRef, useEffect, useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { UserIcon, CogIcon, BeakerIcon, ArrowRightIcon, CalendarIcon, ChartBarIcon, InformationCircleIcon} from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { lusitana } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/app/ui/blend.module.css'

export default function SubmissionForm() {

  const [hasScrubber, setHasScrubber] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipBN, setShowTooltipBN] = useState(false);
  const [showTooltipBNHigh, setShowTooltipBNHigh] = useState(false);

  const fuelOilSulfurRef = useRef<HTMLInputElement>(null);


  const handleScrubberClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setHasScrubber(isChecked);
  };

  useEffect(() => {
    if (fuelOilSulfurRef.current) {
      fuelOilSulfurRef.current.value = hasScrubber ? 'Above 0.5' : 'Between 0-0.5';
    }
  }, [hasScrubber]);

  const handleTooltipHover = () => {
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };

  const handleBNtipHover = () => {
    setShowTooltipBN(true);
  };

  const handleBNtipLeave = () => {
    setShowTooltipBN(false);
  };

  const handleBNHighHover = () => {
    setShowTooltipBNHigh(true);
  };

  const handleBNHighLeave = () => {
    setShowTooltipBNHigh(false);
  };

  const vesselNameRef = useRef<HTMLInputElement>(null);
  const ME_powerRef = useRef<HTMLInputElement>(null);
  const BN_valueRef = useRef<HTMLInputElement>(null);
  const ME_oil_priceRef = useRef<HTMLInputElement>(null);
  const commercial_oil_priceRef = useRef<HTMLInputElement>(null);
  const oilLoadRef = useRef<HTMLInputElement>(null);
  const annualDaysSailingRef = useRef<HTMLInputElement>(null);
  const feedrateRef = useRef<HTMLInputElement>(null);
  const MainEngineTypeRef = useRef<HTMLInputElement>(null);
  const onBoardRef = useRef<HTMLInputElement>(null);
  const highBNOilRef = useRef<HTMLInputElement>(null);
  const highBNOilPriceRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const saveFieldToSessionStorage = (field: string, value: any) => {
    const formDataFromStorage = sessionStorage.getItem('formData');
    let savedFormData = formDataFromStorage ? JSON.parse(formDataFromStorage) : {};
    savedFormData[field] = value;
    sessionStorage.setItem('formData', JSON.stringify(savedFormData));
  };

  const handleInputChange = (ref: React.RefObject<HTMLInputElement>, field: string) => {
    if (ref.current) {
      saveFieldToSessionStorage(field, ref.current.value);
    }
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comInput = commercial_oil_priceRef.current;
    const feedrateInput = feedrateRef.current;
    const highBNOilPriceInput = highBNOilPriceRef.current;

  if (comInput && (comInput.value.trim() === '' || isNaN(parseFloat(comInput.value)))) {
    comInput.value = '2.0';
  }
  if (feedrateInput && (feedrateInput.value.trim() === '' || isNaN(parseFloat(feedrateInput.value)))) {
    feedrateInput.value = '0.95';
  }
  if (highBNOilPriceInput && (highBNOilPriceInput.value.trim() === '' || isNaN(parseFloat(highBNOilPriceInput.value)))) {
    highBNOilPriceInput.value = '3.5';
  }
  
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
      MainEngineTypeRef.current &&
      onBoardRef.current &&
      highBNOilRef.current &&
      highBNOilPriceRef.current
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
        scrubber: hasScrubber,
        onboard_bn: onBoardRef.current.value,
        highBN: highBNOilRef.current.value,
        highBNPrice: highBNOilPriceRef.current.value
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
          if (onBoardRef.current) onBoardRef.current.value = savedFormData.onboard_bn;
          if (highBNOilRef.current) highBNOilRef.current.value = savedFormData.highBN;
          if (highBNOilPriceRef.current) highBNOilPriceRef.current.value = savedFormData.highBNPrice;
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
          <strong>Information about your vessel (Step 1/3)</strong> <br /> <br />
          The following information will not be stored or shared with anyone. <br /> <br />
          Please enter this information about your vessel:
        </h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="vessel_name">
              Vessel name
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="vessel_name"
                type="text"
                name="vessel_name"
                ref={vesselNameRef}
                placeholder="*Enter the name of your vessel"
                required
                onBlur={() => handleInputChange(vesselNameRef, 'vessel_name')}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="w-full">
          <div className="flex items-center mb-3 mt-6">
            <input
              type="checkbox"
              id="scrubber"
              name="scrubber"
              className="mr-2"
              onChange={handleScrubberClick}
              checked={hasScrubber}
            />
            <label htmlFor="scrubber" className="mb-3 mt-3 block text-sm font-medium text-gray-900">
              The vessel has a scrubber installed
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
                     style={{ width: '400px', height: '80px', padding: '10px' }}>
                  Check this box if your vessel has a scrubber. <br />
                  If yes: Fuel oil Sulfur will be calculated above 0,5%S  <br />
                  If no: Fuel oil Sulfur will be calculated between 0- 0,5%S
                </div>
              )}
            </div>
          </div>
        </div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="fuel_oil_sulfur"
          >
            Fuel oil sulfur (%S)
          </label>
          <div className="relative">
            <input
              className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="fuel_oil_sulfur"
              name="fuel_oil_sulfur"
              ref={fuelOilSulfurRef}
              readOnly
              value={hasScrubber ? 'Above 0.5' : 'Between 0 and 0.5'}
            />
            <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900 flex items-center"
                  htmlFor="ME_type"
                >
                  Main engine type
                  <div
                    className="relative ml-2"
                    onMouseEnter={handleBNtipHover}
                    onMouseLeave={handleBNtipLeave}
                    onClick={() => setShowTooltipBN(!showTooltipBN)}
                  >
                    <InformationCircleIcon
                      className="h-5 w-5 text-gray-500 cursor-pointer"
                      aria-hidden="true"
                    />
                    {showTooltipBN && (
                      <div
                        className="absolute z-10 bg-white shadow-md p-2 rounded-md mt-1 text-sm"
                        style={{ width: '300px', height: '55px', padding: '10px' }}
                      >
                        In this field we ask for the type of engine. <br />
                        As an example it could be 6S50ME-B.
                        <br />
                      </div>
                    )}
                  </div>
                </label>
                <div className="relative">
                  <input
                    className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="ME_type"
                    type="text"
                    name="ME_type"
                    ref={MainEngineTypeRef}
                    placeholder="*Enter the type of your main engine"
                    required
                    onBlur={() => handleInputChange(MainEngineTypeRef, 'ME_type')}
                  />
                  <CogIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
          <div className="mt-4">
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="ME_power">
              Main engine power output (kW)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="ME_power"
                  type="number"
                  name="ME_power"
                  ref={ME_powerRef}
                  placeholder="*"
                  min={1}
                  required
                  onBlur={() => handleInputChange(ME_powerRef, 'ME_power')}
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
                Average main engine load (%)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="oil_load"
                  type="number"
                  step="0.01"
                  name="oil_load"
                  placeholder="*"
                  min={1}
                  max={100}
                  ref = {oilLoadRef}
                  required
                  onBlur={() => handleInputChange(oilLoadRef, 'oil_load')}
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
                  className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="annual_days_sailing"
                  type="number"
                  step="0.01"
                  name="annual_days_sailing"
                  placeholder="*"
                  min={1}
                  max={365}
                  ref = {annualDaysSailingRef}
                  required
                  onBlur={() => handleInputChange(annualDaysSailingRef, 'annual_days_sailing')}
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            </div>

            <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="feedrate"
              >
                Cylinder oil feed rate (g/kWh)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="feedrate"
                  type="number"
                  step="0.01"
                  name="feedrate"
                  placeholder="*Estimate if left empty: 0.95"
                  ref = {feedrateRef}
                  onBlur={() => handleInputChange(feedrateRef, 'feedrate')}
                />
                <span style={{ right: '1200px', top: '16px' }} className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

            <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="Onboard_cylinder_oil"
              >
                Onboard cylinder oil BN
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="Onboard_cylinder_oil"
                  type="number"                 
                  name="Onboard_cylinder_oil"
                  placeholder="*"
                  ref = {onBoardRef}
                  required
                  onBlur={() => handleInputChange(onBoardRef, 'onboard_bn')}
                />
                <span style={{ right: '1200px', top: '16px' }} className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="com_oil_price">
              Cost of primary cylinder oil (USD/L)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py/[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="com_oil_price"
                  type="number"
                  step="0.01"
                  name="com_oil_price"
                  ref={commercial_oil_priceRef}
                  placeholder="*Estimate if left empty: 2.0"                 
                  onBlur={() => handleInputChange(commercial_oil_priceRef, 'commercial_oil_price')}
                />
                <span style={{ right: '1174px', top: '16px' }} className="pointer-events-none absolute top-1/2 h/[18px] w/[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="ME_oil_price">
              Cost of main engine system oil (USD/L)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py/[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="ME_oil_price"
                  type="number"
                  step="0.01"
                  name="ME_oil_price"
                  ref={ME_oil_priceRef}
                  placeholder="*"
                  required
                />
                <span style={{ right: '1174px', top: '16px' }} className="pointer-events-none absolute top-1/2 h/[18px] w/[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900 flex items-center" htmlFor="BN_value">
              Requested cylinder oil BN From BOB System
              <div
                className="relative ml-2"
                onMouseEnter={handleBNtipHover}
                onMouseLeave={handleBNtipLeave}
                onClick={() => setShowTooltipBN(!showTooltipBN)}
              >
                <InformationCircleIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  aria-hidden="true"
                />
                {showTooltipBN && (
                  <div className="absolute z-10 bg-white shadow-md p-2 rounded-md mt-1 text-sm"
                      style={{ width: '460px', height: '80px', padding: '10px'}}>
                        This field is depending on whether your vessel has a scrubber or not.
                      If you have a scrubber: Typical values are between 90-120 BN. <br />
                      For compliant vessels (no scrubber): Typical values around 55 BN.
                     <br />
                  </div>
                )}
              </div>
            </label>
            <div className="relative">
              <input
                className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="BN_value"
                type="number"            
                name="BN_value"
                ref={BN_valueRef}
                placeholder="*Requested BN of blended oil"
                required
                onBlur={() => handleInputChange(BN_valueRef, 'BN_value')}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900 flex items-center" htmlFor="high_bn_oil">
                High BN oil for blending
                <div
                  className="relative ml-2"
                  onMouseEnter={handleBNHighHover}
                  onMouseLeave={handleBNHighLeave}
                  onClick={() => setShowTooltipBNHigh(!showTooltipBNHigh)}
                >
                  <InformationCircleIcon
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                    aria-hidden="true"
                  />
                  {showTooltipBNHigh && (
                    <div className="absolute z-10 bg-white shadow-md p-2 rounded-md mt-1 text-sm"
                        style={{ width: '460px', height: '160px', padding: '10px' }}>
                        This field is depending on the BN of the requested oil from the BOB.
                        Typical high BN values for blending are: <br />
                        100 BN <br />
                        140 BN<br />
                        300 BN<br />
                        360 BN<br />
                        400 BN
                       <br />
                    </div>
                  )}
                </div>
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="high_bn_oil"
                  type="number"
                  name="high_bn_oil"
                  ref={highBNOilRef}
                  placeholder="*"
                  required
                  onBlur={() => handleInputChange(highBNOilRef, 'highBN')}
                />
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="high_bn_oil_price">
              Cost of high BN oil (USD/L)
              </label>
              <div className="relative">
                <input
                  className="peer block w-2/4 rounded-md border border-gray-200 py/[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="high_bn_oil_price"
                  type="number"
                  step="0.01"
                  name="high_bn_oil_price"
                  ref={highBNOilPriceRef}
                  placeholder="*Estimate if left empty: 3.5 USD/L"
                  
                  onBlur={() => handleInputChange(highBNOilPriceRef, 'highBNPrice')}
                />
                <span style={{ right: '1174px', top: '16px' }} className="pointer-events-none absolute top-1/2 h/[18px] w/[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></span>
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

          <SubmitButton />
          <div className="flex h-8 items-end space-x-1">
            {/* Add form errors here */}
          </div>
          <div className={styles.blendimagedash}>
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




 

