import Image from "next/image";
import Navbar from "./components/navbar";
export default function Home() {
  return (
    <div className="">
      <div className="flex flex-row items-stretch justify-between mt-4">
          <h1 className='h1 -mb-12.5 ml-4'>HELLO.</h1>
          <h1 className='h1 -mb-12.5'>I AM.</h1>
      </div>
      <div className="mt-10 flex items-center justify-center relative">
        <img className='w-400'
        src='/assets/bg.jpg'
        alt='Capitol building of Madison, WI'
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-8xl font-bold drop-shadow-lg">MICHAEL FISKEY</h1>   
        </div>
      </div>
      <div>
        <h1 className="h1 ml-4">THIS IS MY PORTFOLIO.</h1>
      </div>

      
      </div>
  );
}
