import Image from "next/image";
import Navbar from "./components/navbar";
export default function Home() {
  return (
    <>
      <div className="flex flex-row items-end justify-baseline pl-4 mt-4">
          <h1 className='h1 -mb-12.5'>HELLO.</h1>
      </div>
      <div className="mt-30 flex flex-row">
        <Image
          src='/assets/me.jpeg'
          alt='Description of image'
          width={600}
          height={600}
          className='shadow-lg'
        />
        <div className="flex flex-col items-center h-full w-full">
          <h1 className="text-gray-800 text-[100px] leading-none p-0">WHO AM I?</h1>
          <p>I just told you...</p>
        </div>
      </div>
      <div className='flex flex-col justify-center m-10 items-center'>
        <h1 className="text-gray-800 text-[100px]">This is where I grew up...</h1>
      </div> 
      <img className='relative w-full h-full object-cover'
        src='/assets/madison_2.jpg'
        alt='Capitol building of Madison, WI'
      /> 
      </>
  );
}
