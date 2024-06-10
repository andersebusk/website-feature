'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import axios from 'axios';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import generatePDF from '@/app/generatepdf';
import domtoimage from 'dom-to-image';
import PdfContent from './pdfcontent';



const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [formDataAdd, setFormDataAdd] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [savingsData, setSavingsData] = useState(null);
 
  
  

  useEffect(() => {
    try {
      const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '{}');
      const savedFormDataAdd = JSON.parse(sessionStorage.getItem('formDataAdd') || '{}');
      const savedLoginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
      const savedSavingsData = JSON.parse(sessionStorage.getItem('savingsData') || '{}');

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

      if (Object.keys(savedSavingsData).length > 0) {
        setSavingsData(savedSavingsData);
      } else {
        console.warn('No savings data found in session storage');
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

  //const {
    //USD = 'N/A',
    //Liters = 'N/A',
    //CO2_Tons = 'N/A'
  //} = savingsData as any;

  const handleDownloadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const PdfContent = document.getElementById('pdf-content');
    const htmlTemplate = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Template</title>
    <style>
        :root{
          --customColor: rgb(38, 96, 147);
          --customColor2: rgb(92, 140, 183);
          --customColor3: rgb(163, 201, 97);
          --font-color: black;
          --highlight-color: var(--customColor);
          --header-bg-color: var(--customColor2);
          --footer-bg-color: var(--customColor3);
          --table-row-separator-color: #BFC0C3;
        }
        @page{
          size:A4;
          margin:0;
          @top-left{
            content:element(header);
          }
          @bottom-left{
            content:element(footer);
          }
        }
        body{
          margin:0;
          padding:1cm 2cm;
          color:var(--font-color);
          font-family: 'Montserrat', sans-serif;
          font-size:10pt;
        }
        a{
          color:inherit;
          text-decoration:none;
        }
        hr{
          margin:1cm 0;
          height:0;
          border:0;
          border-top:1mm solid var(--highlight-color);
        }
        header{
          height:8cm;
          padding:0 2cm;
          position:running(header);
          background-color:var(--header-bg-color);
        }
        header .headerSection{
          display:flex;
          justify-content:space-between;
        }
        header .headerSection:first-child{
          padding-top:.5cm;
        }
        header .headerSection:last-child{
          padding-bottom:.5cm;
        }
        header .headerSection div:last-child{
          width:35%;
        }
        header .logoAndName{
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
        header .logoAndName svg{
          width:1.5cm;
          height:1.5cm;
          margin-right:.5cm;
        }
        header .headerSection .estimateDetails{
          padding-top:1cm;
        }
        header .headerSection .issuedTo{
          display:flex;
          justify-content:space-between;
        }
        header .headerSection .issuedTo h3{
          margin:0 .75cm 0 0;
          color:var(--highlight-color);
        }
        header .headerSection div p{
          margin-top:2px;
        }
        header h1,
        header h2,
        header h3,
        header p{
          margin:0;
        }
        header h2,
        header h3{
          text-transform:uppercase;
        }
        header hr{
          margin:1cm 0 .5cm 0;
        }
        main table{
          width:100%;
          border-collapse:collapse;
        }
        main table thead th{
          height:1cm;
          color:var(--highlight-color);
        }
        main table thead th:nth-of-type(2),
        main table thead th:nth-of-type(3),
        main table thead th:last-of-type{
          width:2.5cm;
        }
        main table tbody td{
          padding:2mm 0;
          border-bottom:0.5mm solid var(--table-row-separator-color);
        }
        main table thead th:last-of-type,
        main table tbody td:last-of-type{
          text-align:right;
        }
        main table th{
          text-align:left;
        }
        main table.summary{
          width:calc(40% + 2cm);
          margin-left:60%;
          margin-top:.5cm;
        }
        main table.summary tr.total{
          font-weight:bold;
          background-color:var(--highlight-color);
        }
        main table.summary th{
          padding:4mm 0 4mm 1cm;
          border-bottom:0;
        }
        main table.summary td{
          padding:4mm 2cm 4mm 0;
          border-bottom:0;
        }
        aside{
          -prince-float: bottom;
          float: none;
          padding:0 2cm .5cm 2cm;
        }
        aside p{
          margin:0;
          column-count:2;
        }
        footer{
          height:3cm;
          line-height:3cm;
          padding:0 2cm;
          position:running(footer);
          background-color:var(--footer-bg-color);
          font-size:8pt;
          display:flex;
          align-items:baseline;
          justify-content:space-between;
        }
        footer a:first-child{
          font-weight:bold;
        }
    </style>
</head> 
<body>
`;

const generatePNG = async (htmlTemplate:string, PdfContent: HTMLElement) => {
  // Get HTML content from PdfContent element
  const pdfContentHTML = PdfContent?.innerHTML ?? '';
  // Concatenate PDF content HTML with HTML template
  const fullHTML = htmlTemplate + pdfContentHTML + '</body></html>';
  
  // Create a new div element
  const temporaryDiv = document.createElement('div');
  // Set its inner HTML to the combined HTML string
  temporaryDiv.innerHTML = fullHTML;
  // Log the content to check if it's correct
  console.log('Temporary div content:', temporaryDiv.innerHTML);
  
  // Append the temporary div to the body
  document.body.appendChild(temporaryDiv);
  // Calculate the scale factor
  const scaleFactor = Math.min(1, window.innerWidth / temporaryDiv.offsetWidth, window.innerHeight / temporaryDiv.offsetHeight);
  // Apply a CSS transform to the temporary div to scale it down
  temporaryDiv.style.transform = `scale(${scaleFactor})`;
  temporaryDiv.style.transformOrigin = 'top left';
  // Use dom-to-image to take a screenshot of the div
  domtoimage.toBlob(temporaryDiv)
    .then((blob) => {
      console.log('Blob:', blob);
      if (blob) {
        // Create a new URL for the blob and open it in a new window
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        console.error('Error: Blob is empty or malformed.');
      }
      // Remove the temporary div from the body
      document.body.removeChild(temporaryDiv);
    })
    .catch((error) => {
      console.error('Error converting DOM to image:', error);
    });
};


generatePNG(htmlTemplate, PdfContent as HTMLElement);
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
    <Button className="mt-5 w-full" type="submit" onClick={onClick}>
      Generate savings <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}


export default Page;
