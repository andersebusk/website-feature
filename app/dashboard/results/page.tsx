'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import domtoimage from 'dom-to-image';




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
<header>
    <div class="headerSection">
      <div class="logoAndName">
        <svg>
          <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" fill="black" />
        </svg>
        <h1>Marine Fluid Technology</h1>
      </div>
      <div>
        <h2>Savings overview</h2>
        <p>
          <b>Date Issued</b> 
          <script>
            document.write(new Date().toLocaleDateString());
          </script>
        </p>
      </div>
    </div>
    <hr />
    <div class="headerSection">
      <div id= userinfo class="issuedTo">
        <h3>Issued to</h3>
        <p>
          <span id="companyOutput"></span> <br/>
          <span id="mailOutput"></span> <br/>
          <span id="phoneOutput"></span> <br/>
          <span id="countryOutput"></span>
        </p>
      </div>
      <div>
        <p>
          <b>Notes</b>
          <br />
          Please contact us, if you have any questions regarding the savings overview.
        </p>
      </div>
    </div>
  </header>
  
  <footer>
      <a href="https://marinefluid.dk/">https://marinefluid.dk/</a>
      <span>+45 2476 9512</span>
      <span>Strandvejen 60, 2900 Hellerup, Denmark</span>
  </footer>
  
  <main>
    <table>
      <thead>
        <tr>
          <th>Item Description</th>
          <th>Rate</th>
          <th></th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>Savings in USD due to installing the BOB</b>
            <br />
            Total in USD 
          </td>
          <td>
            <span id="usdOutput"></span>
          </td>
          <td>
            <span id="usdOutput"></span>
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              <b>Tonnes of CO2 saved:</b>
              <br />
              Tonnes of CO2
            </td>
            <td>
              
            </td>
            <td>
              <span id="co2OutPut"></span>
            </td>
            <td>
              <span id="co2OutPut"></span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Litres of oil saved:</b>
              <br />
              Litres of oil
            </td>
            <td>
              
            </td>
            <td>
              <span id="litersOutput"></span>
            </td>
            <td>
              <span id="litersOutput"></span>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="summary">
        <tr>
          <th>
            
          </th>
          <td>
            
          </td>
        </tr>
        <tr>
          <th>
           
          </th>
          <td>
           
          </td>
        </tr>
        <tr class="total">
          <th>
            Total USD: <br />
            Total CO2: <br />
            Total Litres:
          </th>
          <td>
            <span id="totalUsdOutput"></span> <br />
            <span id="totalCo2Output"></span> <br />
            <span id="totalLitersOutput"></span>
          </td>
        </tr>
      </table>
    </main>
    <aside>
      <hr />
      <b>Terms &amp; Conditions</b>
      <p>
        
      </p>
    </aside>
  </body>
  </html>  
    `;

    const generatePNG = async (htmlTemplate: any) => {
      // Create a new div element
      const temporaryDiv = document.createElement('div');
      // Set its inner HTML to the provided string
      temporaryDiv.innerHTML = htmlTemplate;
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
          // Create a new URL for the blob and open it in a new window
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          // Remove the temporary div from the body
          document.body.removeChild(temporaryDiv);
        })
        .catch((error) => {
          console.error('Error converting DOM to image:', error);
        });
    };
    
    generatePNG(htmlTemplate);
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
