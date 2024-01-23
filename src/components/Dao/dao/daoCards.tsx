import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import loadimg from '../../../assets/images/loader.svg';

import { Placeholder } from 'react-bootstrap';

function DaoCards(props: any) {

    return (
        <><div><div className='container mx-auto max-sm:px-3 md:mt-3 mt-4'>
            <h5 className='font-semibold text-2xl text-secondary'>DAO’s</h5>
            
            <div className='grid grid-cols-4 gap-4'>
                {props?.loading ?
                    <div className='text-center'>
                        <div className='loading-overlay'>
                            <div className="text-center image-container">
                                <Image
                                    className=""
                                    src={loadimg}
                                    alt=""
                                />
                            </div></div></div>
                    : (<>
                        {props?.daoData?.data?.map((item: any) => (
                           <>
                                {props?.daoData ? <div className='shadow rounded me-3 mt-md-0 mt-3 sm-m-0 c-pointer rounded-lg transform transition-transform duration-500 hover:scale-[1.03]' onClick={() => props?.goToHome(item)}>
                                    <Image src={item?.logo} className='w-full rounded-t-lg h-[350px] object-cover' />
                                    <div className='p-2 rounded-b-lg'>
                                        <div className='text-base font-normal text-secondary !mb-0'>
                                        <span className='text-base-200 text-base font-semibold'>Name:</span>  {item?.name} 
                                        </div>
                                        <div className='text-base font-normal text-secondary mb-1'>
                                        <span className='text-base-200 text-base font-semibold'> Members:</span>  {item?.members.toLocaleString()}
                                        </div>
                                    </div>
                                </div> : (
                                    <div><Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={12} className='cardimg-placeholder' />
                                    </Placeholder>
                                        <Card.Body>
                                            <Placeholder as={Card.Title} animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                        </Card.Body>
                                    </div>)}
                           </>
                        ))}
                    </>)}
            </div>
        </div>
        </div></>
    )
}

export default DaoCards;