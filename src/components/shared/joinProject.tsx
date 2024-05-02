import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../reducers/layoutReducer";
import Button from "../../ui/Button";
import { isErrorDispaly } from "../../utils/errorHandling";
import { useAccount } from "wagmi";
import { post } from "../../utils/api";
import Spinner from "../loaders/spinner";
const JoinProject = ({ projectDetails,buttonClass,statusClass,buttonType,projectStatus }) => {
  const user = useSelector((state: any) => state?.auth?.user);
  const { isConnected } = useAccount();
  const rootDispatch = useDispatch();
  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState("");
  useEffect(() => {
    if (projectDetails?.isCustomerInterested) {
      setIsJoined(true);
    }
  }, [projectDetails]);
  const handleJoinProject = async () => {
    setIsJoining(projectDetails?.id);
    try {
      const request = {
        projectId: projectDetails?.id,
        customerId: user?.id,
      };
      const response = await post("User/SaveInterests", request);
      if (
        response.statusText?.toLowerCase() === "ok" ||
        response.status === 200
      ) {
        setIsJoined(projectDetails?.id);
      } else {
        rootDispatch(setError({ message: isErrorDispaly(response) }));
      }
    } catch (error) {
      rootDispatch(setError({ message: isErrorDispaly(error) }));
    } finally {
      setIsJoining("");
    }
  };
  const isClosed=useMemo(()=>{
    return projectStatus?.toLowerCase()==='ended' || projectStatus?.toLowerCase()==='closed'
  },[projectStatus])
  return (<>
 {isConnected && user.id && <div key={projectDetails?.id}>
      {!isJoined && !isClosed && (
        <Button
          key={projectDetails?.id}
          type={buttonType || "primary"}
          handleClick={handleJoinProject}
          btnClassName={`${buttonClass} block !min-h-[36px] !h-[36px] !p-0`}
        >
            {isJoining===projectDetails?.id && <span><Spinner size={'loading-sm'} spinnerClass={"mr-1 align-sub"} /></span>}
          <span>Join</span>
        </Button>
      )}
      {isJoined &&
        <p className={statusClass}>Joined</p>}
    </div>}
  </> 
  );
};

export default JoinProject;
