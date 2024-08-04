import React from 'react'
import { DiTravis } from "react-icons/di";

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-red-500 text-white py-2'>
           
           <div className="logo ">
           <DiTravis className=' ml-100 text-5xl inline '/>
            <span className="font-bold">askify</span>
           </div>
            <ul className="flex gap-8 mx-9">
                <li className='cursor-pointer hover:font-bold transition-all duration-10'></li>
                <li className='cursor-pointer hover:font-bold transition-all duration-10'></li>
            </ul>
        </nav>
    )
}

export default Navbar
