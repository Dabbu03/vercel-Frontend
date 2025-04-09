import React from 'react'
import { assets } from '../assets/assets'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const Header = () => {

    useGSAP(() => {
        // const tl = gsap.timeline();
        const tl = gsap.timeline({ delay: 1.5 });

        tl.from('.head1', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            scale: 2,
            ease: 'bounce',
            stagger: 0.5
        })
            tl.from('.head2', {
                x: 100,
                opacity: 0,
                duration: 1.5,
                scale: 1.2,
                ease: 'bounce.out'
            }, "-=1") 
            tl.from('.txt', {
                x: -100,
                opacity: 0,
                duration: 1.5
            }, "-=1")
           tl.from('.btn', {
                y: 100,
                opacity: 0,
                duration: 1.5,
                scale: 1.1,
                ease: 'expo.inOut'
            }, '-=1')
            tl.from('.img', {
                y: 100,
                opacity: 0,
                duration: 2,
                ease: 'elastic.out(1, 0.3)'
            }, '-=1.2');
    });


    return (
        <div className='flex flex-col justify-center items-center text-center my-20'>

            <div className='head1 text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
                <p >Best text to image generator</p>
                <img src={assets.star_icon} alt="" />

            </div>

            <h1 className='head2 text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn Text to <span className='text-blue-600'>image</span> , in seconds.</h1>

            <p className='head2 text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</p>

            <button className='btn sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'> Generate Images
                <img className='h-6' src={assets.star_group} alt="start_groupImages" />
            </button>

            <div className='img flex flex-wrap justify-center mt-16 gap-3'>
                {Array(6).fill('').map((item, index) => (
                    <img className='rounded hover:scale-1.5 transition-all duration-300 cursor-pointer max-sm:w-10'
                        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                        key={index} width={70} alt="no_images" />
                ))}

            </div>

            <p className='txt mt-2 text-neutral-600'>Generate images from imagify</p>
        </div>
    )
}

export default Header