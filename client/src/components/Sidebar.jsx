import {React, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import {logo,sun} from '../assets';
import {navlinks} from '../constants';

 const Icon = ({styles, name, isActive, imgUrl, disabled, handleClick}) => (
  // {` `} -> It is called a template string for multiline string
  // ${ } -> Dynamic string
  <div className={`w-[48px] h-[48px] rounded-[10px]  
    ${isActive && isActive === name && 'bg-[#2c2f32]'} 
    flex justify-center items-center 
    ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick} > 
        {!isActive ? (
          <img src={imgUrl} alt='fund_logo' className='w-1/2 h-12' />
        ):
        (
          <img src={imgUrl} alt='fund_logo' className={`w-1/2 h-12' ${isActive !== name && 'grayscale'}`} />
        )}
  </div>
 )  
const Sidebar = () => {
  const navigate = useNavigate(); //used to navigate bw pages
  const [isActive, setIsActive] = useState('dashboard'); //It will set dashboard as the active state


  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to='/'>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center
      bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        {/* inside this div we are doing to add another div which maps all the links*/ }
        <div className="flex flex-col justify-center items-center
        gap-3">
          {/* Adding Dynamic block of code to link all the pages */}
          {navlinks.map((link) => (
              /*Rendering icon element*/
              <Icon
                key={link.name}
                 /*Spread all the properties of a link*/
                {...link} 
                isActive={isActive}
                handleClick={() => {
                  /*Setting a call back function*/
                  if(!link.disabled) {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }}
              />
          ))}
          </div>
          <Icon styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={sun} />
      </div>
    </div>
  )
}

export default Sidebar