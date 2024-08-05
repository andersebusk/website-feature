'use client';
import React, { useRef, useState, useEffect } from 'react';
import styles from '@/app/ui/savings.module.css'
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { Button } from '@/app/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [loginData, setLoginData] = useState(null);
  const [savingsData, setSavingsData] = useState(null);
  const [savingsDataE, setSavingsDataE] = useState(null);
  const [savingsDataF, setSavingsDataF] = useState(null);
  const [savingsDataP, setSavingsDataP] = useState(null);
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  const handleDownloadImage = () => {
    router.push('/downloadsite');
    const container = document.getElementById('captureContainer');
    const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '{}');

    if (container) {
        // Use html2canvas to draw the container content onto the canvas
        html2canvas(container, { scale: 3 }).then((canvas) => {
            // Convert canvas to image data URL
            const imageData = canvas.toDataURL('image/png');

            // Create a PDF document using jsPDF
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Calculate the width and height in mm
            const imgProps = pdf.getImageProperties(imageData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Add the image to the PDF
            pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Download the PDF
            pdf.save(`SEA-Mate Value Calculation - ${savedFormData.vessel_name}.pdf`);
        });
    }
  };

  useEffect(() => {
    console.log(contentRef.current);
  }, [contentRef]);

  useEffect(() => {
    try {
      const savedLoginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
      const savedSavingsData = JSON.parse(sessionStorage.getItem('savingsData') || '{}');
      const savedSavingsDataE = JSON.parse(sessionStorage.getItem('savingsDataE') || '{}');
      const savedSavingsDataF = JSON.parse(sessionStorage.getItem('savingsDataF') || '{}');
      const savedSavingsDataP = JSON.parse(sessionStorage.getItem('savingsDataP') || '{}');
      const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '{}');

      if (Object.keys(savedLoginData).length > 0) {
        setLoginData(savedLoginData);
      } else {
        console.warn('No login data found in login session storage');
      }

      if (Object.keys(savedSavingsData).length > 0) {
        setSavingsData(savedSavingsData);
      } else {
        console.warn('No savings data found in oil session storage');
      }

      if (Object.keys(savedSavingsDataE).length > 0) {
        setSavingsDataE(savedSavingsDataE);
      } else {
        console.warn('No savings data found in energy session storage');
      }

      if (Object.keys(savedSavingsDataF).length > 0) {
        setSavingsDataF(savedSavingsDataF);
      } else {
        console.warn('No savings data found in fuel session storage');
      }

      if (Object.keys(savedSavingsDataP).length > 0) {
        setSavingsDataP(savedSavingsDataP);
      } else {
        console.warn('No savings data found in purifier session storage');
      }

      if (Object.keys(savedFormData).length > 0) {
        setFormData(savedFormData);
      } else {
        console.warn('No form data found in session storage');
      }
    } catch (error) {
      console.error('Error parsing form data from session storage', error);
    }
  }, []);

  if (!loginData || !savingsData || !savingsDataE || !savingsDataF || !savingsDataP || !formData) {
    return <div>Please fill out the rest of the fields...</div>;
  }

  const {
    company = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    country = 'N/A'
  } = loginData as any;

  const {
    USD = 'N/A',
    Liters = 'N/A',
    CO2_Tons = 'N/A'
  } = savingsData as any;

  const {
    USD_E = 'N/A',
    Liters_E = 'N/A',
    CO2_Tons_E = 'N/A'
  } = savingsDataE as any;

  const {
    USD_F = 'N/A',
    Liters_F = 'N/A',
    CO2_Tons_F = 'N/A'
  } = savingsDataF as any;

  const {
    USD_P = 'N/A',
    Liters_P = 'N/A',
    CO2_Tons_P = 'N/A'
  } = savingsDataP as any;

  const {
    vessel_name = 'N/A',
    MainEngineType = 'N/A',
  } = formData as any;

  console.log('loginData:', loginData);
  console.log('savingsData:', savingsData);
  console.log('savingsDataE:', savingsDataE);
  console.log('savingsDataF:', savingsDataF);
  console.log('savingsDataP:', savingsDataP);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={styles.container} id="captureContainer" ref={contentRef}>
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.headerSection}>
            <div className={styles.logoAndName}>
              <Image
                src="/MFT-Logo1.png"
                width={200}
                height={760}
                alt='Screenshots of the dashboard project showing desktop version'
              />
              <h1></h1>
            </div>
            <div>
              <h2>Savings overview</h2>
              <p>
                <b>Date Issued:</b> {currentDate}
              </p>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.headerSection}>
            <div className={styles.issuedTo}>
              <h3>Issued to</h3>
              <p>
                {company} <br />
                {email} <br />
                {phone} <br />
                {country}
              </p>
            </div>
            <div className={`${styles.issuedTo} ${styles.contact}`}>
              <h3>Contact</h3>
              <p>
                mftservice@marinefluid.dk <br />
                +45 2476 9512 <br />
                <p><a href="https://marinefluid.dk/">www.marinefluid.dk</a></p> <br />
              </p>
            </div>
          </div>
        </header>
        <footer className={styles.footer}>
          Congratulations! You are taking the first step towards a healthier planet and economy! <br />
          Do not hesitate to contact us for a follow up meeting, to discuss the opportunities in greater details.
        </footer>
        <main className={styles.main}>
          <table>
            <thead>
              <tr>
                <th className={styles.spacing}>Savings for {vessel_name}:</th>
                <th className={styles.spacing}>USD/year</th>
                <th className={styles.spacing}>CO2/year (tCO2e)</th>
                <th className={styles.spacing}>Oil/year (L)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Cylinder oil savings</b></td>
                <td>${(Math.floor(USD)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(CO2_Tons)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(Liters)).toLocaleString('en-US')}</td>
              </tr>
              <tr>
                <td><b>Centrifuge savings</b></td>
                <td>${(Math.floor(USD_P)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(CO2_Tons_P)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(Liters_P)).toLocaleString('en-US')}</td>
              </tr>
              <tr>
                <td><b>Energy savings</b></td>
                <td>${(Math.floor(USD_E)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(CO2_Tons_E)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(Liters_E)).toLocaleString('en-US')}</td>
              </tr>
              <tr>
                <td><b>Fuel savings</b></td>
                <td>${(Math.floor(USD_F)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(CO2_Tons_F)).toLocaleString('en-US')}</td>
                <td>{(Math.floor(Liters_F)).toLocaleString('en-US')}</td>
              </tr>
            </tbody>
          </table>
          <table className={`${styles.centerTable} ${styles.summary}`}>
            <tbody>
              <tr className={styles.total}>
                <th>
                  Total operational saving: <br />
                  EU ETS saving: <br />
                  --------------------------------- <br />
                  Total CO2 reduction: <br />
                  --------------------------------- <br />           
                  Total lube oil saving: <br />
                  Total fuel oil saving:
                </th>
                <td style={{ textDecoration: 'underline' }}>
                  ${(Math.floor(USD + USD_E + USD_F + USD_P)).toLocaleString('en-US')} <br />
                  ${(Math.floor((CO2_Tons_F * 90) / 2)).toLocaleString('en-US')} < br /> <br />
                  {(Math.floor(CO2_Tons + CO2_Tons_E + CO2_Tons_F + CO2_Tons_P)).toLocaleString('en-US')} tCO2e<br /> <br />             
                  {(Math.floor(Liters)).toLocaleString('en-US')} L <br />
                  {(Math.floor(Liters_E + Liters_F + Liters_P)).toLocaleString('en-US')} L
                </td>
              </tr>
            </tbody>
          </table>
          <table className={`${styles.centerTable} ${styles.ROI}`}>
            <tbody>
              <tr className={styles.total}>
                <th>
                  SEA-Mate system ROI: <br />
                  SEA-Mate system ROI turnkey solution: <br />
                </th>
                <td style={{ textDecoration: 'underline' }}>
                  {(Math.floor((50000 / (USD + USD_E + USD_F + USD_P + (CO2_Tons_F * 90) / 2)) * 365))} days<br />
                  {(Math.floor((90000 / (USD + USD_E + USD_F + USD_P + (CO2_Tons_F * 90) / 2)) * 365))} days<br />
                </td>
              </tr>
            </tbody>
          </table>
        </main>
        <div className={styles.headerSection}>
          <div className={styles.logoAndName}>
            <div className={styles.image}>
              <Image
                src="/blend1.png"
                width={180}
                height={500}
                alt='Screenshots of the dashboard project showing desktop version'
              />
            </div>
          </div>
        </div>
        <aside className={styles.aside}>
          <hr className={styles.hr} />
          <b>Elaboration of calculations:</b>
          <p>
            <li>Centrifuge savings assume filters replace the ship&apos;s purifier, potentially saving fuel if the purifier remains unused.</li>
            <li>Energy savings come from replacing the lube oil centrifuge with filters, based on typical vessel parameters.</li>
            <li>Assumptions include system oil flow and purifier motor power consumption (0.1 kg fuel oil = 1 kWh).</li>
            <li>Fuel savings result from a cleaner oil sump, reducing crankshaft friction and possibly lowering operational resistance by up to 0.8%.</li>
            <li>Estimations are based on static tests at a Barbados power plant; details: <a href="https://marinefluid.dk/cases/barbados/">Marine Fluid Technology&apos;s website</a>.</li>
            <li>All savings figures are estimates; Marine Fluid Technology disclaims accuracy. Contact <a href="mailto:contact@marinefluid.dk">contact@marinefluid.dk</a> for more information.</li>
            <li>Fuel oil density estimate: 928 L/MT (mean value of three vessel fuel oils).</li>
          </p>
        </aside>
      </div>
      <DownloadPDF onClick={handleDownloadImage}/>
      <div className="flex h-8 items-end space-x-1">
        {/* Add form errors here */}
      </div>
    </div>
  );
};

interface DownloadImageProps {
  onClick?: () => void;
}

function DownloadPDF({ onClick }: DownloadImageProps) {
  return (
    <Button className="mt-4 w-1/6" type="button" onClick={onClick}>
      Download <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
    </Button>
  );
}

export default App;
