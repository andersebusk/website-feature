'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '@/app/ui/savings.module.css'
import Image from 'next/image';
<div className={styles.headerSection} />;
<div className={styles.issuedTo} />;
<div className={styles.summary} />;
<div className={styles.shape} />;
<div className={styles.logoAndName} />;
<div className={styles.footer} />;
<div className={styles.tbody} />;


const App: React.FC = () => {
  const [loginData, setLoginData] = useState(null);
  const [savingsData, setSavingsData] = useState(null);
  const [savingsDataE, setSavingsDataE] = useState(null);
  const [savingsDataF, setSavingsDataF] = useState(null);
  const [savingsDataP, setSavingsDataP] = useState(null);


  useEffect(() => {
    try {
      const savedLoginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
      const savedSavingsData = JSON.parse(sessionStorage.getItem('savingsData') || '{}');
      const savedSavingsDataE = JSON.parse(sessionStorage.getItem('savingsDataE') || '{}');
      const savedSavingsDataF = JSON.parse(sessionStorage.getItem('savingsDataF') || '{}');
      const savedSavingsDataP = JSON.parse(sessionStorage.getItem('savingsDataP') || '{}');


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

      

    } catch (error) {
      console.error('Error parsing form data from session storage', error);
    }
  }, []);

  if (!loginData) {
    return <div>Loading...</div>;
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


  console.log('loginData:', loginData);
  console.log('savingsData:', savingsData);
  console.log('savingsDataE:', savingsDataE);
  console.log('savingsDataF:', savingsDataF);
  console.log('savingsDataP:', savingsDataP);


  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={styles.container}>
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerSection}>
          <div className={styles.logoAndName}>
          <Image
            src="/MFT-Logo1.png"
            width={200
            }
            height={760}
            className='hidden md:block'
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
          <div>
            <p>
              <b>Contact</b>
              <br />
              Please contact us if you have any questions regarding the savings overview.
            </p>
          </div>
        </div>
      </header>
      <footer className={styles.footer}>
        <a className={styles.a} href="https://marinefluid.dk/">https://marinefluid.dk/</a>
        <span>+45 2476 9512</span>
        <span>Strandvejen 60, 2900 Hellerup, Denmark</span>
      </footer>
      <main className={styles.main}>
        <table>
          <thead>
            <tr>
              <th className={styles.spacing}>Savings Description:</th>
              <th className={styles.spacing}>USD rate</th>
              <th className={styles.spacing}>CO2 rate (T)</th>
              <th className={styles.spacing}>Oil rate (L)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Cylinder oil savings</b></td>
              <td>{Math.floor(USD)}.00</td>
              <td>{Math.floor(CO2_Tons)}.00</td>
              <td>{Math.floor(Liters)}.00</td>
            </tr>
            <tr>
              <td><b>Purifier savings</b></td>
              <td>{Math.floor(USD_P)}.00</td>
              <td>{Math.floor(CO2_Tons_P)}.00</td>
              <td>{Math.floor(Liters_P)}.00</td>
            </tr>
            <tr>
              <td><b>Energy savings</b></td>
              <td>{Math.floor(USD_E)}.00</td>
              <td>{Math.floor(CO2_Tons_E)}.00</td>
              <td>{Math.floor(Liters_E)}.00</td>
            </tr>
            <tr>
              <td><b>Fuel savings</b></td>
              <td>{Math.floor(USD_F)}.00</td>
              <td>{Math.floor(CO2_Tons_F)}.00</td>
              <td>{Math.floor(Liters_F)}.00</td>
            </tr>
          </tbody>
        </table>
        <table className={`${styles.centerTable} ${styles.summary}`}>
          <tbody>
            <tr className={styles.total}>
              <th>
                Total USD: <br />
                Total CO2 (Tonnes): <br />
                Total Oil (Litres):
              </th>
              <td>
              ${Math.floor(USD + USD_E + USD_F + USD_P)}.00 <br />
              {Math.floor(CO2_Tons + CO2_Tons_E + CO2_Tons_F + CO2_Tons_P)}.00 <br />
              {Math.floor(Liters + Liters_E + Liters_F + Liters_P)}.00
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <aside className={styles.aside}>
        <hr className={styles.hr} />
        <b>Terms & Conditions</b>
        <p>
        1. Acceptance of Terms
          By accessing our services, you accept and agree to be bound by these Terms and Conditions. If you do not agree with these terms, you are prohibited from using or accessing this site.

          2. Information Collection and Usage
          2.1 Login Information
          We collect and store certain login information when you access our services. This includes:

          Company Email
          Company Name 
          Phone Number 
          Country 
          This information is used to provide our services to you and to contact you as necessary. We do not share this information with any third parties.

          2.2 Confidentiality of Post-Login Information 
          Any information provided by you after login, including but not limited to personal data, project details, and any other content, is treated as strictly confidential. We commit to not storing, saving, or sharing this information with any third parties. This data will only be used as necessary to provide our services and will be protected under our privacy policy.
          3. Limitation of Liability
          In no event shall Marine Fluid Technology ApS, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Marine Fluid Technology ApS, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
          4. Uncertanties
          Remember this is only an estimate, and might not be 100% accurate.
        </p>
      </aside>
    </div>
    </div>
  );
};

export default App;
