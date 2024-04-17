import React, {useEffect, useRef, useState } from "react";
import { get } from "../../utils/api";
import ProjectInformationShimmer from "../loaders/dashboard/projectInformation";
import { useDispatch } from "react-redux";
import { setError } from "../../reducers/layoutReducer";

const ProjectInformation = () => {
  const rootDispatch=useDispatch()
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
      } else {
        rootDispatch(setError({message:response}))
      }
    } catch (error) {
      rootDispatch(setError({message:error}))
    } finally {
      setLoader(false);
    }
  };
  const formatDetailValue = (name: string, value: number): string => {
    if (name === "PROJECTS VOLUME") {
      if (Number.isInteger(value)) {
        return `${value}+`;
      } else {
        const suffix = Math.abs(value) > 999999 ? "M" : "";
        return `${value}M${suffix}`;
      }
    } else {
      const prefix = name === "RAISED CAPITAL" ? "$" : "";
      const suffix = Number.isInteger(value) ? "+" : "M";
      return `${prefix}${value}${suffix}`;
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
                {formatDetailValue(detail.name, detail.value)}
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
