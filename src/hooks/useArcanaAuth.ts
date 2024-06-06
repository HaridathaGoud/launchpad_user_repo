import { useEffect, useState } from "react";
import { auth } from "../appConfig";
import { useSelector } from "react-redux";

const useArcanaAuth = () => {
  const [authInfo, setAuthInfo] = useState<any>(auth ||{});
  useEffect(() => {
      setAuthInfo(auth);
  },[auth]);
  return authInfo;
};

export default useArcanaAuth;
