import React, {useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { getKyc } from "../../utils/api";
import Moment from "react-moment";
import { setError } from "../../reducers/layoutReducer";
import { useDispatch } from "react-redux";
import KycShimmer from "../marketplace.component/loaders/kycshimmer";

const KycDetails = ({ kycStatus, id }) => {
  const navigate = useNavigate();
  const rootDispatch=useDispatch()
  const [userDetails, setUserDetails] = useState<any>(null);
  const [identityDetails, setIdentityDetails] = useState<any>(null);
  const [identityDetailsLoader,setIdentityDetailsLoader]=useState(false)
  const shouldLog = useRef(true);
  useEffect(() => {
    if (id && shouldLog.current) {
      shouldLog.current = false;
      getCustomerKycDetail(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomerKycDetail = async (id: any) => {
    try {
      setIdentityDetailsLoader(true)
      let response = await getKyc(`Sumsub/getKYCInformation/${id}`);
      if (response.statusText.toLowerCase() === "ok") {
        setUserDetails(response.data);
        setIdentityDetailsLoader(false)
        let products = response.data.idTypes;
        const result = products?.reduce((acc, obj) => {
          const key = obj.idType;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
        const tableData = result ? Object.entries(result) : null;
        setIdentityDetails(tableData);
      } else {
        setIdentityDetailsLoader(false)
        rootDispatch(setError({message:response}))
      }
    } catch (error) {
      setIdentityDetailsLoader(false)
      rootDispatch(setError({message:error}))
    }
  };
  const navigateToKyc = () => {
    navigate("/completeKyc");
  };
  if (
    kycStatus?.toLowerCase() === "init" ||
    kycStatus?.toLowerCase() === "rejected" ||
    kycStatus === null
  ) {
    return (
      <div className="">
        <h4 className="font-semibold text-lg text-secondary mt-[26px]">KYC Details</h4>
        <p className="text-sm text-secondary font-normal mt-1">
          KYC not yet completed, Please click below button to update KYC details
        </p>
        <div className="mb-3 mt-3">
          <Button
            btnClassName=""
            handleClick={navigateToKyc}
            type="primary"
            disabled={kycStatus?.toLowerCase() === "completed"}
          >
            {kycStatus?.toLowerCase() === "completed"
              ? "KYC Completed"
              : "Complete Your KYC"}
          </Button>
        </div>
      </div>
    );
  }
  if (
    kycStatus?.toLowerCase() !== "completed" &&
    kycStatus?.toLowerCase() !== "pending"
  ) {
    return <h4 className="text-center">No Data</h4>;
  }
  return (
    <>
      <div className="">
        <h2 className="font-semibold text-lg text-secondary mb-4">Personal</h2>
        {
          <>
          {identityDetailsLoader && <><KycShimmer/></>}
            {userDetails && (
              <>
                <div className="grid md:grid-cols-4 mb-4">
                  <div className="col">
                    <p className="text-sm font-normal text-secondary opacity-[0.9]">
                      First Name{" "}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-medium text-sm text-secondary">
                      {userDetails?.firstName || "--"}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 mb-4">
                  <div className="">
                    <p className="text-sm font-normal text-secondary opacity-[0.9]">
                      Last Name
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-medium text-sm text-secondary">
                      {userDetails?.lastName || "--"}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 mb-4">
                  <div className="">
                    <p className="text-sm font-normal text-secondary opacity-[0.9]">
                      Email
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-medium text-sm text-secondary">
                      {userDetails?.email || "--"}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 mb-4">
                  <div className="">
                    <p className="text-sm font-normal text-secondary opacity-[0.9]">
                      Phone No
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-medium text-sm text-secondary">
                      {userDetails?.phoneNo || "--"}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 mb-4">
                  <div className="">
                    <p className="text-sm font-normal text-secondary opacity-[0.9]">
                      Date Of Birth
                    </p>
                  </div>

                  <div className="md:col-span-3">
                    <p className="font-medium text-sm text-secondary">
                      {userDetails?.dob ? <Moment format="DD/MM/YYYY">
                        {userDetails?.dob }
                      </Moment> : "--"}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 mb-4">
                  <div className="">
                    <p className="text-sm font-normal text-secondary opacity-[0.9]">
                      Country
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-medium text-sm text-secondary">
                      {userDetails?.country || "--"}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 mb-4">
                  <div className="">
                    <p className="text-sm font-normal text-secondary opacity-[0.9]">
                      Discord ID
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-medium text-sm text-secondary">
                      {userDetails?.discordId || "--"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        }
      </div>

     {identityDetails && <div className="">
        <h2 className="font-semibold text-lg text-secondary mb-3">
          Identification Documents
        </h2>
        <div className="grid lg:grid-cols-5 gap-4">
          {identityDetails?.map(([idType, items]) => (
            <div className="" key={idType}>
              <p className="text-sm font-normal text-secondary opacity-[0.9] mb-1">
                {idType === "PASSPORT" && "Passport"}
                {idType === "SELFIE" && "Selfie"}
                {idType === "DRIVERS" && "Driver's License"}
                {idType === "ID_CARD" && "ID Card"}
                {idType === "RESIDENCE_PERMIT" && "Residence Permit"}
              </p>
              <div className="">
                {items?.map((item: any) => (
                  <div
                    className={`${
                      item?.idType === "SELFIE" ? "avatar" : ""
                    } w-full overflow-hidden rounded-xl mt-2`}
                    key={item.idType}
                  >
                    <div
                      className={`w-full md:h-64 rounded-xl max-sm:h-64  ${
                        item?.idType === "SELFIE"
                          ? ""
                          : "flex items-center bg-slate-300"
                      }`}
                    >
                      <img
                        className={`${
                          item?.idType === "SELFIE"
                            ? "object-cover rounded-xl max-sm:h-64"
                            : "object-contain max-sm:h-64"
                        }`}
                        src={item?.url}
                        alt={item.idType}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>}
    </>
  );
};

export default KycDetails;
