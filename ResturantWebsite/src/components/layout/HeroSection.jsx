import { Fullscreen } from 'lucide-react'
import React from 'react'

export default function HeroSection() {
  return (
    <section  style={{ backgroundImage: "url('/images/backgrounds/Image1.jpeg')" ,
      backgroundSize : 'Cover' ,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position:"relative",
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '600px'
     }}
     className="hero-section p-0 m-0 w-screen h-fit">
      <div className='p-10'>
         <h1 className="display-lg w-[60%]">Welcome to STACK'D <span className="text-ember">Restaurant</span></h1>
         <p></p>
      </div>
    </section>
  )
}
