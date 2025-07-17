import Image from "next/image";
import Navbar from "./components/navbar";
export default function Home() {
  return (
    <main>
      <div className="flex flex-row items-end justify-baseline pl-4 mt-4">
          <h1 className='text-[250px] -mb-12.5 p-0 leading-none'>HELLO.</h1>
          <div className="bg-black inline-block ml-10">
            <h2
              className="text-white text-[120px] px-4 py-0 leading-none"
            >
              i'm michael.
            </h2>
          </div>
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
          <h1 className="text-[100px] leading-none p-0">WHO AM I?</h1>
          <p>I just told you...</p>
        </div>
      </div>
      <div className='flex flex-col justify-center m-10 items-center'>
        <h1 className="text-[100px]">This is where I grew up...</h1>
        <div className="border border-black p-10">
          <Image
            src='/assets/madison_2.jpg'
            alt='Capitol building of Madison, WI'
            width={1300}
            height={1300}
            className='shadow-lg'
          />
        </div>
      </div>  
    </main>
  );
}
