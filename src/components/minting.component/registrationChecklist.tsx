import React, { useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import WalletModal from '../../utils/walletModal';
import { getCustomerRegisterDetails, setSaveRegistration } from '../../reducers/rootReducer';
import { connect, useSelector,useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import thankyou from '../../assets/images/thankyou.svg';
import check from '../../../src/assets/images/check.svg';
import reject from '../../../src/assets/images/warning.svg';
import error from '../../../src/assets/images/error.svg';
import Image from 'react-bootstrap/Image';
import { selectedEditData } from '../../reducer/rootReducer';
import { useParams } from 'react-router-dom';
const Registrationchecklist = (props, { customerDetails, luDataSet, cryptoChange, selectedData, selectedCrypto, nftPrice, getMemberShipPriceDetails }) => {
  const { isConnected } = useAccount();
  const authInfo = useSelector((state: any) => state.auth.user);
  const customerRegisterDetails = useSelector((state: any) => state.auth.customerRegisterDetails);
  const saveCustomerRegisterDetails = useSelector((state: any) => state.auth.setCustomerRegisterDetails);
  const memberType = useSelector((state: any) => state.auth.memberType);
  const [metaMaskModalShow, setMetaMaskModalShow] = useState<boolean>(false)
  const [form, setForm] = useState<any>([]);
  const [remarkForm, setRemarkForm] = useState<any>({ "remarks": "" });
  const [errors, setErrors] = useState<any>({});
  const [memberDetails, setMemberDetails] = useState<any>()
  const [taskKeys, setTaskKeys] = useState<any>([])
  const router = useNavigate();
  const [loader, setLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [registerLoader, setRegisterLoader] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()
  useEffect(() => {
    setRemarkField("remarks", props.selectedData.customerRegisterDetails?.remarks)
    setMemberDetails(memberType?.data[0])
    if (customerRegisterDetails.error) {
      props?.errorMsg(customerRegisterDetails.error)
    }
    // getCurrencyValue()
  }, [customerRegisterDetails, props.selectedCrypto])

  const getMIntedNftValue = (address) => {
    props.mintedNftBlance(address)
  }

  const getCurrencyValue = () => {
    props.currencyValue("native")
  }
  // const handleProfileRedirect=()=>{

  //   dispatch(selectedEditData(true))
  //   router('/minnapad/profile');
  // }
  const handleRegistration = () => {
    if (isConnected) {
      if (!authInfo.kycStatus || authInfo.kycStatus.toLowerCase() !== 'completed') {
        router('/minnapad/kycStatus');
      } else {
        getCurrencyValue()
        getMIntedNftValue(authInfo.walletAddress)
        props.memberShipDetails()
      }
    } else {
      setMetaMaskModalShow(true)
    }
  }
  const handleClose = (Data) => {
    setMetaMaskModalShow(Data)
  }
  const connection = (data, id) => {
    if (data) {
      props.customerRegister(authInfo.id || id)
      getCurrencyValue()
      getMIntedNftValue(authInfo.walletAddress)
    }

  }

  const setRemarkField = (field, value) => {
    setRemarkForm({
      ...remarkForm,
      [field]: value
    })
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }


  const setField = (field, value) => {
    setForm((prevForm) => {
      const updatedForm = { ...prevForm };
      const [key, nestedKey] = field.split('.'); // Split the field name into key and nestedKey (if applicable)
      if (nestedKey) {
        if (!updatedForm[key]) {
          updatedForm[key] = {};
        }
        updatedForm[key][nestedKey] = value;
      } else {
        updatedForm[key] = value;
      }
      return updatedForm;
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }

  };

  const taskData = props.selectedData.customerRegisterDetails?.taskData ? props.selectedData.customerRegisterDetails?.taskData : []
  // const taskData = taskData ? Object.keys(taskData) : [];


  const validateDictionary = (obj: any) => {
    const newErrors = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        for (const nestedObj of value) {
          for (const nestedKey in nestedObj) {
            if (nestedObj[nestedKey] === null || nestedObj[nestedKey] === '' || nestedObj[nestedKey] === undefined) {
              newErrors[nestedKey] = "is required";
              setRegisterLoader(false)
              // You can set an error message for nested key validation here
            }
          }
        }
      } else if (obj.remarks == "" || obj.remarks == null && props.selectedData.customerRegisterDetails?.status == "Rejected") {
        newErrors[key] = "is required";
        setRegisterLoader(false);
      }
    }
    return newErrors;
  };

  const handleSaveRegistration = () => {
    setRegisterLoader(true)
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          const existingDataObject = formData.find((dataObject) => Object.keys(dataObject)[0] === nestedKey);
          if (existingDataObject) {
            existingDataObject[nestedKey] = nestedValue;
          } else {
            const newDataObject = { [nestedKey]: nestedValue };
            formData.push(newDataObject);
          }
        });
      } else {
        const existingDataObject = formData.find((dataObject) => Object.keys(dataObject)[0] === key);
        if (existingDataObject) {
          existingDataObject[key] = value;
        } else {
          const newDataObject = { [key]: value };
          formData.push(newDataObject);
        }
      }
    });

    const updateDictionaryList = (dictionaryList, updatedObjects) => {
      return dictionaryList.map((obj) => {
        const key = Object.keys(obj)[0];
        const updatedObject = updatedObjects.find((updatedObj) => Object.keys(updatedObj)[0] === key);
        if (updatedObject) {
          return updatedObject;
        }
        return obj;
      });
    };
    const originalDictionaryList = props.selectedData.customerRegisterDetails?.taskData;

    const updatedObject = formData.length > 0 ? formData : originalDictionaryList;

    const updatedDictionaryList = updateDictionaryList(originalDictionaryList, updatedObject);

    let obj = {
      "daoId":params.daoid,
      "customerId": authInfo.id,
      "membershipId": memberType?.data[0].id,
      "remarks": remarkForm.remarks,// || props.selectedData.customerRegisterDetails?.remarks,
      "taskData": updatedDictionaryList
    }
    const formErrors = validateDictionary(obj);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      props.setCustomerRegistration(obj, (data) => {
        setRegisterLoader(false)
        if (data) {
          router('/minnapad/thankyou');
        }
      })
    }
    setValidated(true);

  }

  const errorIcons = (status) => {
    if (status == "Pending") {
      return thankyou;
    } else if (status == "Approved") {
      return check;
    } else if (status == "Rejected") {
      return reject
    }
  }
  const errorTitle = (status) => {
    if (status.includes("Thank you")) {
      return "Thank You !"
    } else if (status.includes("Congratulations")) {
      return "Congratulations !"
    } else if (status.includes("rejected")) {
      return "Rejected !"
    }
  }
  const handleRedirectToProfile=()=>{
    router(`/profile/${true}`);
  }
  return (
    <div>
      {metaMaskModalShow && <WalletModal modalShow={metaMaskModalShow} metaMaskModalClose={handleClose} metaMaskCOnnection={connection} />}

      {props.selectedData.customerRegisterDetails?.isPeriodRegister && <>
        {(isConnected && props.selectedData.customerRegisterDetails?.isRegister == false && props.selectedData.customerRegisterDetails?.status == null
          && props.selectedData.customerRegisterDetails?.buttonName != "Not Whitelisted") &&
          <div>

            <Form noValidate validated={validated}>
              {Object.entries(taskData).map(([key, value]) => (
                <div key={key} className='mt-3 mb-3'>
                  {typeof value === 'object' ? (
                    Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <div key={nestedKey}>
                        <Form.Label className='price-label'>{`${nestedKey}*`}</Form.Label>
                       {nestedKey=="Discord ID" &&  <span  onClick={()=>handleRedirectToProfile()} className='edit-discordid'> <span className="icon edit me-1 c-pointer"></span> Change Discord ID </span>}
                        <Form.Control
                          className='input-height placeholder-style discord-form-label'
                          type='text'
                          size='lg'
                          placeholder={nestedKey}
                          name={nestedKey}
                          isInvalid={!!errors[nestedKey]}
                          required
                          disabled={nestedKey == "Discord ID" && true}
                          defaultValue={nestedValue}
                          onChange={(e) => { setField(nestedKey, e.currentTarget.value) }}

                        />
                        {/* <a href="/minnapad/profile">Discord Edit</a> */}
                        {/* <Button className="mintnow-btn" onClick={handleProfileRedirect}>Discord Edit</Button> */}
                        <Form.Control.Feedback type='invalid'>{errors[nestedKey]}</Form.Control.Feedback>
                      </div>
                    ))
                  ) : (
                    <div className='discord-form-label'>
                      <Form.Label className='price-label'>{`${key}*`}</Form.Label>
                      <Form.Control
                        className='input-height placeholder-style '
                        type='text'
                        size='lg'
                        placeholder={key}
                        name={key}
                        isInvalid={!!errors[key]}
                        required
                        disabled={key == "Discord ID" && true}
                        defaultValue={value}
                        onChange={(e) => { setField(key, e.currentTarget.value) }}
                      />                     
                      <Form.Control.Feedback type='invalid'>{errors[key]}</Form.Control.Feedback>
                    </div>
                  )}
                </div>
              ))}

              {props.selectedData.customerRegisterDetails?.isRegister == false &&
                <div className="mint-btn-align mt-3">
                  {props.selectedData.customerRegisterDetails?.buttonName!=null&&
                  <Button
                    className={props.selectedData.customerRegisterDetails?.status == null ? "mintnow-btn" : "not-whitelisted-btn"}
                    onClick={handleSaveRegistration} >
                    <span>{registerLoader && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
                    <span>{`${props.selectedData.customerRegisterDetails?.buttonName}`}</span>
                    {props.selectedData.customerRegisterDetails?.buttonName != "Not Whitelisted" && <span className="icon md right-doublearrow"></span>}
                  </Button>}
                </div>}
            </Form>
          </div>}


        {(isConnected && props.selectedData.customerRegisterDetails?.isRegister == true
          && props.selectedData.customerRegisterDetails?.isSaleStarted == false
          && props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "rejected") &&
          <div>
            <div className='cust-error-bg'>
              <div className='mr-4'><Image
                src={`${errorIcons(props.selectedData.customerRegisterDetails?.status)}`}
                alt="" /></div>
              <div>
                <p className='error-title error-warning'>{`${errorTitle(props.selectedData.customerRegisterDetails?.note)}`}</p>
                <p className="error-desc">{props.selectedData.customerRegisterDetails?.note}</p></div></div>

            <Form noValidate validated={validated}>
              {Object.entries(taskData).map(([key, value]) => (
                <div key={key} className='mt-3 mb-3'>
                  {typeof value === 'object' ? (
                    Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <div key={nestedKey}>
                        <Form.Label className='price-label'>{`${nestedKey}*`}</Form.Label>
                        {nestedKey=="Discord ID" &&  <span  onClick={()=>handleRedirectToProfile()} className='edit-discordid'> <span className="icon edit me-1 c-pointer"></span> Change Discord ID </span>}
                        <Form.Control
                          className='input-height placeholder-style discord-form-label'
                          type='text'
                          size='lg'
                          placeholder={nestedKey}
                          name={nestedKey}
                          isInvalid={!!errors[nestedKey]}
                          required
                          disabled={nestedKey == "Discord ID" && true}
                          defaultValue={nestedValue}
                          onChange={(e) => { setField(nestedKey, e.currentTarget.value) }}

                        />
                        <Form.Control.Feedback type='invalid'>{errors[nestedKey]}</Form.Control.Feedback>                       
                      </div>
                    ))
                  ) : (
                    <div>
                      <Form.Label className='price-label'>{`${key}*`}</Form.Label>
                      <Form.Control
                        className='input-height placeholder-style discord-form-label'
                        type='text'
                        size='lg'
                        placeholder={key}
                        name={key}
                        isInvalid={!!errors[key]}
                        required
                        disabled={key == "Discord ID" && true}
                        defaultValue={authInfo?.discordId}
                        onChange={(e) => { setField(key, e.currentTarget.value) }}
                      />
                      <Form.Control.Feedback type='invalid'>{errors[key]}</Form.Control.Feedback>
                    </div>
                  )}
                </div>
              ))}
              <Form.Label className='price-label'>Remarks*</Form.Label>
              <Form.Control className='input-height placeholder-style'
                as="textarea"
                size="lg"
                placeholder="Enter remarks"
                name="remarks"
                rows={3}
                isInvalid={!!errors.remarks}
                feedback={errors.remarks}
                maxlength={250}
                defaultValue={props.selectedData.customerRegisterDetails?.remarks}
                onChange={(e) => { setRemarkField("remarks", e.currentTarget.value) }}
              />
              <Form.Control.Feedback type='invalid'>{errors.remarks}</Form.Control.Feedback>
              <div className="mint-btn-align mt-3">
                <Button
                  className={props.selectedData.customerRegisterDetails?.status == "Rejected" && "mintnow-btn"}
                  onClick={handleSaveRegistration} >
                  <span>{registerLoader && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
                  <span>{`${props.selectedData.customerRegisterDetails?.buttonName}`}</span>
                  {(props.selectedData.customerRegisterDetails?.buttonName != "Mint Not Yet Started"
                    || props.selectedData.customerRegisterDetails?.buttonName != "Not Whitelisted") &&
                    <span className="icon md right-doublearrow"></span>
                  }
                </Button>
              </div>
            </Form>

          </div>}

        {(isConnected && props.selectedData.customerRegisterDetails?.isRegister == true
          && props.selectedData.customerRegisterDetails?.isSaleStarted == true
          && props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "rejected"
          && props.selectedData.customerRegisterDetails?.buttonName != "Not Whitelisted") &&
          <div>
            <div className='cust-error-bg'>
              <div className='mr-4'><Image
                src={`${errorIcons(props.selectedData.customerRegisterDetails?.status)}`}
                //  src={props.selectedData.customerRegisterDetails?.status !="Rejected"&&thankyou}
                alt="" /></div>
              <div>
                <p className='error-title error-warning'>{`${errorTitle(props.selectedData.customerRegisterDetails?.note)}`}</p>
                <p className="error-desc">{props.selectedData.customerRegisterDetails?.note}</p></div></div>

            {/* <p className="regular-text" style={{ color: "red" }}>{props.selectedData.customerRegisterDetails?.note}</p> */}

            <Form noValidate validated={validated}>
              {Object.entries(taskData).map(([key, value]) => (
                <div key={key}>
                  {typeof value === 'object' ? (
                    Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <div key={nestedKey} className='mt-3 mb-3'>
                        <Form.Label className='price-label'>{`${nestedKey}*`}</Form.Label>
                        {nestedKey=="Discord ID" &&  <span  onClick={()=>handleRedirectToProfile()} className='edit-discordid'> <span className="icon edit me-1 c-pointer"></span> Change Discord ID </span>}
                        <Form.Control
                          className='input-height placeholder-style discord-form-label'
                          type='text'
                          size='lg'
                          placeholder={nestedKey}
                          name={nestedKey}
                          isInvalid={!!errors[nestedKey]}
                          required
                          disabled={nestedKey == "Discord ID" && true}
                          defaultValue={nestedValue}
                          onChange={(e) => { setField(nestedKey, e.currentTarget.value) }}

                        />
                        <Form.Control.Feedback type='invalid'>{errors[nestedKey]}</Form.Control.Feedback>
                      </div>
                    ))
                  ) : (
                    <div>
                      <Form.Label className='price-label'>{`${key}*`}</Form.Label>
                      <Form.Control
                        className='input-height placeholder-style discord-form-label'
                        type='text'
                        size='lg'
                        placeholder={key}
                        name={key}
                        isInvalid={!!errors[key]}
                        required
                        disabled={key == "Discord ID" && true}
                        defaultValue={authInfo?.discordId}
                        onChange={(e) => { setField(key, e.currentTarget.value) }}
                      />
                      <Form.Control.Feedback type='invalid'>{errors[key]}</Form.Control.Feedback>
                    </div>
                  )}

                </div>
              ))}
              <div>

                <Form.Label className='price-label'>Remarks*</Form.Label>
                <Form.Control className='input-height placeholder-style'
                  as="textarea"
                  size="lg"
                  placeholder="Enter remarks"
                  name="remarks"
                  rows={3}
                  isInvalid={!!errors.remarks}
                  feedback={errors.remarks}
                  maxlength={250}
                  defaultValue={props.selectedData.customerRegisterDetails?.remarks}
                  onChange={(e) => { setRemarkField("remarks", e.currentTarget.value) }}
                />
                <Form.Control.Feedback type='invalid'>{errors.remarks}</Form.Control.Feedback>
              </div>
              <div className="mint-btn-align mt-3">
                <Button
                  className={props.selectedData.customerRegisterDetails?.status == "Rejected" && "mintnow-btn"}
                  onClick={handleSaveRegistration} >
                  <span>{registerLoader && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
                  <span>{`${props.selectedData.customerRegisterDetails?.buttonName}`}</span>
                  {(props.selectedData.customerRegisterDetails?.buttonName != "Mint Not Yet Started"
                    || props.selectedData.customerRegisterDetails?.buttonName != "Not Whitelisted") &&
                    <span className="icon md right-doublearrow"></span>
                  }
                </Button>
              </div>
            </Form>

          </div>}

        {(isConnected &&
          (props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "approved"
            || props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "pending" ||
            props.selectedData.customerRegisterDetails?.buttonName == "Not Whitelisted"
          )) &&
          <>
            {props.selectedData.customerRegisterDetails.isRegister && props.selectedData.customerRegisterDetails?.note == null
              && <>

                {props.note != null &&
                  <div className='cust-error-bg'>
                    <div className='mr-4'><Image src={reject} alt="" /></div>
                    <div>
                      <p className='error-title error-warning'>Warning</p>
                      <p className="error-desc">{`${props.note}`}</p>
                    </div></div>}
                <p className='price-label'>Quantity</p>
                <div className="position-relative">
                  <div className="">
                    <div>
                      <InputGroup className="mb-3 mint-group toggle-menu  matic-input">
                        <Dropdown
                          defaultValue={props.selectedData[0]?.crypto || props.selectedCrypto}
                        >
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic" disabled={props.currecnyLodaer && true}>
                            {!props.selectedCrypto ? (props.selectedData?.prices[0]?.crypto) : props.selectedCrypto}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {memberDetails?.prices.map((item: any) => (
                              <Dropdown.Item value={item.crypto} active={item.crypto === props.selectedCrypto} onClick={() => props.cryptoChange(item)}>
                                <span className={`icon md ${item.crypto=="Matic"? "matic":"eth"}`} /><span>{item.crypto}</span>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control className='mint-input'
                          disabled
                          readOnly
                          placeholder="0.00"
                          value={
                            props.nftPrice && `${Number(props.nftPrice).toFixed(8)}${' '}${props.selectedCrypto}`
                          }
                        />
                        {props.currecnyLodaer && <Spinner animation="border" className='inside-loader-cust mt-0' />}
                      </InputGroup>
                    </div>
                    <div className="change-value d-flex">
                      <button className="icon sm subicon bg-white" onClick={props.handleCounterDecrement}></button>
                      <p>{props.count}</p>
                      <button className="icon sm addicon" onClick={props.handleCounterIncrement}></button>
                    </div>
                  </div>
                </div>
              </>
            }


            {((props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "pending"
              && props.selectedData.customerRegisterDetails?.buttonDisables == true)
              || (props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "approved"
                && props.selectedData.customerRegisterDetails?.buttonDisables == true)

            ) ?
              <div className='cust-error-bg'>
                <div className='mr-4'><Image
                  src={`${errorIcons(props.selectedData.customerRegisterDetails?.status)}`}
                  //  src={props.selectedData.customerRegisterDetails?.status !="Rejected"&&thankyou}
                  alt="" /></div>
                <div>
                  <p className='error-title'>{`${errorTitle(props.selectedData.customerRegisterDetails?.note)}`}</p>
                  <p className="error-desc">{props.selectedData.customerRegisterDetails?.note}</p></div></div> :
              <div className="text-end mt-3">
                {props.selectedData.customerRegisterDetails?.buttonName == "Not Whitelisted" ? 
                <div className={props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "pending"
                  || props.selectedData.customerRegisterDetails?.buttonName == "Not Whitelisted"}>
                   
                    <div className='cust-error-bg'>
                <div className='mr-4'><Image
                  src={reject}
                  //  src={props.selectedData.customerRegisterDetails?.status !="Rejected"&&thankyou}
                  alt="" /></div>
                <div>
                  <p className='error-title error-warning text-start'>{`Not Whitelisted`}</p>
                  <p className="error-desc">{`Sorry, you are not whitelisted for the ${props?.selectedData?.saleName}.`}</p></div></div>
                    </div>
                  : <>
                    {!props.showRefreshbtn && <Button
                      className={
                        (props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "pending"
                          || props.selectedData.customerRegisterDetails?.buttonName == "Not Whitelisted")

                          ? "not-whitelisted-btn" : "mintnow-btn"}
                      onClick={props.handleMinting}
                      disabled={customerRegisterDetails.data?.buttonDisables||props.loader}
                    >
                      <span>{props.loader && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
                      <span>{`${props.selectedData.customerRegisterDetails?.buttonName}`}</span>

                      {' '}

                      {(props.selectedData.customerRegisterDetails?.buttonName != "Not Whitelisted") &&
                        <span className="icon md right-doublearrow"></span>}
                    </Button>}</>
                }
                {/* {props.showRefreshbtn && <Button
                  className=""
                  onClick={()=>props?.gotoDashboard()}
                >
                  Refresh
                  <span>{props.loader && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
                  {'... '}
                  {<span className="icon md right-doublearrow"></span>}
                </Button>} */}

              </div>}
          </>}
      </>}
      {/* {props.showRefreshbtn && <Button
                  className="refresh-btn"
                  onClick={()=>props?.gotoDashboard()}
                >
                  Refresh
                  <span>{props.loader && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
                  {'... '}
                  {<span className="icon md refresh"></span>}
                </Button>} */}
      {props.selectedData.customerRegisterDetails?.isPeriodRegister == false && <>
        {isConnected &&
          <>
            {props.note != null &&
              <div className='cust-error-bg'>
                <div className='mr-4'><Image src={reject} alt="" /></div>
                <div>
                  <p className='error-title error-warning'>Warning</p>
                  <p className="error-desc">{`${props.note}`}</p>
                </div>
              </div>}

            <p className='price-label'>Quantity</p>
            <div className="position-relative">
              <div className="">
                <div>
                  <InputGroup className="mb-3 mint-group toggle-menu  matic-input">
                    <Dropdown
                      defaultValue={props.selectedData[0]?.crypto || props.selectedCrypto}
                    >
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic" disabled={props.currecnyLodaer && true}>
                        {!props.selectedCrypto ? (props.selectedData?.prices[0]?.crypto) : props.selectedCrypto}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='quantity-dropdown'>
                       
                        {memberDetails?.prices.map((item: any) => (
                          <Dropdown.Item value={item.crypto} active={item.crypto === props.selectedCrypto} onClick={() => props.cryptoChange(item)}>
                            
                           <span className={`icon md ${item.crypto=="Matic"? "matic":"eth"}`} /><span>{item.crypto}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control className='mint-input'
                      disabled
                      readOnly
                      placeholder="0.00"
                      value={
                        props.nftPrice && `${Number(props.nftPrice).toFixed(8)}${' '}${props.selectedCrypto}`
                      }
                    />
                    {props.currecnyLodaer && <Spinner animation="border" className='inside-loader-cust mt-0' />}
                  </InputGroup>
                </div>

                <div className="change-value d-flex">
                  <button className="icon sm subicon bg-white btn-transparent " onClick={props.handleCounterDecrement}></button>
                  <p>{props.count}</p>
                  <button className="icon sm addicon" onClick={props.handleCounterIncrement}></button>
                </div>
              </div>
            </div>

            <div className="mint-btn-align mt-3">
              {!props.showRefreshbtn && <Button
                className={props.selectedData.customerRegisterDetails?.status?.toLowerCase() == "pending" ? "not-whitelisted-btn" : "mintnow-btn"}
                onClick={props.handleMinting}
                disabled={props.loader}
              >
                <span>{props.loader && <Spinner size="sm" className='custmint-loader text-base-100' />}</span>{' '}
                <span>{`${props.selectedData.customerRegisterDetails?.buttonName}`}</span>
                {' '}
                <span className="icon md right-doublearrow"></span>
              </Button>}
            </div>
          </>}
      </>}

      {props.showRefreshbtn && <Button
        className="refresh-btn"
        onClick={() => props?.gotoDashboard()}
      >
        Refresh
        <span>{props.loader && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
        {'... '}
        {<span className="icon md refresh"></span>}
      </Button>}
      {memberDetails?.period != null &&  <>
      {props.selectedData.customerRegisterDetails == null && <>
        {(customerRegisterDetails?.data == null && memberDetails?.period) &&
          <div className="mint-btn-align mt-3">
            <Button className="mintnow-btn" onClick={handleRegistration} >
              <span>{customerRegisterDetails?.isLoading && <Spinner size="sm" className='custmint-loader' />}</span>{' '}
              <span>{`${memberDetails?.period}`}</span>
              <span className="icon md right-doublearrow"></span>
            </Button>
          </div>}
      </>}
      </>}

    </div>
  )
}
const connectDispatchToProps = (dispatch: any) => {
  return {
    customerRegister: (customerId: any) => {
      dispatch(getCustomerRegisterDetails(customerId));
    },
    setCustomerRegistration: (obj: any, callback) => {
      dispatch(setSaveRegistration(obj, callback));
    },

    dispatch,
  };
};

export default connect(null, connectDispatchToProps)(Registrationchecklist);
