import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  title: string;
  classProps: string;
}

const NavbarItem = ({ title, classProps }: Props) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const NavBar = () => {
  const NavArr = ['Market', 'Swap Token', 'Exchange', 'Wallets'];
  return (
    <nav className='w-full flex md:justify-center justify-between p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img
          src='../../images/hashtology-logo-2.png'
          alt='logo'
          className=' w-36 cursor-pointer'
        />
      </div>
      <ul className='text-white md:flex hiddent list-none flex-row justify-between items-center flex-initial'>
        {NavArr.map((item, index) => (
          <NavbarItem key={index + item} title={item} classProps={''} />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
