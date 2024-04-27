import React from "react";
import nodata from '../assets/images/no-data.png';

const NoDataFound = (props) => {
    let text = props.text || "No data found";
    return (<>
        <div className="text-center">
            <img width={95} className="mx-auto" src={nodata} />
            <p className="text-secondary text-center mt-2">{text}</p>
        </div>
    </>)
}
export default NoDataFound