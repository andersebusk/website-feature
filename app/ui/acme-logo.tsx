import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { CalculatorIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CalculatorIcon className="h-12 w-12]" />
      <p className="text-[44px]">Oil calculator</p>
    </div>
  );
}
