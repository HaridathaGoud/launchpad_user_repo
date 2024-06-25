            {/* place a bid drawer end  */}
            {/* buy now drawer start  */}
            {/* <form className="drawer drawer-end">
              <input
                id="placebid"
                type="checkbox"
                className="drawer-toggle"
                checked={false}
                // onChange={() => closeDrawer(!isChecked)}
              />
              <div className="drawer-side z-[999]">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                  // onChange={handleDrawerClose}
                ></label>
                <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg text-dark font-semibold mb-4">
                      Place a Bid
                    </h2>
                    <span className="icon close cursor-pointer"></span>
                  </div>

                  <form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => placeBid(e)}
                  >
                    <div className="flex gap-5 items-center mt-10">
                      <img
                        className="w-[112px] h-[112px] object-cover rounded-[15px]"
                        src={thorntf}
                        alt="nft-image"
                      />
                      <div className="">
                        <p className="truncate text-[28px] text-secondary font-semibold leading-8 mb-0">
                          Thor’s Hammer
                        </p>

                        <p className="truncate text-secondary opacity-60 font-semibold text-xl leading-6 mb-0">
                          Current Price
                        </p>
                        <p className="truncate text-secondary text-[22px] font-semibold leading-[26px] mb-0">
                          0.003 Matic
                        </p>
                      </div>
                    </div>

                    <div className="mt-60 lg:max-w-[300px] lg:mx-auto mb-5">
                      <Button
                        btnClassName="w-full mb-4 !min-h-[39px]"
                        type="replyCancel"
                        handleClick={handleCloseBid}
                      >
                        Place A Bid
                      </Button>
                      <Button
                        btnClassName="w-full !min-h-[39px] lg:px-3"
                        type="primary"
                        disabled={btnLoader}
                      >
                        <span>{btnLoader && <Spinner size="sm" />} </span>
                        Own with 0.003Matic / $1.32
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </form> */}
            {/* buy now drawer end  */}


            {errorMsg && (
                // <Alert variant="danger">
                //   <Image className='validation-error' src={validError} />
                //   <span>{errorMsg}</span>
                // </Alert>
                <div className="cust-error-bg">
                  <div className="mr-4">
                    <img src={error} alt="" />
                  </div>
                  <div>
                    <p className="error-title error-red">Error</p>
                    <p className="error-desc">{errorMsg}</p>
                  </div>
                </div>
              )}
              {placeABidError && (
                <div className="cust-error-bg">
                  <div className="mr-4">
                    <img src={error} alt="" />
                  </div>
                  <div>
                    <p className="error-title error-red">Error</p>
                    <p className="error-desc">{placeABidError}</p>
                  </div>
                </div>
              )}
              {metaConnectionError && (
                // <Alert variant="danger">
                //   <Image className='validation-error' src={validError} />
                //   <span>{metaConnectionError}</span>
                // </Alert>
                <div className="cust-error-bg">
                  <div className="mr-4">
                    <img src={error} alt="" />
                  </div>
                  <div>
                    <p className="error-title error-red">Error</p>
                    <p className="error-desc">{metaConnectionError}</p>
                  </div>
                </div>
              )}
              {successMsg && (
                // <Alert role="alert">
      
                //   <Image className='validation-error' src={validSuccess} />
                //   <span>{successMsg && 'Bid successful'}</span>{' '}
                // </Alert>
                <div className="cust-error-bg">
                  <div className="mr-4">
                    <img src={successimg} alt="" />
                  </div>
                  <div>
                    <p className="error-title">Congratulations !</p>
                    <p className="error-desc">{successMsg && "Bid successful"}</p>
                  </div>
                </div>
              )}




              const handleClose = () => {
                // setShow(false);
                modalActions("putonsale", "close");
                modalActions("putonauction", "close");
                setIsChecked(false);
                setSaleErrorMsg(false);
                setShowBuyModal(false);
                setSaveObj({
                  tokenId: "",
                  customerId: "",
                  value: 0,
                  crypto: "",
                  saleType: "",
                });
              };


              const getPlaceABid = async () => {
                let response = await getMarketplace(`User/nfttype/${nftId}`);
                if (response) {
                  setisPutOnAction(response.data.isPutOnAuction);
                  setisPutOnSale(response.data.isPutOnSale);
                }
              };
              const [putanAction, setisPutOnAction] = useState(null);
              const [putanSale, setisPutOnSale] = useState(null);