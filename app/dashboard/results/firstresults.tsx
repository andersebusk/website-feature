"use client";
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import useOilSavingsCalculation from '../NewCalculator';

const Page = () => {
  const router = useRouter();
  const pdfContentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savings, setSavings] = useState([0, 0, 0]);

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

  const { olie_besparelser } = useOilSavingsCalculation();

  useEffect(() => {
    const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '{}');
    const savedFormDataAdd = JSON.parse(sessionStorage.getItem('formDataAdd') || '{}');

    if (savedFormData && savedFormDataAdd) {
      const [Savings_USD, Savings_L, Savings_CO2_ton] = olie_besparelser(
        savedFormData.BN_value,
        savedFormData.ME_oil,
        savedFormDataAdd.oil_load,
        savedFormData.ME_oil_price,
        savedFormData.ME_power,
        savedFormDataAdd.annual_days_sailing,
        savedFormDataAdd.feedrate,
        savedFormDataAdd.oil_price
      );
      setSavings([Savings_USD, Savings_L, Savings_CO2_ton]);
      setIsLoading(false);
    }
  }, []); // Tom afhængighedsliste for kun at køre én gang

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const goToAdditionalPage = () => {
    router.push('/dashboard/additional');
  };

  return (
    <div ref={pdfContentRef}>
      <h1 className={`${lusitana.className} mb-3 text-2xl`}>
        <strong>Resultater</strong>
      </h1>
      <p>
        <strong>Det var det!</strong> <br />
        Vi har alle de oplysninger, vi har brug for. <br />
        Kontrollér venligst, om oplysningerne er korrekte, og klik på knappen nedenfor for at generere din besparelsesoversigt.
      </p>
      <div>
        <h2>Resultater</h2>
        <div>
          <h1>Oliebesparelsesberegning</h1>
          {isLoading ? (
            <p>Indlæser...</p>
          ) : (
            <>
              <p>Besparelser i USD: {savings[0].toFixed(2)}</p>
              <p>Besparelser i liter: {savings[1].toFixed(2)}</p>
              <p>Besparelser i CO2 tons: {savings[2].toFixed(2)}</p>
            </>
          )}
        </div>
      </div>
      <Button className="mt-5 w-1/7" onClick={generatePDF}>
        Generer PDF <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <Button className="mt-5 w-1/7" onClick={goToDashboard}>
        Gå til Dashboard <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <Button className="mt-5 w-1/7" onClick={goToAdditionalPage}>
        Gå til yderligere side <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </div>
  );
};

export default Page;
