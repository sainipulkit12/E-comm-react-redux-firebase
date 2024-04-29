import React, { useContext, useState } from 'react'
import myContext from '../../context/data/myContext'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

function Navbar() {
  const [open, setOpen] = useState(false)
  const context = useContext(myContext);
  const cartItems=useSelector((state)=>state.cart)
  const { toggleMode, mode } = context;

  const user = JSON.parse(localStorage.getItem('user'));



  const logout = () =>{
    localStorage.clear('user')
    window.location.href="/login ";
  }
  return (
    <div className="bg-white sticky top-0 z-50  ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  {user ?  <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div> : ""}

                 {user?.user?.email==='sainipulkit12@gmail.com' ?  <div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      admin
                    </Link>
                  </div> : ""}

                 {user ?  <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div> : <div className="flow-root">
                    <Link to={'/signup'}  className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Signup
                    </Link>
                  </div> 
                  
                  }
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                        alt="Pulkit Saini" />                                        </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* desktop  */}
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-red-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹300
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>K K STORE</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                 {user?  <Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Order
                  </Link> : ""}
                  {user?.user?.email === 'sainipulkit12@gmail.com' ? <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Admin
                  </Link> : ""}
                 
                  {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div> : <div className="flow-root">
                    <Link to={'/signup'}  className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Signup
                    </Link>
                  </div>}

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="data:image/jpeg;base64,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"
                      alt="Pulkit Saini" />
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        </nav>
      </header></div>
  )
}

export default Navbar