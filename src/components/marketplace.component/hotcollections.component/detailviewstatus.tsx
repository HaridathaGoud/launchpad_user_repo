import React, { useEffect, useState } from 'react';
import Button from '../../../ui/Button';
import { getMarketplace } from '../../../utils/api';
import { setError } from "../../../reducers/layoutReducer";
import { useDispatch } from 'react-redux';
import NumberInput from '../../../ui/numberInput';

const StatusDetailview = ({
    handleChange,
    handleCurrency,
    handleQuantity,
    selectedObj,
    handleApply
}) => {
    const rootDispatch = useDispatch();
    const [networks, setNetworks] = useState([]);
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    useEffect(() => {
        getNetworks();
    }, []);

    const getNetworks = async () => {
        try {
            const response = await getMarketplace('User/networkslu');
            if (response.status === 200) {
                setNetworks(response.data[0]?.currencies);
            } else {
                rootDispatch(setError({ message: response }));
            }
        } catch (error) {
            rootDispatch(setError({ message: error.message }));
        }
    };

    const handleAmountChange = (fieldName, value) => {
        if (fieldName === 'min') setMinValue(value);
        if (fieldName === 'max') setMaxValue(value);
    };
console.log(selectedObj)
    return (
        <div>
            <h1 className='text-lg font-semibold text-secondary mb-5'>Status</h1>
            <div className='flex items-center'>
                <label htmlFor="" className='font-medium text-secondary relative flex items-center'>
                    <input
                        type="radio"
                        className="radio opacity-0 z-[1] relative"
                        value="All"
                        checked={selectedObj?.status === 'All'}
                        onChange={handleChange}
                    />
                    <span>
                    </span>All</label>
                <label htmlFor="" className='font-medium text-secondary relative flex items-center mx-2.5 whitespace-nowrap'>
                    <input
                        type="radio"
                        className="radio opacity-0 z-[1] relative"
                        value="Buy Now"
                        checked={selectedObj?.status === 'Buy Now'}
                        onChange={handleChange}
                    />
                    <span>
                    </span>Buy Now</label>
                <label htmlFor="" className='font-medium text-secondary relative flex items-center whitespace-nowrap'>
                    <input
                        type="radio"
                        // name="radio-1"
                        className="radio opacity-0 z-[1] relative"
                        value="auction"
                        checked={selectedObj?.status === 'auction'}
                        onChange={handleChange}
                    /> <span>
                    </span>Live auction</label>
            </div>
            <hr className='mt-[28px] mb-4' />
            <h1 className='text-lg font-semibold text-secondary mb-5'>Price</h1>
            <div className="join w-full mt-4">
                <div className='flex items-center'>
                    <NumberInput
                        label="Min"
                        value={minValue}
                        inputBoxClass="mb-6"
                        fieldName="min"
                        error={null}
                        isInteger={false}
                        onChange={handleAmountChange}
                        isRequired={false}
                        disabled={false}
                    />
                </div>
                <span className="join-item bg-info-content text-dark hover:bg-info-content font-medium !border-0 shrink-0 px-1 pt-2">to</span>
                <div className='flex items-center'>
                    <NumberInput
                        label="Max"
                        value={maxValue}
                        inputBoxClass="mb-6"
                        fieldName="max"
                        error={null}
                        isInteger={false}
                        onChange={handleAmountChange}
                        isRequired={false}
                        disabled={false}
                    />
                </div>
            </div>
            <div className="text-right">
                <Button
                    children={'Apply'}
                    btnClassName='uppercase mt-[18px] md:min-w-[132px]'
                    type='secondary'
                    handleClick={() => handleApply(minValue, maxValue)}
                />
            </div>
            <div >
                <hr className='mt-[28px] mb-4' />
                <div className="collapse collapse-arrow ">
                    <input type="radio" name="my-accordion-2" checked="checked" />
                    <div className="collapse-title text-lg font-semibold text-secondary px-0">
                        Quantity
                    </div>
                    <div className="collapse-content px-0">
                        <div className='flex items-center justify-between'>
                            <p className='text-secondary'>All</p>
                            <label htmlFor="" className='font-medium text-secondary relative '><input type="radio" checked={selectedObj?.quantity === "All Items"} name="radio-1" className="radio opacity-0 z-[1] relative" onClick={() => handleQuantity('All Items')} /><span></span></label>
                        </div>
                        <div className='flex items-center justify-between my-3'>
                            <p className='text-secondary'>Single items</p>
                            <label htmlFor="" className='font-medium text-secondary relative '><input type="radio" checked={selectedObj?.quantity === 'Single Items'} name="radio-1" className="radio opacity-0 z-[1] relative" onClick={() => handleQuantity('Single Items')} /><span></span></label>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-secondary'>Bundles</p>
                            <label htmlFor="" className='font-medium text-secondary relative '><input type="radio" checked={selectedObj?.quantity === 'Bundles'} name="radio-1" className="radio opacity-0 z-[1] relative" onClick={() => handleQuantity('Bundles')} /><span></span></label>
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
                        {networks?.map((network, index) => (
                            <div key={index} className='flex items-center justify-between mt-3'>
                                <p className='text-secondary'>{network.currency}</p>
                                <label className='cursor-pointer relative inline-block mt-1'>
                                    <span>
                                        <input type="checkbox" className="checkbox checkbox-error opacity-0" checked={selectedObj?.currency === network.currency} onClick={() => handleCurrency(network.currency)} />
                                        <span></span>
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDetailview;
