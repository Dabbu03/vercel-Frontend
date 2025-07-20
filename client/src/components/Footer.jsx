import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

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

      <div className='flex gap-2.5'>
        <a
          href='https://instagram.com/dipinkharayat_03'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={assets.instagram_icon} width={35} alt='Instagram' />
        </a>
      </div>
    </div>
  )
}

export default Footer
