import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import check from '../../assets/images/check.svg';
export default function Confirmations({ titles, currentStep, main_title, showModal }: any) {
  return (
    <Modal
      show={showModal}
      backdrop={false}
      className="wallet-popup checkout-modal properties-modal confirmpop modal-center confirmaton-modal bg-dark-shadow"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="p-3 mb-4 justify-content-start">
        <Modal.Title className='section-title mt-0 '>{main_title || 'Please wait....'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-3'>
        <ul style={{ listStyle: 'none' }}>
          {titles.map((item: any, indx: number) => (
            <li className="mb-4">
              <div className="d-flex cust-spinner align-items-center">
                <>
                  {' '}
                  <div>
                    {currentStep === indx + 1 && <Spinner />}
                    {currentStep > indx + 1 && <Image src={check} alt="" className="" />}{' '}
                  </div>
                  <div className="mx-2">
                    {' '}
                    <h4 className="card-title">{item.title}</h4>
                    <p className="modal-text text-start">{item.message}</p>
                  </div>
                </>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
