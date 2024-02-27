import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import aboutimgone from '../../../assets/images/collection.png';
import { Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useAccount } from 'wagmi';
import { Network, Alchemy } from 'alchemy-sdk';
import CopyToClipboard from 'react-copy-to-clipboard';
import nodata from '../../../assets/images/no-data.png';
import Placeholder from 'react-bootstrap/Placeholder';
import loadimg from '../../../assets/images/loader.svg'
import { getCUstomers } from '../../../utils/api';
import { store } from '../../../store';
import { setUserID } from '../../../reducers/rootReducer';
import { useNavigate } from 'react-router-dom';
const network = process.env.REACT_APP_ENV === "production" ? Network.MATIC_MAINNET : Network.MATIC_MUMBAI
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_APP_KEY,
  network: network,
};

const alchemy = new Alchemy(settings);
export default function Mycollections(props) {
  const [show, setShow] = useState(false);
  const { address } = useAccount();
  const [selectedNft, setSelectedNft] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nfts, setNFTS] = useState<any[]>();
  const [copied, setCopied] = useState(false);
  const [ownedCopied, setOwnedCopied] = useState(false);
  const [createdCopied, setCreatedCopied] = useState(false);
  const [selection, setCopySelections] = useState(null);
  const router = useNavigate();
  useEffect(() => {
    getCustomerDetail()
    getWalletNFTS();
  }, []);


  useEffect(() => {
    getWalletNFTS();
    setShow(false);
  }, [address]);

  const handleModal = (item: any) => {
    setShow(true);
    setSelectedNft(item);
  };
  const handleModalClose = () => {
    setShow(false);
  };


  const getCustomerDetail = async () => {
    let response = await getCUstomers(`User/CustomerDetails/${address}`);
    if (response) {
      if(!response.data.isReferralPage && response.data.kycStatus?.toLowerCase() == 'completed'){
        store.dispatch(setUserID(response.data));
        router(`/minnapad/referrals`)
      }
    }
  };

  const getWalletNFTS = async () => {
    try {
      setLoading(true);
      const nfts = await alchemy.nft.getNftsForOwner(address, { contractAddresses: [process.env.REACT_APP_MINTING_CONTRACTOR] });
      setNFTS(nfts.ownedNfts);
      getNftDetails(nfts.ownedNfts);
      setLoading(false);
    } catch (error) { }
  };
  const isErrorDispaly = (objValue: any) => {
    if (objValue.data && typeof objValue.data === 'string') {
      return objValue.data;
    } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else {
      return 'Something went wrong please try again!';
    }
  };


  const getNftDetails = (_nfts: any[]) => {
    let list = [];
    let data = _nfts.map((item: any) => {
      return {
        ...item.rawMetadata,
        tokenId: item.tokenId,
        tokenType: item.tokenType,
        tokenAddress: item?.contract?.address,
      };
    });
    for (let item of data) {
      let obj = Object.assign({}, item);
      let filePath = item?.image?.replace('ipfs://', '') || item?.imageUrl?.replace('ipfs://', '');
      obj.image = 'https://ipfs.io/ipfs/' + `${filePath}`;
      list.push(obj);
    }
    setNFTS(list);
  };
  const handleCopy = (dataItem) => {
    setCopied(true)
    setCopySelections(dataItem)
    setTimeout(() => setCopied(false), 1000)
  }
  const ownedCopy = (dataItem: any) => {
    setOwnedCopied(true)
    setCopySelections(dataItem)
    setTimeout(() => setOwnedCopied(false), 1000)
  }
  const createdCopy = (dataItem: any) => {
    setCreatedCopied(true)
    setCopySelections(dataItem)
    setTimeout(() => setCreatedCopied(false), 1000)
  }


  return (
    <>
      {errorMsg && (
        <Alert variant="danger" dismissible>
          <p>{errorMsg}</p>
        </Alert>
      )}
      <div className="container cust-container-align">
        <div className='text-center card-mt-pt'>
          <Modal
            show={show}
            className="mycollections-modal"
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header className='justify-content-between'>
              <Modal.Title id="example-custom-modal-styling-title">
                NFT Details
              </Modal.Title>
              <span className="icon close c-pointer" onClick={() => handleModalClose()}></span>
            </Modal.Header>
            <Modal.Body>
              <div className="row mobile-reverse">
                <div className="col-md-12 col-lg-7">
                  {selectedNft ? <>
                    <h2 className="modal-title">
                      {selectedNft.name}
                    </h2></> : <Placeholder animation="glow">
                    <Placeholder xs={7} />
                  </Placeholder>}

                  <div className="row mb-4">
                    {selectedNft ? <>
                      <div className="col-md-4">


                        <p className="modal-text-small">
                          Owned by{' '}
                          <span className="tooltip" data-tip={address}>
                            {address?.slice(0, 4)}...{address?.slice(-4)}
                          </span>
                          <CopyToClipboard
                            text={address}
                            options={{ format: 'text/plain' }}
                            onCopy={() => ownedCopy(address)}
                          >
                            <span className={!ownedCopied ? 'icon md copy-icon c-pointer ms-0' : 'icon md check-icon'} />
                          </CopyToClipboard>
                        </p>


                      </div>
                      {/* <div className="col-md-8">

                        
                          <p className="modal-text-small">
                            Created by{' '}
                            <span className="text-purple-color">
                              {' '}
                              {address?.slice(0, 4)}...{address?.slice(-4)}
                            </span>
                            <CopyToClipboard
                              text={address}
                              options={{ format: 'text/plain' }}
                              onCopy={() => createdCopy(address)}
                            >
                              <span className={!createdCopied ? 'icon md copy-icon c-pointer ms-0' : 'icon md check-icon'} />
                            </CopyToClipboard>
                          </p>


                      </div> */}
                    </> : <Placeholder animation="glow">
                      <Placeholder xs={7} />
                    </Placeholder>}

                  </div>
                  <div className="mb-5">
                   
                    {selectedNft ? <>
                      <h3 className="modal-sub-title">Description</h3>
                      <p className="modal-common-text mb-0">{selectedNft.description}</p></> : <Placeholder animation="glow">
                      <Placeholder xs={7} />
                    </Placeholder>}

                  </div>

                  <div className="modal-details">
                    {selectedNft.attributes?.length > 0 && <>
                      {selectedNft.attributes && (
                        <>
                          <p className="modal-common-text properties-title">Properties</p>
                          <div className="d-flex">
                            {selectedNft.attributes?.map((prop: any) => (
                              <div className="properties-box">
                                <p className="">{prop.trait_Type}</p>
                                <p>{prop.value}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}</>}
                   
                    {selectedNft ? <>
                      <p className="details-label mb-2 copy-width">Details</p>
                      <div className="row first-row">
                        <div className="col-md-4 col-sm-2 properties-align">
                          <label>Token ID</label>
                          <p className='mb-0'>{selectedNft.tokenId}</p>
                        </div>
                        <div className="col-md-4 col-sm-2 properties-align">
                          <label>Token Standard</label>
                          <p className='mb-0'>{selectedNft.tokenType}</p>
                        </div>
                        <div className="col-md-4 col-sm-2 properties-align">
                          <label>Chain</label>
                          <p className='mb-0'>Polygon</p>
                        </div>
                        <div className="col-md-12 col-sm-2 properties-align" >
                          <label >Contract Address</label>
                          <div className='address-content'>
                            <span className='nft-address'>
                              {selectedNft.tokenAddress}
                            </span>
                            <CopyToClipboard
                              text={selectedNft.tokenAddress}
                              options={{ format: 'text/plain' }}
                              onCopy={() => handleCopy(selectedNft.tokenAddress)}
                            >
                              <span className={!copied ? 'icon md copy-icon c-pointer ms-0' : 'icon md check-icon'} />
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div></> : <Placeholder animation="glow">
                      <Placeholder xs={7} />
                    </Placeholder>}

                  </div>
                </div>
                <div className="col-md-12 col-lg-5">

                  {selectedNft ? <div className="image-bgcard">
                    <div>
                      <Image
                        width={300}
                        height={500}
                        src={selectedNft.image || aboutimgone}
                        // src={author}
                        className="modal-img"
                        alt=""
                      />
                    </div>
                  </div> : <div className="image-bgcard">
                    <Placeholder animation="glow">
                      <Placeholder xs={7} className="shimmer-img" />
                    </Placeholder>
                  </div>}



                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="text-end">
                <Button type="button" className="border-btn m-0 text-center btn-cancel" onClick={() => handleModalClose()}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <div className="my-collections-sec ">
           

            
            <h3 className='text-center detailview-title'>MY Collections</h3>
            <hr className='my-collection-hr' />
            
          </div>
          <div className="collection-cards cust-card-alignment">
            {loading ? (
              <div className='loading-overlay'><div className="text-center image-container">
               
                <Image
                  className=""
                  src={loadimg}
                  alt=""
                />
              </div></div>
            ) : (
              <>
                {<>
                  {nfts?.length < 0 ? <div className="image-bgcard">
                    <Placeholder animation="glow">
                      <Placeholder xs={7} className="carosel-img shimmer-collect" />
                      <Placeholder xs={12} />
                    </Placeholder>
                  </div> : <> {nfts?.map((item: any) => (
                    <>
                      {item.image && item?.name && (
                        <div className="image-bgcard c-pointer m-20" onClick={() => handleModal(item)}>
                          <div>
                            <>
                              <>
                                <Image
                                  width={300}
                                  height={100}
                                  src={item?.image?.includes('undefined') ? aboutimgone : item?.image}
                                  className="carosel-img"
                                  alt=""
                                />
                              </>
                            </>
                          </div>
                          <h4 className="card-text">
                            {item?.name}
                          </h4>
                        </div>
                      )}
                    </>
                  ))}
                    {nfts?.length === 0 && !loading && (
                      <div className="text-center" style={{ flex: '1' }}>
                        <img src={nodata} style={{ width: '95px' }}></img>
                        <h1 className='mt-2' style={{ color: '#000', flex: '100%', fontSize: '22px' }} >
                          No Collections Found
                        </h1></div>
                    )} </>}
                </>}
               

              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
