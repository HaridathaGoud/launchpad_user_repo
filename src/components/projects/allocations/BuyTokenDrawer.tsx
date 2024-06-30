import React from 'react'
import Spinner from '../../loaders/spinner';
import Button from '../../../ui/Button';

export const BuyTokenDrawer = (props:any) => {
  const handleClose=()=>{
    if(props.isBuying){
      return;
    }
    props.handleDrawerActions(false, null)
  }
  return (
    <div className="drawer drawer-end">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            checked={props.shouldOpenDrawer}
          />
          <div className="drawer-content"></div>
          <div className="drawer-side z-[999]">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={handleClose}
            ></label>
            <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl text-secondary font-medium">Buy Now</h4>
                <Button
                 type='plain'
                  handleClick={handleClose}
                  btnClassName="icon close"
                ></Button>
              </div>

              {props.drawerStep === 1 && (
                <>
                  {" "}
                  <div className="mt-10">
                    <div className="mt-10">
                      <label
                        htmlFor="amount"
                        className="text-dark text-sm font-normal p-0 mb-2 label ml-4"
                      >
                        Enter Token Count To Buy{" "}
                        <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Token Count To Buy"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        id="amount"
                        defaultValue={props.buyAmount}
                        maxLength={20}
                        autoComplete="off"
                        style={{ color: "black" }}
                        onChange={(e) => props.handleAmount(e)}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                  {props.amountError && (
                    <div>
                      <div>
                        <span className="text-[red] ml-5">
                          {props.amountError}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="mt-8 flex justify-end gap-4">
                    <Button
                      type="cancel"
                      btnClassName=""
                      handleClick={() => props.handleDrawerActions(false, null)}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="secondary"
                      btnClassName="min-w-[150px]"
                      handleClick={props.handleBuyToken}
                    >
                      {props.isBuying && <Spinner />} Ok
                    </Button>
                  </div>
                </>
              )}

              {props.drawerStep === 2 && (
                <>
                  <div className="mt-10">
                    <p className="text-secondary text-lg font-medium">
                      Are you really sure you want to buy {props.buyAmount}{" "}
                      tokens?
                    </p>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      type="cancel"
                      handleClick={() => props.handleDrawerActions(false, null)}
                    >
                      {" "}
                      Cancel
                    </Button>
                    <Button
                      type="secondary"
                      btnClassName="flex gap-2"
                      handleClick={() => props.handleOk()}
                      disabled={props.isBuying}
                    >
                      <span>{props.isBuying && <Spinner />} </span> Confirm
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
  )
}
