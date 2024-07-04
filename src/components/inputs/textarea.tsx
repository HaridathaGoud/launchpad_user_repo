
import React, { useState } from 'react';
import styles from './input.module.css'
const TextArea = () => {
    return (
        <>
         <div className="form-control">
            <label className={` text-dark text-sm font-normal p-0 mb-2 label`}> <span>Description (optional)</span> <span>0/20,000</span></label>
            <textarea className="textarea textarea-bordered w-full" rows={5}></textarea>
            <label htmlFor="" className={`relative flex items-center justify-between border border-t-0 border-skin-border px-3.5 py-4 peer-focus-within:border-skin-text ${styles.fileUpload}`}>
            <input accept="image/jpg, image/jpeg, image/png" type="file" className="absolute bottom-0 left-0 right-0 top-0 ml-0 w-full opacity-0 cursor-pointer" />
            <span className='pointer-events-none relative pl-1 text-sm'>
                <span className={`${styles.fileUploadText} text-sm font-normal text-secondary`}>Attach images by dragging & dropping, selecting or pasting them.</span>                
            </span>
            <span className={`icon ${styles.add}`}></span>
            </label>
            </div>
        </>
    );
};

export default TextArea;