'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import useOilSavingsCalculation from '../NewCalculator';
import useEnergySavingsCalculation from '../calculators/energycalc';
import useFuelSavingsCalculation from '../calculators/fuelcalcl';
import usePurifierSavingsCalculation from '../calculators/purifercalc';
import { BackButton } from '@/app/ui/backbutton';
import styles from '@/app/ui/dashboard/results.module.css'
import Modal from 'react-modal';



const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [formDataAdd, setFormDataAdd] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const { olie_besparelser, savings } = useOilSavingsCalculation();
  const { energy_besparelser, savingsE } = useEnergySavingsCalculation();
  const { fuel_besparelser, savingsF } = useFuelSavingsCalculation();
  const { purifier_besparelser, savingsP } = usePurifierSavingsCalculation();
  const previousSavingsRef = useRef(savings);
  const previousSavingsE = useRef(savingsE);
  const previousSavingsF = useRef(savingsF);
  const previousSavingsP = useRef(savingsP);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  

  useEffect(() => {
    try {
      const savedFormData = JSON.parse(sessionStorage.getItem('formData') || '{}');
      const savedFormDataAdd = JSON.parse(sessionStorage.getItem('formDataAdd') || '{}');
      const savedLoginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');

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
      
        olie_besparelser(
            savedFormData.BN_value,
            savedFormData.oil_load,
            savedFormData.ME_oil_price,
            savedFormData.ME_power,
            savedFormData.annual_days_sailing,
            savedFormData.feedrate,
            savedFormData.commercial_oil_price,
            savedFormData.highBN,
            savedFormData.highBNPrice
        );

        energy_besparelser(
            savedFormData.annual_days_sailing, 
            savedFormDataAdd.fuel_price,
            savedFormData.systemOilFlow
        );

        fuel_besparelser(
            savedFormData.oil_load,
            savedFormData.ME_power,
            savedFormData.annual_days_sailing,
            savedFormDataAdd.fuel_price,
            savedFormDataAdd.SFOC_value
        );

        purifier_besparelser(
            savedFormDataAdd.discharge_interval,
            savedFormDataAdd.discharged_oil,
            savedFormData.ME_oil_price,
            savedFormDataAdd.maintenance_cost
        );

      

    } catch (error) {
      console.error('Error parsing form data from session storage', error);
    }
  }, []);

  if (!formData || !formDataAdd || !loginData) {
    return <div>Please fill out the rest of the fields...</div>;
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
    feedrate = 'N/A',
    highBN = 'N/A',
    highBNPrice = 'N/A',
    MainEngineType = 'N/A',
    onboard_bn = 'N/A'



  } = formData;

  const {
    fuel_price = 'N/A',
    SFOC_value = 'N/A',
    maintenance_cost = 'N/A',
    discharged_oil = 'N/A',
    discharge_interval = 'N/A',
    fuel_oil_consumption = 'N/A',

  } = formDataAdd as any;

  const {
    company = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    country = 'N/A'
  } = loginData as any;


  const handleDownloadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (JSON.stringify(previousSavingsRef.current) !== JSON.stringify(savings)) {
      sessionStorage.setItem('savingsData', JSON.stringify(savings));
      console.log('Savings data saved to sessionStorage:', savings);
      previousSavingsRef.current = savings;
    }
    console.log('savedSavingsData:', savings);
    if (JSON.stringify(previousSavingsE.current) !== JSON.stringify(savingsE)) {
      sessionStorage.setItem('savingsDataE', JSON.stringify(savingsE));
      console.log('SavingsE data saved to sessionStorage:', savingsE);
      previousSavingsE.current = savingsE;
    }
    console.log('savedSavingsData:', savingsE);
    if (JSON.stringify(previousSavingsF.current) !== JSON.stringify(savingsF)) {
      sessionStorage.setItem('savingsDataF', JSON.stringify(savingsF));
      console.log('SavingsF data saved to sessionStorage:', savingsF);
      previousSavingsF.current = savingsF;
    }
    console.log('savedSavingsData:', savingsF);
    if (JSON.stringify(previousSavingsP.current) !== JSON.stringify(savingsP)) {
      sessionStorage.setItem('savingsDataP', JSON.stringify(savingsP));
      console.log('SavingsP data saved to sessionStorage:', savingsP);
      previousSavingsP.current = savingsP;
    }
    console.log('savedSavingsData:', savingsP);
    router.push('/downloadsite');
  };

  const handleBackAdditional = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard/additional');
  };

  const handleBackDashboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard');
  };


  return (
    <form className="space-y-3" onSubmit={handleDownloadImage} >
      <div className="flex-1 w-2/3 rounded-lg bg-gray-50 px-4 py-3">
        <div>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            <strong>Results</strong> <br /> <br />
            <strong>Thats it!</strong> <br />
            We have all the information we need. <br />
            Please check if the information is correct and click the button below to generate your savings overview.
          </h1>
          <div className={styles.infocontainer}>
            <table>
              <tbody>
                <tr>
                  <td><strong>Your information:</strong></td>
                </tr>
                <tr>
                  <td>Company:</td>
                  <td>{company}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{phone}</td>
                </tr>
                <tr>
                  <td>Country:</td>
                  <td>{country}</td>
                </tr>
                <tr>
                  <td colSpan={2}><br /></td>
                </tr>
                <tr>
                  <td ><strong>Vessel information:</strong></td>
                </tr>
                <tr>
                  <td>Vessel name:</td>
                  <td>{vessel_name}</td>
                </tr>
                <tr>
                  <td>Scrubber fitted:</td>
                  <td>{scrubber ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td>Fuel oil sulfur (S%):</td>
                  <td>{fuel_oil_sulfur}</td>
                </tr>
                <tr>
                  <td>Main engine type:</td>
                  <td>{MainEngineType}</td>
                </tr>
                <tr>
                  <td>Main engine power output (kW):</td>
                  <td>{parseInt(ME_power)}</td>
                </tr>
                <tr>
                  <td>Average main engine Load (%):</td>
                  <td>{parseFloat(oil_load)}</td>
                </tr>
                <tr>
                  <td>Annual days sailing:</td>
                  <td>{parseInt(annual_days_sailing)}</td>
                </tr>
                <tr>
                  <td>Cylinder oil feed rate (g/kWh):</td>
                  <td>{parseFloat(feedrate)}</td>
                </tr>
                <tr>
                  <td>Onboard cylinder oil BN:</td>
                  <td>{parseInt(onboard_bn)}</td>
                </tr>
                <tr>
                  <td>Cost of primary cylinder oil (USD/L):</td>
                  <td>{parseFloat(commercial_oil_price)}</td>
                </tr>
                <tr>
                  <td>Cost of main engine system oil (USD/L):</td>
                  <td>{parseFloat(ME_oil_price)}</td>
                </tr>
                <tr>
                  <td>Requested cylinder oil BN from BOB System:</td>
                  <td>{parseInt(BN_value)}</td>
                </tr>
                <tr>
                  <td>High BN oil for blending:</td>
                  <td>{parseInt(highBN)}</td>
                </tr>
                <tr>
                  <td>Cost of high BN oil (USD/L):</td>
                  <td>{parseFloat(highBNPrice)}</td>
                </tr>
                <tr>
                  <td colSpan={2}><br /></td>
                </tr>
                <tr>
                  <td><strong>Fuel information:</strong></td>
                </tr>
                <tr>
                  <td>Fuel oil consumption per day (MT/day):</td>
                  <td>{parseFloat(fuel_oil_consumption)}</td>
                </tr>
                <tr>
                  <td>Specific fuel oil consumption (g/kWh):</td>
                  <td>{parseFloat(SFOC_value)}</td>
                </tr>
                <tr>
                  <td>Cost of fuel oil (USD/MT):</td>
                  <td>{parseFloat(fuel_price)}</td>
                </tr>
                <tr>
                  <td colSpan={2}><br /></td>
                </tr>
                <tr>
                  <td><strong>Main engine lube oil centrifuge:</strong></td>
                </tr>
                <tr>
                  <td>Amount of system oil discharged at every de-sludging (L):</td>
                  <td>{parseFloat(discharged_oil)}</td>
                </tr>
                <tr>
                  <td>Discharge interval from separator (h):</td>
                  <td>{parseInt(discharge_interval)}</td>
                </tr>
                <tr>
                  <td>Approximate cost of purifier maintenance annually (USD):</td>
                  <td>{parseFloat(maintenance_cost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
      <div className="flex items-center mb-3 mt-6">
        <label htmlFor="NB" className="mb-3 mt-3 block text-sm font-medium text-gray-900">
          NB
        </label>
        <div className="relative ml-2">
          <InformationCircleIcon
            className="h-5 w-5 text-gray-500 cursor-pointer"
            aria-hidden="true"
            onClick={openModal}
          />
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '50%', // Juster denne værdi for at ændre bredden
              padding: '20px', // Tilføjet padding for bedre udseende
            },
          }}
          >
            <h2>Information about calculations:</h2>
            <p>
            Fuel savings are partially derived from achieving a cleaner oil sump, thereby reducing friction on the crankshaft. It is estimated that this improvement could lead to up to a 0.8% reduction in resistance during operation. <br /> <br />

            These estimations are based on a series of static tests conducted at a power plant in Barbados, further details of which can be found on our website at <a href="https://marinefluid.dk/cases/barbados/">https://marinefluid.dk/cases/barbados/</a>. <br /> <br />

            All savings figures are estimates, and Marine Fluid Technology disclaims any responsibility for their factual accuracy. These numbers are intended to estimate potential savings. For further inquiries or details, please do not hesitate to <a href="mailto:mftservice@marinefluid.dkk">contact us</a>, and we will be glad to assist with any information required. <br /> <br />
            </p>
            <button onClick={closeModal}>Close</button>
          </Modal>
          </div>
            </div>
          </div>
          </div>
          <div>
          <GenerateSavings />
          <BackButton className="mt-4 w-1/6" type="submit" onClick={handleBackAdditional}>
        Go to Additional <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
        </BackButton> 
        <BackButton className="mt-4 w-1/6" type="submit" onClick={handleBackDashboard}>
        Go to General <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-50" />
        </BackButton>
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
    <Button className="mt-4 w-1/6" type="submit" onClick={onClick}>
      Generate savings <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}


export default Page;
