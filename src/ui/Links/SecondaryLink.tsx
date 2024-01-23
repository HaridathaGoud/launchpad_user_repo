import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryLink = () => {
  return (
    <Link to ={``} className='block py-2 font-semibold px-4 text-base  hover:text-primary hover:bg-transparent active:text-primary !active:bg-transparent'></Link>
  )
}

export default SecondaryLink