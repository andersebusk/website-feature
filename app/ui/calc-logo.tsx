import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { CalculatorIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/app/ui/fonts';

export default function FrontPageLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      
      <p className="text-[35px]">SEA-Mate <br />
       Blending-on-Board <br />
       Value Calculator </p>
    </div>
  );
}
