'use client';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SideNav() {

  const router = useRouter();

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('Signing out');
    sessionStorage.clear(); // clear session storage
    console.log('Session storage cleared');
    router.push('/login');
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <form
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-customColor p-4 md:h-40"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </form>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
           onClick={handleSignOut}>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
