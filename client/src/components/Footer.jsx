import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <Link to='/'>
        <h1 className='text-2xl font-extralight sm:text-3xl md:text-4xl lg:text-5xl cursor-pointer hover:scale-105 transition-transform duration-300 '>
          Pixora
        </h1>
      </Link>

      <p className='flex-1 border-l border-gray-500 pl-4 text-sm text-gray-500 max-sm:hidden'>
        © DipinKharayat.dev | All rights reserved.
      </p>

      <div className='flex gap-3 text-2xl text-gray-600'>
        <a
          href='https://github.com/Dipin003'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-black transition-colors duration-300'
        >
          <FaGithub />
        </a>
        <a
          href='https://instagram.com/dipinkharayat_03'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-pink-600 transition-colors duration-300'
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default Footer;
