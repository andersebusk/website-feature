'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '@/app/ui/savings.module.css'
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

  useEffect(() => {
    try {
      const savedLoginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
      const savedSavingsData = JSON.parse(sessionStorage.getItem('savingsData') || '{}');

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


  console.log('loginData:', loginData);
  console.log('savingsData:', savingsData);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <header>
        <div className={styles.headerSection}>
          <div className={styles.logoAndName}>
            <svg>
              <circle cx="50%" cy="50%" r="40%" stroke="black" strokeWidth="3" fill="black" />
            </svg>
            <h1>Marine Fluid Technology</h1>
          </div>
          <div>
            <h2>Savings overview</h2>
            <p>
              <b>Date Issued:</b> {currentDate}
            </p>
          </div>
        </div>
        <hr />
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
              <b>Notes</b>
              <br />
              Please contact us if you have any questions regarding the savings overview.
            </p>
          </div>
        </div>
      </header>
      <footer>
        <div className={styles.footer} />
        <a href="https://marinefluid.dk/">https://marinefluid.dk/</a>
        <span>+45 2476 9512</span>
        <span>Strandvejen 60, 2900 Hellerup, Denmark</span>
      </footer>
      <main>
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              
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
              <td></td>
              <td>{USD}</td>
              </tr>
            <tr>
              <td>
                <b>Tonnes of CO2 saved:</b>
                <br />
                Tonnes of CO2
              </td>
              <td></td>
              <td>{CO2_Tons}</td>
            </tr>
            <tr>
              <td>
                <b>Litres of oil saved:</b>
                <br />
                Litres of oil
              </td>
              <td></td>
              <td>{Liters}</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.summary}>
          <tbody></tbody>
          <tr className={styles.total}>
            <th>
              Total USD: <br />
              Total CO2: <br />
              Total Litres:
            </th>
            <td>
              {USD} <br />
              {CO2_Tons} <br />
              {Liters}
            </td>
          </tr>
        </table>
      </main>
      <aside>
        <hr />
        <b>Terms &amp; Conditions</b>
        <p>
          {/* Terms and conditions content here */}
        </p>
      </aside>
    </div>
  );
};

export default App;
