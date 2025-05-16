import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets.js'
import { Link, NavLink} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate} = useContext(ShopContext);

    const searchHandler = () => {
        navigate('/collection');
        setShowSearch(true);
    }


  return (
    <div className='flex items-center justify-between py-4 font-medium'>

        <Link to='/'><img src={assets.logo} alt="" srcset="" className='w-50'/></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

            <NavLink to='/' className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/collection' className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/about' className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/contact' className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>

        </ul>

        <div className='flex items-center gap-6'>

            <img onClick={searchHandler} src={assets.search_icon} alt="" srcset="" className='w-5 cursor-pointer'/>

            <div className='group relative'>
                <Link to={'/login'}><img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" srcset="" /></Link>

                <div className='group-hover:block hidden dropdown-menu absolute right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
                        <p className='cursor-pointer hover:text-black'>My profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>

            <Link to='/cart' className='relative'>
                <img className='w-5 min-w-5' src={assets.cart_icon} alt="" srcset="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-amber-900 text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={() => setVisible(true)} className='w-5 sm:hidden curson-pointer' src={assets.menu_icon} alt="" srcset="" />
        </div>

        {/** sidebar for smaller screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=> setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" srcset="" />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border border-amber-950' to='/'>HOME</NavLink>
                <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border border-amber-950' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border border-amber-950' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border border-amber-950' to='/contact'>CONTACT</NavLink>
            </div>

        </div>
        
    </div>
  )
}

export default Navbar