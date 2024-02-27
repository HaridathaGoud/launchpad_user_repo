import React, { useContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
import ProfileInfoShimmer from "../loaders/Profileshimmers";
import Button from "../../ui/Button";
import ProfileView from "./view";
import ProfileEdit from "./edit";
import ProfilePicture from "./profilePicture";
import { ProfileModel} from "./models";
import { initialState, profileReducer } from "./reducers";
import ProfileTabs from "./profileTabs";
import { getKyc } from "../../utils/api";
import { setUserID } from "../../reducers/rootReducer";
import { store } from "../../store";
import OutletContextModel from "../../layout/context/model";
import outletContext from "../../layout/context/outletContext";

const Profile = () => {
  const { setErrorMessage }: OutletContextModel = useContext(outletContext);
  const { isConnected, address } = useAccount();
  const [state, dispatch] = useReducer(profileReducer, initialState);
  useEffect(() => {
    if (address) {
      getCustomerDetails();
    }
  }, [address]);// eslint-disable-line react-hooks/exhaustive-deps
  const getCustomerDetails = async () => {
    dispatch({ type: "setLoader", payload: true });
    if (address) {
      try {
        let res = await getKyc(`User/CustomerDetails/${address}`);
        if (res.statusText.toLowerCase() === "ok") {
          store.dispatch(setUserID(res.data));
          dispatch({ type: "setProfileInfo", payload: res.data });
        } else {
          setErrorMessage?.(res);
        }
      } catch (error) {
        setErrorMessage?.(error);
      }
      finally{
        dispatch({ type: "setLoader", payload: false });
      }
    }
  };
  const handleEditProfile = () => {
    dispatch({ type: "setEditProfileDrawer", payload: true });
  };
  if (!isConnected) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <div className="container mx-auto max-sm:px-3 md:mt-5 max-sm:mt-3">
      {state.loader && <ProfileInfoShimmer />}
      {!state.loader && (
        <>
          <form>
            <div>
              <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4">
                <div className="col">
                  {
                    <ProfilePicture
                      updateProfile={(obj: ProfileModel) =>
                        dispatch({ type: "setProfileInfo", payload: obj })
                      }
                      profile={state.profileInfo}
                    />
                  }
                  <div className="mt-4 max-sm:text-center">
                    <Button
                      type="secondary"
                      handleClick={handleEditProfile}
                      btnClassName="w-ful xl:w-48"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>

                <ProfileView profile={state.profileInfo} address={address} />
              </div>
              <hr className="bg-[#D9D9D9] my-6" />
              <ProfileTabs
                kycStatus={state.profileInfo.kycStatus}
                id={state.profileInfo.id}
              />
            </div>
          </form>
          {state.editProfileDrawer && (
            <ProfileEdit
              isChecked={state.editProfileDrawer}
              profile={state.profileInfo}
              updateProfile={(obj: ProfileModel) =>
                dispatch({ type: "setProfileInfo", payload: obj })
              }
              address={address}
              closeDrawer={(state: boolean) =>
                dispatch({ type: "setEditProfileDrawer", payload: state })
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
