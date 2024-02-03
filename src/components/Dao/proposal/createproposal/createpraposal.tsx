import React, { useEffect, useState, useReducer, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import user from '../../../../assets/images/praposal-user.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { proposalData } from '../proposlaReducer/proposlaReducer'
import { store } from '../../../../store';
import { validateContentRule } from "../../../../utils/validation";
import { useParams } from 'react-router-dom';
import StartedSteps from './steps';
import { ethers } from 'ethers/lib';
// import { Modal } from 'react-bootstrap';
import { Modal, modalActions } from '../../../../ui/Modal';
import error from '../../../../assets/images/error.svg';
import Image from 'react-bootstrap/Image';
import { useAccount } from 'wagmi';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isMobile } from 'react-device-detect'
import { useSelector, connect } from 'react-redux';
import { getCustomerDetails } from '../../../../reducers/authReducer';
import shimmers from "../../shimmers/shimmers";
import PlaceHolder from "../../shimmers/placeholder";
import WalletText from '../../../../utils/walletText';
import Button from '../../../../ui/Button';
import outletContext from '../../../../layout/context/outletContext';
import OutletContextModel from '../../../../layout/context/model';

const reducers = (state: any, action: any) => {
  switch (action.type) {
    case 'startingDate':
      return { ...state, startingDate: action.payload };
    case 'endingDate':
      return { ...state, endingDate: action.payload };
    case 'startingTime':
      return { ...state, startingTime: action.payload };
    case 'endingTime':
      return { ...state, endingTime: action.payload };
    case 'modalShow':
      return { ...state, modalShow: action.payload };
    case 'epochStartData':
      return { ...state, epochStartData: action.payload };
    case 'epochEndData':
      return { ...state, epochEndData: action.payload };
    case 'modalError':
      return { ...state, modalError: action.payload };
    case 'isChecked':
      return { ...state, isChecked: action.payload };
  }
}
function CreatePraposal(props: any) {
  const router = useNavigate();
  const { isConnected, address } = useAccount();
  const PublishShimmers = shimmers.PublishProposal(3);
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const params = useParams()
  // const [errorMsg, setErrorMessage] = useState<any>(false);
  const [options, setOptions] = useState<any>([{ options: null, Id: "00000000-0000-0000-0000-000000000000", optionhash: null }]);
  const [attributes, setAttributes] = useState([]);
  const [copied, setCopied] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 16);
  const [loader, setLoader] = useState(false)
  const {toasterMessage,setErrorMessage,setToaster}:OutletContextModel=useContext(outletContext)
  const [state, dispatch] = useReducer(reducers, {
    startingDate: null, endingDate: null, startingTime: null, endingTime: null, modalShow: false,
    epochStartTime: null, epochEndData: null, modalError: false, isChecked: false
  })
  const getCustomerId = useSelector((state: any) => state?.oidc?.user?.id);
  const addOption = () => {
    const newFields = [...options, { value: null, Id: "00000000-0000-0000-0000-000000000000", optionhash: null }];
    let optionsArray = newFields.map((item, index) => {
      return {
        options: item.options,
        Id: "00000000-0000-0000-0000-000000000000",
        optionhash: null,
        index: String.fromCharCode(65 + index)
      }
    })
    setOptions(optionsArray);

  };


  useEffect(() => {
    if (isConnected) {
      if (address) {
        setLoader(true)
        props?.customerDetails(address, (callback: any) => {
          if (callback?.data?.data?.kycStatus?.toLowerCase() === "completed") {
            setLoader(false)
          } else {
            router(`/dao/kyc`)
          }
        })
      }
    }
  }, [address])
  const deleteOption = (index: any) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    if (updatedOptions.length === 0) {
      dispatch({ type: 'modalError', payload: "Please provide at least one option to continue." })
    } else {
      setOptions(updatedOptions);
    }
  };

  const openModalPopUp = () => {
     dispatch({ type: 'modalShow', payload: true })
     modalActions("modalShow","open")
    dispatch({ type: 'modalError', payload: null })
  };

  const handleClose = () => {
    resetProperties();
     dispatch({ type: 'modalShow', payload: false })
     modalActions("modalShow","close")
  };

  const optionSave = () => {
    let isUpdate = false;
    let _properties = [...options];
    let _attribute = [];

    for (let i in _properties) {
      let _obj = _properties[i];

      if (_obj.options == "" || _obj.options == null || !_obj.options.trim()) {
        return dispatch({ type: 'modalError', payload: "Please fill the data." });
      } else if (validateContentRule("", _obj.options)) {
        return dispatch({ type: 'modalError', payload: "Please provide valid content." });
      } else {
        const isDuplicate = _attribute.some(item => item?.options?.trim().toLowerCase() === _obj?.options?.trim().toLowerCase());

        if (isDuplicate) {
          return dispatch({ type: 'modalError', payload: "Options should be unique." });
        } else {
          dispatch({ type: 'modalError', payload: null });
          isUpdate = true;

          if (_obj.optionhash == null) {
            _obj.optionhash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(_obj.options));
          }

          _attribute.push(_obj);
        }
      }
    }

    setAttributes(_attribute);

    if (isUpdate) {
       dispatch({ type: 'modalShow', payload: false });
       modalActions("modalShow","close")
    }
  };

  const checkBoxChecked = (e: any) => {
    if (attributes.length == 0 && !state.checked) {
      dispatch({ type: 'isChecked', payload: e.target.checked })
    }
  }

  const handleRedirectToPublishProposalScreen = (event: any) => {
    setErrorMessage?.(null)
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else if (state?.startingDate && state?.endingDate < state?.startingDate) {
      setErrorMessage?.("Start date cannot be greater than the end date.")
      window.scroll(0, 0);
    } else if ((state?.startingDate == state?.endingDate) && state?.endingTime == state?.startingTime) {
      setErrorMessage?.("Start time and end time cannot be the same.")
      window.scroll(0, 0);
    } 
    else if (!state?.isChecked || attributes.length == 0) {
      setErrorMessage?.("Please select proposal type")
      window.scroll(0, 0);
    } 
    else {

      const startTime = convertTo24HourFormat(state?.startingTime);
      const endTime = convertTo24HourFormat(state?.endingTime);

      if ((state?.startingDate == state?.endingDate) && (startTime > endTime)) {
        setErrorMessage?.("Start time cannot be greater than the end time.")
        window.scroll(0, 0);
      } else {
        let proposalType = state?.isChecked ? "voting" : "decision";
        let formData = form;
        formData.ProposalOptionDetails = attributes
        formData.startDate = state?.epochStartData
        formData.endDate = state?.epochEndData
        formData.proposalType = proposalType
        formData.customerId = getCustomerId
        formData.TitleHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(form.proposal))
        store.dispatch(proposalData(formData));
        router(`/dao/${params?.id}/publishproposal`)
      }
    }
  }

  const convertTo24HourFormat = (time) => {
    const [timeStr, amPm] = time.split(' ');
    const [hours, minutes] = timeStr.split(':');
    let hours24 = parseInt(hours, 10);

    if (amPm?.toLowerCase() === 'pm' && hours24 !== 12) {
      hours24 += 12;
    } else if (amPm?.toLowerCase() === 'am' && hours24 === 12) {
      hours24 = 0;
    }

    return hours24 * 60 + parseInt(minutes, 10);
  };

  const validateForm = (obj: any, isChange: any) => {
    const { proposal, summary, startdate, enddate } = isChange ? obj : form
    const newErrors = {};
    if (!proposal || proposal === '') {
      newErrors.proposal = "Is required";
    } else if (validateContentRule("", proposal)) {
      newErrors.proposal = "Please provide valid content";
    }
    if (!summary || summary === '') {
      newErrors.summary = "Is required";
    } else if (validateContentRule("", summary)) {
      newErrors.summary = "Please provide valid content";
    }
    if (!startdate || startdate === '') {
      newErrors.startdate = "Is required";
    }
    if (!enddate || enddate === '') {
      newErrors.enddate = "Is required";
    }
    return newErrors;
  }

  const setOptionFeild = (value: any, index: any) => {
    const newFields = [...options];
    newFields[index].options = value
    setOptions(newFields)
  }
  const setField = (field: any, value: any) => {
    setForm({ ...form, [field]: value })
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null })
    }

  }

  const startDate = (e: any) => {
    const selectedDate = e.currentTarget.value
    const datetimeString = selectedDate.slice(0, 10);
    const datetime = new Date(selectedDate);
    const dateTimeUtc = new Date(selectedDate).toUTCString();
    const epochStartTime = Math.floor(new Date(dateTimeUtc).getTime() / 1000);
    const selectedTime = datetime.toLocaleTimeString();
    const d = datetimeString + " " + selectedTime;
    dispatch({ type: 'epochStartData', payload: epochStartTime })
    setField('startdate', selectedDate);
    dispatch({ type: 'startingDate', payload: datetimeString })
    dispatch({ type: 'startingTime', payload: selectedTime })

  }


  const endDate = (e: any) => {
    const selectedDate = e.currentTarget.value;
    const datetimeString = selectedDate.slice(0, 10);
    const datetime = new Date(selectedDate);
    const dateTimeUtc = new Date(selectedDate).toUTCString();
    const epochEndTime = Math.floor(new Date(dateTimeUtc).getTime() / 1000);
    const selectedTime = datetime.toLocaleTimeString();
    const d = datetimeString + " " + selectedTime;
    dispatch({ type: 'epochEndData', payload: epochEndTime })
    setField('enddate', selectedDate);
    dispatch({ type: 'endingDate', payload: datetimeString })
    dispatch({ type: 'endingTime', payload: selectedTime })
  }
  function resetProperties() {
    if (attributes?.length !== 0) {
      let _attributes = attributes.map((item: any) => { return { ...item } });
      let _properties = [];
      for (let i in _attributes) {
        let _obj: any = {};
        for (let key in _attributes[i]) {
          _obj[key] = _attributes[i][key];
        }
        _properties.push(_obj);
      }
      setOptions(_attributes);
    } else {
      setOptions([{ value: null, Id: "00000000-0000-0000-0000-000000000000", optionhash: null }])
    }
  }

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }
  return (
    <>
      {isConnected ?
        <>
          <div className=''>
            <div className='flex items-center justify-between mb-7'>
            <Link to={`/dao/${params.id}`} className=''>  <span className='text-xl font-semibold text-secondary'>Create Proposal</span></Link>
            <span className={`icon closeIcon`} onClick={props?.close} ></span>
            </div>

            <div className=''>

              <StartedSteps formSteps={33} stepsOne={1} number={1} />

              <div className=''>
{/* 
                {errorMsg && (<div className='cust-error-bg'>
                  <div className='cust-crd-mr'><Image src={error} alt="" /></div>
                  <div>
                    <p className='error-title error-red'>Error</p>
                    <p className="error-desc">{errorMsg}</p></div>
                </div>)} */}
                {!loader ?
                  <form noValidate onSubmit={(e) => handleRedirectToPublishProposalScreen(e)}>
                    <div className='mt-4 '>
                      <label className='mb-0 inline-block ml-5'>Author</label>
                      <div className='border-[#A5A5A5] border rounded-[28px] px-6 py-2 flex items-center'>
                        <img src={user}></img><span className=''>{address}</span>
                        <CopyToClipboard text={address} options={{ format: 'text/plain' }}
                          onCopy={() => handleCopy()}
                        >
                          <span className={!copied ? 'icon md copy-icon c-pointer' : 'icon copy-check c-pointer ms-2'} />
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div className="mt-4" >
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-5'>Proposal Title</label>
                      <input className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-5'
                        type="text"
                        placeholder="Proposal Title"
                        name="proposal"
                        maxLength={250}
                        isInvalid={!!errors.proposal}
                        onChange={(e) => { setField('proposal', e.currentTarget.value?.trim()) }}
                      />
                      <label className='text-sm font-normal text-red-600 ml-4'>{errors.proposal}</label>
                    </div>
                    <div className="mb-3 mt-4" >
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-5'>Summary</label>
                      <textarea as="textarea"
                        className='textarea textarea-bordered w-full rounded-[28px] focus:outline-none pl-5'
                        rows={3}
                        placeholder="Summary"
                        name='summary'
                        isInvalid={!!errors.summary}
                        onChange={(e) => { setField('summary', e.currentTarget.value?.trim()) }}
                      />
                      <label className='text-sm font-normal text-red-600 ml-4'>{errors.summary}</label>
                    </div>


                    {/* <div className='proposal-type c-pointer'>
                <span className='icon uncheck-icon-ps'></span><span className='mb-0'>Decision</span>
                </div>  */}
                    <div className='mt-4'>
                      {/* <span className='icon check-icon-ps'></span> */}
                      <label  className='text-dark text-sm font-normal p-0 label ml-5'>Select Your Proposal Type</label>
                      <div className='flex gap-2 items-center w-full rounded-[28px] border-[#A5A5A5] border px-6 py-3 '>
                        <label className='cursor-pointer relative inline-block mt-1'>
                          <span>
                            <input
                              className='checkbox checkbox-error opacity-0 rounded-[28px]'
                              type='checkbox'
                              checked={attributes.length !== 0 ?  state?.isChecked : ""}
                              onChange={checkBoxChecked}
                               onClick={openModalPopUp} 
                              />
                            <span className=''></span>
                          </span>
                        </label>
                        <span className='text-dark text-sm font-normal p-0 label' >Voting</span>
                        </div>
                      {/* {state?.isChecked && (<div className='c-pointer me-3 btn-primary text-center' onClick={openModalPopUp}>Add</div>)} */}

                    </div>
                    <div className='mt-4'>
                      <div className=''>
                        {attributes?.map((item) => (
                          <>
                            <div className=''>
                              <span className='mb-0'>{item?.index || "A"}. {item?.options}</span>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4" >
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-5'>Start Date & Time (Local time zone)</label>
                      <input
                        type="datetime-local" className={`input input-bordered w-full pl-5 rounded-[28px] focus:outline-none ${(isMobile && !state?.startingDate) ? " " : (isMobile && state?.startingDate ? " " : "")}`}
                        placeholder='Start Date'
                        name='startdate'
                        min={currentDate}
                        isInvalid={!!errors.startdate}
                        onChange={(e) => startDate(e)}
                      />
                      <label className='text-sm font-normal text-red-600 ml-4'  >{errors.startdate}</label>
                    </div>
                    <div className="mt-4" >
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-5'>End Date & Time (Local time zone)</label>
                      <input
                        type="datetime-local" className={`input input-bordered w-full pl-5 rounded-[28px] focus:outline-none ${(isMobile && !state?.endingDate) ? " " : (isMobile && state?.endingDate ? " " : "")}`} placeholder='End Date'
                        name="enddate"
                        min={currentDate}
                        isInvalid={!!errors.enddate}
                        onChange={(e) => endDate(e)}
                      />
                      <label className='text-sm font-normal text-red-600 ml-4'>{errors.enddate}</label>
                    </div>
                    <div className='flex justify-center gap-5 items-center mt-16'>
                    <Link to={`/dao/${params?.id}`}>  <Button children={'Cancel'} handleClick={props?.close} type='cancel' /> </Link>
                      
                    <Button
                type="secondary"
                btnClassName="flex gap-2"
                handleClick={(e) => handleRedirectToPublishProposalScreen(e)}
                 disabled={toasterMessage ||  state.buttonLoader}
              > Next
              </Button>
                    </div>
                  </form> : <PlaceHolder contenthtml={PublishShimmers} />}
              </div>


            </div>

            <Modal id="modalShow">
                      
            <div>
              <h4>Add Your Options</h4>
              {state?.modalError && (<div className='cust-error-bg'>
                <div className='cust-crd-mr'><Image src={error} alt="" /></div>
                <div>
                  <p className='error-title error-red'>Error</p>
                  <p className="error-desc">{state?.modalError}</p></div>
              </div>)}
              <div >
                <Col sm={12} xs={12} md={12} lg={12} xl={12} xxl={12} className='text-end mb-4'>
                  <Button type="button" btnClassName="text-center fill-btn" handleClick={addOption}>
                    <span className='icon add'></span>Add new option
                  </Button>
                </Col>
                <Row>
                  {options.map((option: any, index: any) => (<>
                    <Col sm={12} xs={12} md={6} lg={6} xl={6} xxl={6}>
                      <div className='d-flex align-items-center add-block' key={index}>
                        <Form.Label className="mb-0">{option?.index ? (option?.index && option?.index + ".") : "A."}</Form.Label>
                        <Form.Control
                          type="text"
                          className='border-none-modal'
                          placeholder='Enter your option'
                          maxLength={50}
                          onChange={(e) => { setOptionFeild(e.currentTarget.value, index) }}
                          value={option.options ? option.options : ""}
                        />
                        <span className='icon delete-icon' onClick={() => deleteOption(index)}></span>
                      </div>
                    </Col>
                  </>))}
                </Row>
              </div>
              <div className="mt-4 text-end">
                <Button type="button" btnClassName="text-center border-btn" handleClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" btnClassName="fill-btn m-0 ms-3 submit-spinner" handleClick={optionSave}>
                  Save
                </Button>
              </div>
            </div>
            </Modal>
            
            {/* <Modal
              show={state?.modalShow}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="profile-edit add-option">
              <Modal.Header>
                <Modal.Title><h4>Add Your Options</h4></Modal.Title>
                <span className="icon close c-pointer" onClick={handleClose}></span>
              </Modal.Header>
              <Modal.Body>
                {state?.modalError && (<div className='cust-error-bg'>
                  <div className='cust-crd-mr'><Image src={error} alt="" /></div>
                  <div>
                    <p className='error-title error-red'>Error</p>
                    <p className="error-desc">{state?.modalError}</p></div>
                </div>)}
                <div >
                  <Col sm={12} xs={12} md={12} lg={12} xl={12} xxl={12} className='text-end mb-4'>
                    <Button type="button" className="text-center fill-btn" onClick={addOption}>
                      <span className='icon add'></span>Add new option
                    </Button>
                  </Col>
                  <Row>

                    {options.map((option: any, index: any) => (<>
                      <Col sm={12} xs={12} md={6} lg={6} xl={6} xxl={6}>
                        <div className='d-flex align-items-center add-block' key={index}>
                          <Form.Label className="mb-0">{option?.index ? (option?.index && option?.index + ".") : "A."}</Form.Label>
                          <Form.Control
                            type="text"
                            className='border-none-modal'
                            placeholder='Enter your option'
                            maxLength={50}
                            onChange={(e) => { setOptionFeild(e.currentTarget.value, index) }}
                            value={option.options ? option.options : ""}
                          />
                          <span className='icon delete-icon' onClick={() => deleteOption(index)}></span>
                        </div>
                      </Col>
                    </>))}
                  </Row>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="mt-4 text-end">
                  <Button type="button" className="text-center border-btn" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="fill-btn m-0 ms-3 submit-spinner" onClick={optionSave}>
                    Save
                  </Button>
                </div>
              </Modal.Footer>
            </Modal> */}
      
          </div>
        </> : <WalletText />}

    </>
  );
}
const connectStateToProps = ({ oidc, proposal }: any) => {
  return { oidc: oidc, proposal: proposal };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    customerDetails: (address: any, callback: any) => {
      dispatch(getCustomerDetails(address, callback));
    }
  }
}
export default connect(connectStateToProps, connectDispatchToProps)(CreatePraposal);