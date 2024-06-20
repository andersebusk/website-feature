import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import styles from '@/app/ui/savings.module.css'

export default function DashboardPageLogo() {
  return (
    <>
      <div className={styles.dashboard}>
        <Image
          src="/MFT-Logo1.png"
          width={150}
          height={760}
          alt='Screenshots of the dashboard project showing desktop version'
        />
        <h1></h1>
        < br />
      </div>
      <div
        className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      >
        <p className="text-[30px]">SEA-Mate <br />
          Blending-on-Board <br />
          Value Calculator </p>
      </div>
    </>
  );
}