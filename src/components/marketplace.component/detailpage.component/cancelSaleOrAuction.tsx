import React, { useState } from "react";
import Button from "../../../ui/Button";
import { postMarketplace } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import Spinner from "../../loaders/spinner";

const CancelSaleOrAuction = ({
  show,
  setShow,
  type,
  nftId,
  nftDetails,
  refresh,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState("");
  const onCancel = async () => {
    setIsLoading("cancel");
    try {
      const obj = {
        nftId: nftId,
        currentOwnerId: nftDetails?.ownerId,
        saleType: type,
      };
      let response = await postMarketplace(`User/CancelSale`, obj);
      if (
        response.status === 200 ||
        response.statusText.toLowerCase() === "ok"
      ) {
        dispatch(setToaster({ message: `${type} cancel successful!` }));
        setShow(false);
        refresh();
      } else {
        dispatch(setError({ message: response }));
      }
    } catch (error) {
      dispatch(setError({ message: error }));
    } finally {
      setIsLoading("");
    }
  };
  return (
    <form className="drawer drawer-end">
      <input
        id="cancelSaleOrAuction"
        type="checkbox"
        className="drawer-toggle"
        checked={show}
        onChange={() => setShow(false)}
        disabled={isLoading !== ""}
      />
      <div className="drawer-side z-[999]">
        <label
          htmlFor="cancelSaleOrAuction"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
          <div className="flex items-center justify-between">
            <p className="text-xl text-secondary font-semibold">Confirmation</p>
            <Button
              type="plain"
              handleClick={() => setShow(false)}
              disabled={isLoading !== ""}
            >
              <span className="icon close cursor-pointer"></span>
            </Button>
          </div>

          <div>
            <p className="text-dark my-8">
              Are you sure, Do you want to cancel {type}?
            </p>
          </div>

          <div className="mt-20 lg:w-[350px] lg:mx-auto mb-5">
            <Button
              type="replyCancel"
              handleClick={() => setShow(false)}
              btnClassName="w-full mb-4 !min-h-[39px]"
              disabled={isLoading !== ""}
            >
              No
            </Button>
            <Button
              type="primary"
              handleClick={() => onCancel()}
              btnClassName="w-full !h-[32px] !min-h-[39px] lg:px-3"
              disabled={isLoading !== ""}
            >
              <span>
                {isLoading !== "" && (
                  <Spinner size="loading-sm" spinnerClass="text-base-100" />
                )}{" "}
              </span>{" "}
              Yes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CancelSaleOrAuction;
