import { lusitana } from '@/app/ui/fonts';

export default function LoginPageLogo() {
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