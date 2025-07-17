
import Image from "next/image";
import Navbar from "./components/navbar";
export default function Home() {
  return (
    <main>
      <div className="flex flex-row justify-around items-center p-4">
        <div className="flex flex-col">
          <h1 className='text-8xl font-[family-name:var(--font-geist-mono)]'>This is a test</h1>
          <p className='text-lg font-[family-name:var(--font-geist-mono)]'>This is a showcase of my tests.</p>
        </div>
      </div>
      <div className='flex justify-center m-10'>
        <Image
          src='/assets/madison_2.jpg'
          alt='Description of image'
          width={1300}
          height={1300}
        />
      </div>  
    </main>
  );
}
