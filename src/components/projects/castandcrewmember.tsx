import React from "react";
import styles from "./projectdetails.module.css";
import member from "../../assets/images/dao-profile.png";
import { Link } from "react-router-dom";
import nodata from "../../assets/images/no-data.png";

const CastAndCrewMember = (props) => {
  return (
    <div
      className={`md:gap-4 flex gap-6 items-start overflow-x-auto`}
    >
      {props.castCrewsData?.map((item, index) =>
        index < 4 ? (
          <div className="lg:w-[140px] break-words shrink-0	" key={item.image}>
            {" "}
            <div
              className={`relative w-20 h-20 mx-auto overflow-hidden rounded-full mb-3`}
            >
              <img
                src={item.image ? item.image : member}
                className={`rounded-full h-full w-full object-cover`}
                alt=""
              />
            </div>
            <p className={`text-base font-normal  text-secondary text-center`}>
              {item.name}
            </p>
            <p className={`text-info text-base font-normal text-center`}>
              as {item.role}
            </p>
          </div>
        ) : (
          ""
        )
      )}

      {props.castCrewsData?.length !== 0 && (
        <Link to={`/castcrewsmembersview/${props.pjctId}`}>
          <div
            className={`bg-secondary w-20 h-20 rounded-full shrink-0 flex items-center justify-center cursor-pointer`}
          >
            <div className={`text-center`}>
              <span className={`icon ${styles.rightArrow}`}></span>
              <p className={`text-base-100 text-xs font-normal`}>View All</p>
            </div>
          </div>
        </Link>
      )}
      {props.castCrewsData?.length === 0 && (
        <div className="text-center flex-1">
          <img width={95} className="mx-auto" src={nodata} alt="No Data" />
          <p className="text-secondary text-center mt-2">No data found</p>
        </div>
      )}
    </div>
  );
};

export default CastAndCrewMember;
