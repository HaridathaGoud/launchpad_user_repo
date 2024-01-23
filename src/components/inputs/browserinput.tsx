
import React, { useState } from 'react';
import styles from './input.module.css'
const BrowserInput = () => {
    return (
        <>
           
            <div className="form-control browser-input">
            <label className={`block text-dark text-sm font-normal mb-2`}>Discussion (optional) </label>
                <label className='relative'>
                    <span className={`icon ${styles.browser}`}></span>
                    <input type="text" className="input input-bordered pl-10 w-full" />
                </label>
            </div>
        </>
    );
};

export default BrowserInput;