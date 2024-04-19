import React from 'react'
import { Modal } from '../../../ui/Modal'
import success from "../../../assets/images/success.png";

const Success = (props:any) => {
  return (
    <Modal id={props.id}>
    <div className="">
      <div className="flex justify-between items-center  mb-5">
        <h3 className="font-semibold text-lg mb-5"></h3>
      </div>
      <div className="text-center">
        <img className="mx-auto" src={success} alt="Mint Successful"/>
        <h1 className={`text-success text-3xl font-semibold mt-5 mb-2`}>
          Congratulations!
        </h1>
        <p className="text-lg">{props.address}</p>
        <p className="text-base mt-6 mb-8">
          Your{" "}
          <span className="font-semibold">
            mint for membership is Successful!
          </span>{" "}
        </p>
      </div>
    </div>
  </Modal>
  )
}

export default Success