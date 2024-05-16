import React, { useEffect, useState } from "react";
import styles from '../projectdetails.module.css';
import member from '../../../../src/assets/images/default-nft.png';
import { useDispatch } from "react-redux";
import { get } from "../../../utils/api";
import { setError } from "../../../reducers/layoutReducer";
import { ProjecViewFoundingmembersShimmer } from "../../loaders/projects/projecViewFoundingmembersShimmer";
import { Link } from "react-router-dom";
import NoDataFound from "../../../ui/nodatafound";
import CopyToClipboard from "react-copy-to-clipboard";


const FoundingMember = (props) => {
  const [copied, setCopied] = useState("");
  const rootDispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleCopy = (address) => {
    setCopied(address);
    setTimeout(() => setCopied(""), 1000);
  };

  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    setLoader(true);
    try {
      const founders = await get("User/stakers/" + props.projectId);
      if (founders.status === 200) {
        setData(founders.data);
        setLoader(true);
      } else {
        rootDispatch(setError({ message: founders }));
        setLoader(true);
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
      setLoader(true);
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      {loader && (
        <ProjecViewFoundingmembersShimmer/>
      )}
      {!loader && (
        <div className={`md:gap-4 flex gap-6 items-start overflow-x-auto`}>
          {data?.stakersData?.map((item, index) =>
            index < 4 ? (
              <div
                className="lg:w-[140px] break-words shrink-0 text-center"
                key={item.walletAddress}
              >
                <div className={`relative w-20 h-20 mx-auto mb-3 `}>
                  <img
                    src={item.image ? item.image : member}
                    className={`rounded-full h-full w-full object-cover`}
                    alt={`${"founding member"}`}
                  />
                  {/* <span className={` text-base-100 text-xs font-semibold inline-flex items-center justify-center w-6 h-6 bg-primary rounded-[50%] text-center absolute right-[-5px] bottom-0.5 border border-white`}>3%</span> */}
                </div>
                <p
                  className={`text-base font-normal  text-secondary text-center`}
                >
                  {item.userName || "--"}
                </p>
                <p
                  className={`text-base font-semibold text-secondary text-center`}
                >
                  {item.walletAddress?.slice(0, 4) +
                    "...." +
                    item.walletAddress?.substring(
                      item.walletAddress.length - 4,
                      item.walletAddress.length
                    )}
                  <CopyToClipboard
                    text={item.walletAddress}
                    options={{ format: "text/plain" }}
                    onCopy={() => handleCopy(item.walletAddress)}
                  >
                    <span
                      className={
                        copied !== item.walletAddress
                          ? "icon md copy-icon cursor-pointer ms-0 ml-[4px]"
                          : "icon md check-icon ml-[4px]"
                      }
                    />
                  </CopyToClipboard>
                </p>
              </div>
            ) : (
              ""
            )
          )}

          {props.foundingmemsData?.stakersData?.length !== 0 && (
            <Link
              to={`/projects/${props?.projectName}/${props?.projectId}/foundingmembers`}
            >
              <div
                className={`bg-base-content w-20 h-20 rounded-full shrink-0 flex items-center justify-center cursor-pointer `}
              >
                <div className={`text-center`}>
                  <span className={`icon ${styles.rightArrow}`}></span>
                  <p className={`text-base-100 text-xs font-normal`}>
                    View All
                  </p>
                </div>
              </div>
            </Link>
          )}
          {props.foundingmemsData?.stakersData?.length === 0 && <NoDataFound />}
        </div>
      )}
    </>
  );
};

export default FoundingMember;
