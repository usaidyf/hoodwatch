"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react'
import { Menu, SearchIcon, User2Icon, XIcon } from 'lucide-react'
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

export default function Navbar() {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [showMenuDropdown, setShowMenuDropdown] = useState(false);

   return (
      <nav className={`bg-white border-b border-gray-300 w-full px-4 md:px-6 py-0.5 md:py-1.5 sticky top-0 z-40`}>
         <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4 lg:gap-8 relative">

            {/* Logo */}
            <Link href="/" className='bordr'>
               <Image className="w-12 sm:w-14 md:w-16" src='/logo.png' alt="logo" width={1080} height={1080} />
            </Link>

            {/* Nav Links */}
            <ul className="hidden md:flex gap-4 flex-grow">
               <li className="text-gray-600 text-lg hover:text-primary cursor-pointer">
                  <Link href={'/about'}>
                     About
                  </Link>
               </li>
            </ul>

            {/* Right Side Controls */}
            <div className="flex items-center gap-0.5 md:gap-1.5 relative">
               <button className="w-9 h-9 rounded-md cursor-pointer flex items-center justify-center hover:bg-gray-200 transition">
                  <SearchIcon
                     className="w-4.5 sm:w-5 md:w-5.5 text-primary"
                     onClick={() => {
                        setIsSearchOpen(true);
                     }}
                  />
               </button>
               <Link href='/login' className="w-9 h-9 rounded-md cursor-pointer flex items-center justify-center hover:bg-gray-200 transition">
                  <User2Icon
                     className="w-4.5 sm:w-5 md:w-5.5 text-primary"
                     onClick={() => {
                        setIsSearchOpen(true);
                     }}
                  />
               </Link>

               {/* Mobile Menu Icon */}
               <div className="md:hidden ml-1">
                  <Menu
                     className="w-6 text-primary cursor-pointer"
                     onClick={() => setShowMenuDropdown((prev) => !prev)}
                  />
               </div>
            </div>

         </div>
         {/* Mobile popup navbar */}
         <Transition show={showMenuDropdown} as={Fragment}>
            <div
               className={clsx(
                  'fixed inset-0 min-h-screen w-screen bg-white text-primary transition ease-in-out flex flex-col data-close:opacity-0',
                  'data-enter:data-closed:-translate-y-full',
                  'data-leave:data-closed:translate-y-full',
               )}
            >
               <div className="flex items-center justify-between w-full p-4">
                  <div className="flex items-center gap-2">
                     <Image src='/logo.png' alt="logo" className="w-14 sm:w-16" width={160} height={53} />
                  </div>
                  <button
                     className="w-9 h-9 cursor-pointer flex items-center justify-center transition bg-gray-100 rounded-lg"
                     onClick={() => setShowMenuDropdown(false)}
                  >
                     <XIcon className="w-8" />
                  </button>
               </div>
               <div className={clsx(
                  "flex flex-col gap-2 transition w-full py-4 px-8",
                  "tracking-wide",
                  "text-lg font-semibold"
               )}>
                  <Link href={'/about'} onClick={() => { setShowMenuDropdown(false) }} className="uppercase group font-heading bg-gray-100 active:bg-gray-200 transition p-2.5 pb-2 rounded-xl">
                     About
                     <div className='h-1 w-8 group-active:w-full border-t-2 transition-[width] duration-200 mt-1' />
                  </Link>
               </div>
            </div>
         </Transition>
      </nav>
   )
}
