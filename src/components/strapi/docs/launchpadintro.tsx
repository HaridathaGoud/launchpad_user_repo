import React from "react";

function LaunchpadIntro({ data }) {
  return (
    <div>
      {data?.data?.map((item) => (
        <>
          <div className="">
            <div>
              <h1 className="text-[40px] font-semibold text-secondary">
                {item.attributes.intro.launchpadtitle}
              </h1>
              <ul className="list-disc ml-5 my-4">
                <li> {item.attributes.intro.keypoint1} </li>
                <li> {item.attributes.intro.keypoint2}</li>
              </ul>
              <div className="bg-secondary p-7 rounded-lg  lg:w-[600px]">
                <span className="text-white text-7xl font-semibold">
                  {item.attributes.intro.bgtitle}
                </span>
                <img
                  src={item.attributes.dottlogo.data.attributes.url}
                  alt=""
                  width=""
                  className="inline align-bottom ms-8"
                />
              </div>
              <p className="text-base text-base-200 font-normal mt-6">
                {item.attributes.intro.launchpaddesc1}
              </p>
              <p className="text-base text-base-200 font-normal mt-4">
                {item.attributes.intro.launchpaddesc2}
              </p>
              <p className="text-base text-base-200 font-normal mt-4">
                {item.attributes.intro.launchpaddesc3}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default LaunchpadIntro;
