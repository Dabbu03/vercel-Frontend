import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (

        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

            className='flex flex-col justify-center items-center text-center my-20'>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}

                className='head1 text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>

                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt="" />

            </motion.div>

            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 2 }}

                className='head2 text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>
                Text to <span className='text-purple-400'>Image</span> , in seconds.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}

                className='head2 text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</motion.p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}

                onClick={onClickHandler}

                className='btn sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'> Generate Images
                <img className='h-6' src={assets.star_group} alt="start_groupImages" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}

                className='img flex flex-wrap justify-center mt-16 gap-3'>
                {Array(6).fill('').map((item, index) => (
                    <motion.img
                        whileHover={{ scale: 1.2, duration: 0.3 }}

                        className='rounded hover:scale-1.5 transition-all duration-300 cursor-pointer max-sm:w-10'
                        src={index % 2 === 0 ? assets.home1 : assets.sample_img_2}
                        key={index} width={70} alt="no_images" />
                ))}
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}

                className='txt mt-2 text-neutral-600'>Generate images from
                <span className='text-purple-500 text-xl relative'> Pixora
                    
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-400 rotate-[-4deg] rounded-full origin-left"></span>
                </span>
            </motion.p>

        </motion.div>
    )
}

export default Header