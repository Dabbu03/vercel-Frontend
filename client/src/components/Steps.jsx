import React from 'react'
import { stepsData } from '../assets/assets'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'


const Steps = () => {

    useGSAP(() => {
        const tl = gsap.timeline()

        tl.from('.h1', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            scale: 3,
            ease: 'bounce',
        })
        tl.from('.p1', {
            x: -200,
            rotate: 180,
            opacity: 0,
            ease: 'power1'
        })
        tl.from('.step', {
            x: 500,
            opacity: 0,
            duration: 1.5,
        })
    })

    return (
        <div className='flex flex-col items-center justify-center my-32'>

            <h1 className='h1 text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>

            <p className='p1 text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>

            <div className='step space-y-4 w-full sm:max-w-3xl text-sm'>
                {stepsData.map((item, index) => (
                    <div key={index}
                        className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'
                    >
                        <img src={item.icon}
                            width={40}
                            alt="" />
                        <div className=''>
                            <h2 className='text-xl font-medium'>{item.title}</h2>
                            <p className='text-gray-500'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Steps