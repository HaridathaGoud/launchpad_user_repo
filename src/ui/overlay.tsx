import React from 'react'

const Overlay = ({children,bgOpacity='bg-opacity-40',bgColor='bg-secondary'}) => {
  return (
    <div className={`fixed inset-0 ${bgColor} ${bgOpacity} flex items-center justify-center z-50`}>
        {children}
    </div>
  )
}

export default Overlay