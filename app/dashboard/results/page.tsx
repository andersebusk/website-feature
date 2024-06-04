"use client";
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';

const Page = () => {
  const router = useRouter();
  const pdfContentRef = useRef(null);
  const [formData, setFormData] = useState(null);
  const [formDataAdd, setFormDataAdd] = useState(null);

  const generatePDF = () => {
    const pdf = new jsPDF();
    const element = document.createElement('div');
    document.body.appendChild(element);
    element.classList.add('bg-customColor');
    const computedStyle = window.getComputedStyle(element);
    const customColor = computedStyle.backgroundColor;
    pdf.setFillColor(customColor);
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
    pdf.save('Savings overview.pdf');
    document.body.removeChild(element);
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const goToAdditionalPage = () => {
    router.push('/dashboard/additional');
  };

  useEffect(() => {
    try {
      const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '{}');
      const savedFormDataAdd = JSON.parse(sessionStorage.getItem('formDataAdd') || '{}');
  
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


  return (
  <form className="space-y-3">
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
    <div ref={pdfContentRef}>
    <h1 className={`${lusitana.className} mb-3 text-2xl`}>
        <strong>Results</strong> <br /> <br />
        <strong>Thats it!</strong> <br />
        We have all the information we need. <br />
        Please check if the information is correct and click the button below to generate your savings overview.
      </h1>
      </div>
      
      <div>
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

      </div>
      <div>
        <Button className="mt-5 w-1/7" onClick={generatePDF}>
          Generate PDF <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <Button className="mt-5 w-1/7" onClick={goToDashboard}>
          Go to General <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <Button className="mt-5 w-1/7" onClick={goToAdditionalPage}>
          Go to additional <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </div>
    </form>
  );
};

export default Page;
