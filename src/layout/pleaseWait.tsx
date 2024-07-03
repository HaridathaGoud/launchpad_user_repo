import React from 'react'

const PleaseWait = ({text='Please wait...',boxClass="h-[90vh]"}) => {
  return (
    <div className={`m-auto flex justify-center items-center ${boxClass}`}>
        <span className='animate-bounce text-primary font-bold text-xl'>{text}</span></div>
  )
}

export default PleaseWait