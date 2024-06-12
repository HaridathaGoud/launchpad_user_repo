import React, { useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
import ProfileShimmer from "../loaders/profileShimmer";
import Button from "../../ui/Button";
import ProfileView from "./view";
import ProfileEdit from "./edit";
import ProfilePicture from "./profilePicture";
import { ProfileModel } from "./models";
import { initialState, profileReducer } from "./reducers";
import ProfileTabs from "./profileTabs";
import { getKyc } from "../../utils/api";
import { setUserID } from "../../reducers/rootReducer";
import { store } from "../../store";
import { setError } from "../../reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const rootDispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const { arcanaUser, user } = useSelector((store: any) => store.auth);
  const [state, dispatch] = useReducer(profileReducer, initialState);
  useEffect(() => {
    if (address) {
      getCustomerDetails();
    }
  }, [address, isConnected]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setProfileInfo(user,arcanaUser);
  }, [user, arcanaUser]); // eslint-disable-line react-hooks/exhaustive-deps
  const setProfileInfo = (user:any,arcanaUser:any) => {
    let profile = user ? { ...user } : { ...state.profileInfo };
    if (arcanaUser?.isLoggedIn) {
      profile = { ...profile, email: arcanaUser.email };
    }
    dispatch({ type: "setProfileInfo", payload: profile });
  };
  const getCustomerDetails = async () => {
    dispatch({ type: "setLoader", payload: true });
    if (address) {
      try {
        let res = await getKyc(`User/CustomerDetails/${address}`);
        if (res.statusText.toLowerCase() === "ok") {
          store.dispatch(setUserID(res.data));
          dispatch({ type: "setProfileInfo", payload: res.data });
        } else {
          rootDispatch(setError({ message: res }));
        }
      } catch (error) {
        rootDispatch(setError({ message: error }));
      } finally {
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
    <>
      {state.loader && <ProfileShimmer />}
      {!state.loader && (
        <div className="container mx-auto px-3 lg:px-0 md:mt-5 max-sm:mt-3">
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
        </div>
      )}
    </>
  );
};

export default Profile;
