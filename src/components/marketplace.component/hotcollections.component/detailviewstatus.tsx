import React, {  useState } from 'react';
import Button from '../../../ui/Button';
const StatusDetailview = (props:any) => {
const [selectedValue, setSelectedValue] = useState('All');
const [selectedPricevalue, setSelectedPricevalue] = useState('Matic');
const [selectedPriceLevel, setSelectedPriceLevel]=useState(null)

const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.getNftsDetails(selectedValue, selectedPricevalue, selectedPriceLevel);
};
const handleDropdownChange = (value) => {
    setSelectedPricevalue(value);
};
const handleApplyClick = () => {
    props.getNftsDetails(selectedValue,selectedPricevalue,selectedPriceLevel);
};
const sendSelectedValue = (value) => {
    setSelectedPriceLevel(value);
};

    return (
           <div>
            <h1 className='text-lg font-semibold text-secondary mb-5'>Status</h1>
            <div className='flex items-center'>
                <label htmlFor="" className='font-medium text-secondary relative flex items-center'>
                    <input
                        type="radio"
                        name="radio-1"
                        className="radio opacity-0 z-[1] relative"
                        value="All"
                        checked={selectedValue === 'All'}
                        onChange={handleChange}
                    />
                <span>
                    </span>All</label>
                <label htmlFor="" className='font-medium text-secondary relative flex items-center mx-2.5 whitespace-nowrap'>
                    <input
                        type="radio"
                        name="radio-1"
                        className="radio opacity-0 z-[1] relative"
                        value="Buy Now"
                        checked={selectedValue === 'Buy Now'}
                        onChange={handleChange}
                    />
                <span>
                    </span>Buy Now</label>
                <label htmlFor="" className='font-medium text-secondary relative flex items-center whitespace-nowrap'>
                    <input
                        type="radio"
                        name="radio-1"
                        className="radio opacity-0 z-[1] relative"
                        value="Live auction"
                        checked={selectedValue === 'Live auction'}
                        onChange={handleChange}
                    /> <span>
                    </span>Live auction</label>
            </div>
            <hr className='mt-[28px] mb-4' />
            <h1 className='text-lg font-semibold text-secondary mb-5'>Price</h1>
                <div className="dropdown w-full">
                    <div tabIndex={0} className="border text-secondary flex border-secondary bg-transparent hover:bg-transparent rounded-[25px] !py-2 !px-[14px]  w-full justify-between">
                        {selectedPricevalue} <span className='icon drop-arrow'></span></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                        <li><a  onClick={() => handleDropdownChange('Matic')}>Matic</a></li>
                        <li><a  onClick={() => handleDropdownChange('USDT')} >USDT</a></li>
                    </ul>
                </div>
                <div className="join w-full mt-4">
                    <button className=" join-item bg-info-content border-0 text-dark hover:bg-info-content rounded-tl-[25px] rounded-bl-[25px] text-sm font-normal !border-0 flex-1 py-2.5 px-[14px] text-left" 
                    onClick={()=>sendSelectedValue("Min")}>Min</button>
                    <span className=" join-item bg-info-content border-0 text-dark hover:bg-info-content font-medium !border-0 shrink-0 px-1 pt-2">to</span>
                    <button className=" join-item bg-info-content border-0 text-dark hover:bg-info-content rounded-tr-[25px] rounded-br-[25px] text-sm font-normal flex-1 !border-0 px-[14px] text-right" 
                    onClick={()=>sendSelectedValue("Max")}>Max</button>
                </div>
                <div className="text-right">
                    <Button children={'Apply'} 
                    btnClassName='uppercase mt-[18px] md:min-w-[132px]' 
                    type='secondary' 
                    handleClick={()=>handleApplyClick()}
                    />
                </div>

              {/* Currently we commented this in feature it required */}

                {/* {props.activeTab === 'nft' && <div >
                    <hr className='mt-[28px] mb-4' />
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" checked="checked" />
                        <div className="collapse-title text-lg font-semibold text-secondary px-0">
                            Quantity
                        </div>
                        <div className="collapse-content px-0">
                            <div className='flex items-center justify-between'>
                                <p className='text-secondary'>All</p>
                                <label htmlFor="" className='font-medium text-secondary relative '><input type="radio" name="radio-1" className="radio opacity-0 z-[1] relative" /><span></span></label>
                            </div>
                            <div className='flex items-center justify-between my-3'>
                                <p className='text-secondary'>Single items</p>
                                <label htmlFor="" className='font-medium text-secondary relative '><input type="radio" name="radio-1" className="radio opacity-0 z-[1] relative" /><span></span></label>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-secondary'>Bundles</p>
                                <label htmlFor="" className='font-medium text-secondary relative '><input type="radio" name="radio-1" className="radio opacity-0 z-[1] relative" /><span></span></label>
                            </div>
                        </div>
                    </div>
                    <hr className='' />
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-lg font-semibold text-secondary px-0">
                            Currency
                        </div>
                        <div className="collapse-content px-0">
                            <div className='flex items-center justify-between'>
                                <p className='text-secondary'>Matic</p>
                                <label className='cursor-pointer relative inline-block mt-1'>
                                    <span>
                                        <input type="checkbox" className="checkbox checkbox-error opacity-0" />
                                        <span></span>
                                    </span>
                                </label>
                            </div>
                            <div className='flex items-center justify-between mt-3'>
                                <p className='text-secondary'>USDT</p>
                                <label className='cursor-pointer relative inline-block mt-1'>
                                    <span>
                                        <input type="checkbox" className="checkbox checkbox-error opacity-0" />
                                        <span></span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className='' />
                    <div className="collapse collapse-arrow ">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-lg font-semibold text-secondary px-0">
                            Image
                        </div>
                    </div>
                    <div className="collapse-content px-0">

                    </div>
                </div>} */}
           </div>
    );


};

export default StatusDetailview;