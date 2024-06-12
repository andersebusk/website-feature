'use client';
import { lusitana } from '@/app/ui/fonts';
import {AtSymbolIcon, KeyIcon, ExclamationCircleIcon, HomeIcon, PhoneIcon, MagnifyingGlassPlusIcon} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginForm() {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const companyRef = React.useRef<HTMLInputElement>(null);
  const mailRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const countryRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    if (
      companyRef.current &&
      mailRef.current &&
      phoneRef.current &&
      countryRef.current
    ) {
      const loginData = {
        company: companyRef.current.value,
        email: mailRef.current.value,
        phone: phoneRef.current.value,
        country: countryRef.current.value,
      };

      try {
        await axios.post('http://localhost:5000/api/users/register', loginData);
        console.log('Login form submitted');
      } catch (error) {
        console.error('Error registering user:', error);
      }
      sessionStorage.setItem('loginData', JSON.stringify(loginData));
      console.log('Login data saved:', loginData);
      router.push('/dashboard');
    }
  };

   useEffect(() => {
    const loginDataFromStorage = sessionStorage.getItem('loginData');
    if (loginDataFromStorage && loginDataFromStorage !== '') {
      try {
        const savedLoginData = JSON.parse(loginDataFromStorage);
        console.log('Saved login data:', savedLoginData);
        if (savedLoginData) {
        if (companyRef.current) companyRef.current.value = savedLoginData.company;
          if (mailRef.current) mailRef.current.value = savedLoginData.email;
          if (phoneRef.current) phoneRef.current.value = savedLoginData.phone;
          if (countryRef.current) countryRef.current.value = savedLoginData.country;
        }
      } catch (error) {
        console.error('Error parsing login data:', error);
      }
    }
  }, []);
  return (
    <form className="space-y-3" onSubmit={handleLogin}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please type in the following info to continue.
        </h1>
        <h1 className={`${lusitana.className} mb-3 text-0.5xl`}>
          Required fields are marked with ' * '
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="Company"
            >
              Company
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="Company"
                type="name"
                name="Company"
                required
                placeholder="*Enter the name of your company"
                ref={companyRef}

              />
              <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Company Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                required
                placeholder="*Enter company email"
                ref={mailRef}
            
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="phone"
            >
              Phone
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="phone"
                type="tel"
                name="phone"
                required
                placeholder="*Enter your countrycode + phone number"
                ref={phoneRef}

              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="Country"
            >
              Country
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="Country"
                type="name"
                name="Country"
                required
                placeholder="*Enter the name of your country"
                ref={countryRef}

              />
              <MagnifyingGlassPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="flex items-center">
        <label htmlFor="terms" className=" ">
        <input type="checkbox" id="terms" name="terms" required onChange={(e) => setIsChecked(e.target.checked)} />
        {" "}*I accept the{" "}
          <a 
            href="#" 
            className="text-customColor cursor-pointer"  
            onClick={(e) => { e.preventDefault(); setModalIsOpen(true); }}
              >
                terms and conditions
              </a>
              
            </label>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
      style={{
        content: {
          top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
          width: '30%', // adjust this value to change the width
          height: '30%', // adjust this value to change the height
        },
      }}>
        {<p>
          Effective Date: [17/05/2024] <br /><br />

          Welcome to MFT's oils Calculator. <br />
          By accessing or using our services, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.

          1. Acceptance of Terms <br /><br />
          By accessing our services, you accept and agree to be bound by these Terms and Conditions. If you do not agree with these terms, you are prohibited from using or accessing this site.<br /><br />

          2. Information Collection and Usage<br />
          2.1 Login Information<br /><br />
          We collect and store certain login information when you access our services. This includes:<br /><br />

          Company Email<br />
          Company Name <br />
          Phone Number <br />
          Country <br /><br />
          This information is used to provide our services to you and to contact you as necessary. We do not share this information with any third parties.<br /><br />

          2.2 Confidentiality of Post-Login Information <br /><br />
          Any information provided by you after login, including but not limited to personal data, project details, and any other content, is treated as strictly confidential. We commit to not storing, saving, or sharing this information with any third parties. This data will only be used as necessary to provide our services and will be protected under our privacy policy. <br /><br />

          3. Data Security<br /><br />
          We implement a variety of security measures to maintain the safety of your personal information. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.<br /><br />

          4. Use of Services<br /><br />
          You agree to use our services only for lawful purposes and in accordance with these Terms and Conditions. You agree not to:<br /><br />

          Engage in any activity that could harm or interfere with our services.<br /><br />
          Attempt to gain unauthorized access to any part of our services or to other systems or networks connected to our services.<br /><br />
          5. Modifications to Terms<br /><br />
          We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the new Terms and Conditions on our website. Your continued use of our services after such modifications constitutes your acknowledgment and acceptance of the new terms.<br /><br />

          6. Termination<br /><br />
          We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users of our services, us, or third parties, or for any other reason.<br /><br />

          7. Governing Law<br /><br />
          These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.<br /><br />

          8. Contact Information<br /><br />
          For any questions or concerns about these Terms and Conditions, please contact us at:<br /><br />

          Email: mftservice@marinefluid.dk
          Address: Strandvejen 60, 5th (Regus), <br />
          2900 Hellerup, Denmark
          By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p> }
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>

        <LoginButton/>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}

interface Submission {
  onClick?: () => void;
}

function LoginButton({ onClick }: Submission) {

  return (
      <Button className="mt-4 w-full" type="submit" onClick={onClick}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
  );
}

