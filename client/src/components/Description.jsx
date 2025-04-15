import React from 'react'
import { assets } from '../assets/assets'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Description = () => {

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.h1', {
      x: -300,
      rotate: 260,
      duration: 1.2,
      ease: 'power1.inOut'
    })
    tl.from('.p1', {
      y: -500,
      opacity: 0,
      rotate: 720,
      duration: 0.6,
    })
    tl.from('.img1', {
      y: 300,
      scale: 0.5,
      duration: 1.5,
      opacity: 0,
    })

    tl.from('.d1', {
      y: 200,
      opacity: 0,
      duration: 1.5,
      ease: 'power1.inOut',
    })
  })

  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='h1 text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='p1 text-gray-500 mb-8 '>Turn your imagination into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt=""
          className='img1 w-80 xl:w-96 rounded-lg'
        />
        <div className='d1'>
          <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
          <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it , and watch it come to life instantly.</p>

          <p className='text-gray-600'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concept that don't yet exists can be visualized effortlessly.Powered by advanced AI technology, the creative possibilites are limitless!</p>
        </div>
      </div>
    </div>
  )
}

export default Description