import Image from "next/image";
import Navbar from "./components/navbar";
export default function Home() {
  return (
    <main>
      <div className="flex flex-row items-end justify-baseline pl-4">
          <h1 className='text-[250px] font-[family-name:var(--font-bebas-neue)] -mb-12.5 p-0 leading-none'>THIS IS A TEST.</h1>
          <div className="bg-black inline-block ml-10">
            <h2
              className="text-white text-[120px] font-[family-name:var(--font-bebas-neue)] px-4 py-0 leading-none"
            >
              Or is it?
            </h2>
          </div>
      </div>
      <div className='flex justify-center m-10'>
        <div className="border border-black p-10">
        <Image
          src='/assets/madison_2.jpg'
          alt='Description of image'
          width={1300}
          height={1300}
          className='shadow-lg'
        />
        </div>
      </div>  
    </main>
  );
}
