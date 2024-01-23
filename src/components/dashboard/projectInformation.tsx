import React, { useContext, useEffect, useRef, useState } from "react";
import { get } from "../../utils/api";
import ProjectInformationShimmer from "../loaders/dashboard/projectInformation";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";

const ProjectInformation = () => {
  const  {errorMessage,setErrorMessage}:OutletContextModel=useContext(outletContext)
  const [loader, setLoader] = useState(false);
  const [projectDetails, setProjectDetails] = useState<any[]>([]);
  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getProjectDetails();
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const getProjectDetails = async () => {
    setLoader(true);
    try {
      let response = await get("/User/getProjectsdetails");
      if (response.statusText.toLowerCase() === "ok") {
        setProjectDetails(response.data);
        errorMessage && setErrorMessage?.("");
      } else {
        setErrorMessage?.(response);
      }
    } catch (error) {
      setErrorMessage?.(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="mt-[26px]">
      {loader && <ProjectInformationShimmer />}
      {!loader && (
        <div className="grid md:grid-cols-4 gap-4 max-sm:grid-cols-2">
          {projectDetails?.map((detail) => (
            <div
              className="md:border-r last:border-none md:px-6 px-3"
              key={detail.name + detail.value}
            >
              <div>
                <h3 className="text-secondary font-semibold text-[32px]">
                  {Number.isInteger(detail.value)
                    ? `${detail.value}+`
                    : `$${detail.value}M${
                        Math.abs(detail.value) > 999999 ? "M" : ""
                      }`}
                </h3>
                <p className="text-primary font-medium capitalize">
                  {detail.name.toLowerCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectInformation;
