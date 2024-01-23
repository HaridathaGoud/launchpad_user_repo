
import React, { useState } from 'react';
import styles from './input.module.css'
const TextInput = (props) => {
    return (
        <>
         <div className="">
            <label className={`block text-dark text-sm font-normal mb-2`}>Title <span className={`text-primary`}>*</span></label>
            <input type="text" className="input input-bordered w-full" />
            </div>
        </>
    );
};

export default TextInput;