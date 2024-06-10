'use client';
import { useEffect, useState } from 'react';

const PdfContent = () => {
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

  if (!savingsData) {
    return <div>Loading...</div>;
  }

  const {
    USD = 'N/A',
    CO2_Tons = 'N/A',
    Liters = 'N/A'
  } = savingsData as any;

  const {
    company = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    country = 'N/A'
  } = loginData as any;

  return (
    <div>
      <div id="pdf-content">
        <header>
          <div className="headerSection">
            <div className="logoAndName">
              <svg>
                <circle cx="50%" cy="50%" r="40%" stroke="black" strokeWidth="3" fill="black" />
              </svg>
              <h1>Marine Fluid Technology</h1>
            </div>
            <div>
              <h2>Savings overview</h2>
              <p>
                <b>Date Issued</b> 
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <hr />
          <div className="headerSection">
            <div id="userinfo" className="issuedTo">
              <h3>Issued to</h3>
              <p>
                <span>{company}</span> <br/>
                <span>{email}</span> <br/>
                <span>{phone}</span> <br/>
                <span>{country}</span>
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
                <td>{USD}</td>
                <td>{USD}</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <b>Tonnes of CO2 saved:</b>
                  <br />
                  Tonnes of CO2
                </td>
                <td></td>
                <td>{CO2_Tons}</td>
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
                <td>{Liters}</td>
              </tr>
            </tbody>
          </table>
          <table className="summary">
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr className="total">
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
          <p></p>
        </aside>
      </div>
    </div>
  );
};

export default PdfContent;
