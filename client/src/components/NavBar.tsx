import { HiMenuAlt1 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

interface Props {
  title: string;
  classProps: string;
}

const NavbarItem = ({ title, classProps }: Props) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const NavBar = () => {
  const NavArr = ['Market', 'Swap Token', 'Exchange', 'Wallets'];
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img
          src='../../images/hashtology-logo-2.png'
          alt='logo'
          className=' w-36 cursor-pointer'
        />
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {NavArr.map((item, index) => (
          <NavbarItem key={index + item} title={item} classProps={''} />
        ))}
      </ul>
      <div className='flex relative'>
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt1
            fontSize={28}
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul className='z-10 fixed top-0 right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end text-gray-400'>
            <li className='text-xl w-full my-2'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
              {NavArr.map((item, index) => (
                <NavbarItem key={index + item} title={item} classProps={''} />
              ))}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
