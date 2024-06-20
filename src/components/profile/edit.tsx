import React, { useMemo, useReducer } from "react";
import Button from "../../ui/Button";
import Spinner from "../loaders/spinner";
import jsonCountryCode from "../../utils/countryCode.json";
import { validateForm } from "./utils";
import { saveUser } from "../../utils/api";
import { editProfileReducer } from "./reducers";
import { EditProfileStateModel } from "./models";
import { store } from "../../store";
import { setUserID } from "../../reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { setError, setToaster } from "../../reducers/layoutReducer";
const ProfileEdit = ({
  isChecked,
  profile,
  updateProfile,
  closeDrawer,
  address,
}) => {
  const { toasterMessage, arcanaUser } = useSelector((store: any) => {
    return {
      toasterMessage: store.layoutReducer.toaster.message,
      arcanaUser: store.auth.arcanaUser,
    };
  });
  const initialState: EditProfileStateModel = useMemo(() => {
    return {
      formData: profile,
      buttonLoader: false,
      formErrors: {},
    };
  }, [profile]);
  const rootDispatch = useDispatch();
  const [state, dispatch] = useReducer(editProfileReducer, initialState);
  const setField = (field: any, value: any) => {
    rootDispatch(setError({ message: "" }));
    if (field === "referralCode" && value.length < 6) {
      rootDispatch(setError({ message: "" }));
    }
    dispatch({
      type: "setFormData",
      payload: { ...state.formData, [field]: value },
    });
    if (state.formErrors[field]) {
      dispatch({
        type: "setFormErrors",
        payload: { ...state.formErrors, [field]: null },
      });
    }
  };

  const handleDrawerClose = () => {
    closeDrawer(false);
    dispatch({ type: "setFormErrors", payload: {} });
    dispatch({ type: "setFormData", payload: { ...profile } });
  };
  const trimField = (field: any) => {
    let value = state.formData[field]?.trim() || '';
    setField(field, value);
};
  const saveDetails = async (event: any) => {
    let isUpdate = true;
    event.preventDefault();
    if (isUpdate) {
      let form = { ...state.formData };
      let obj = {
        id: profile?.id ? profile?.id : "00000000-0000-0000-0000-000000000000",
        userName: form?.userName,
        firstName: form?.firstName,
        lastName: form?.lastName,
        email: form?.email,
        phoneNo: form?.phoneNo,
        country: form?.country,
        discordId: form?.discordId,
        countryCode: form?.countryCode,
        profilePicUrl: form?.profilePicUrl,
        walletAddress: address,
        referralCode: form?.referralCode?.length ? form?.referralCode : null,
        facebook: form?.facebook,
        linkedIn: form?.linkedIn,
        twitter: form?.twitter,
        websiteUrl: form?.websiteUrl,
        discordUrl: form?.discordUrl,
      };
      const formErrors = validateForm(obj);
      if (Object.keys(formErrors).length > 0) {
        dispatch({ type: "setFormErrors", payload: { ...formErrors } });
      } else {
        dispatch({ type: "setButtonLoader", payload: true });
        try {
          let res = await saveUser(`User/SaveUser`, obj);
          if (res.statusText.toLowerCase() === "ok") {
            updateProfile({ ...profile, ...obj });
            store.dispatch(setUserID({ ...profile, ...obj }));
            rootDispatch(
              setToaster({
                message: "Profile Details Update Successful!",
                callback: handleDrawerClose,
                callbackTimeout: 500,
              })
            );
          } else {
            rootDispatch(setError({ message: res }));
          }
        } catch (error) {
          rootDispatch(setError({ message: error }));
        } finally {
          dispatch({ type: "setButtonLoader", payload: false });
        }
      }
    }
  };

  return (
    <form className="drawer drawer-end">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isChecked}
      />
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-20">
          <div className="flex items-center justify-between">
            <p className="text-xl text-secondary font-semibold">Edit Profile</p>
            <button
              className="icon close cursor-pointer"
              onClick={handleDrawerClose}
            ></button>
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileFirstName"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              First Name <span className="text-[red]">*</span>
            </label>
            <input
              id="profileFirstName"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              placeholder="First Name"
              name="firstName"
              maxLength={50}
              value={state.formData?.firstName ? state.formData?.firstName : ""}
              onChange={(e) => {
                setField("firstName", e.target.value);
              }}
              onBlur={() => trimField('firstName')}
              // onBlur={(e) => {
              //   setField(
              //     "firstName",
              //     e.target.value.trim().replace(/\s+/g, " ")
              //   );
              // }}
              required
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.firstName && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.firstName}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileLastName"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Last Name <span className="text-[red]">*</span>
            </label>
            <input
              id="profileLastName"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              placeholder="Last Name"
              name="lastName"
              maxLength={50}
              value={state.formData?.lastName ? state.formData?.lastName : ""}
              onChange={(e) => {
                setField("lastName", e.target.value);
              }}
              onBlur={() => trimField('lastName')}
              // onBlur={(e) => {
              //   setField(
              //     "lastName",
              //     e.target.value.trim().replace(/\s+/g, " ")
              //   );
              // }}
              required
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.lastName && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.lastName}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileEmail"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Email <span className="text-[red]">*</span>
            </label>
            <input
              id="profileEmail"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              name="email"
              maxLength={50}
              value={state.formData?.email || ""}
              onChange={(e) => {
                setField("email", e.target.value);
              }}
              onBlur={(e) => {
                setField("email", e.target.value.trim());
              }}
              required
              placeholder="Email"
              disabled={
                toasterMessage || state.buttonLoader || arcanaUser?.isLoggedIn
              }
            />
            {state.formErrors.email && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.email}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profilePhone"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Phone No <span className="text-[red]">*</span>
            </label>
            <div className="flex">
              <select
                id="profilePhone"
                className="input input-bordered w-32 rounded-[28px] truncate  border-[#A5A5A5] focus:outline-none pl-5 pr-10 rounded-ee-none rounded-se-none h-10 cursor-pointer"
                value={
                  state.formData?.countryCode ? state.formData?.countryCode : ""
                }
                onChange={(e) => {
                  setField("countryCode", e.target.value);
                }}
                disabled={toasterMessage || state.buttonLoader}
              >
                <option value={""} className="cursor-pointer">
                  Select
                </option>
                {jsonCountryCode.map((item) => (
                  <option
                    key={item.name + item.phone_code}
                    value={
                      item.phone_code.includes("+")
                        ? item.phone_code
                        : `+${item.phone_code}`
                    }
                    className="cursor-pointer"
                  >
                    {item.iso3}{" "}
                    {item.phone_code.includes("+")
                      ? item.phone_code
                      : `+${item.phone_code}`}{" "}
                  </option>
                ))}
              </select>
              <input
                className="input !rounded-ss-none !rounded-es-none input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-5 h-10"
                type="text"
                name="phoneNo"
                maxLength={12}
                value={state.formData?.phoneNo ? state.formData?.phoneNo : ""}
                onChange={(e) => {
                  if (/\D/g.test(e.target.value)) return;
                  setField("phoneNo", e.target.value);
                }}
                required
                placeholder="Phone number"
                disabled={toasterMessage || state.buttonLoader}
              />
            </div>
            {state.formErrors.countryCode && state.formErrors.phoneNo ? (
              <span className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.phoneNo}
              </span>
            ) : (
              <>
                {state.formErrors.countryCode && (
                  <span className="text-sm font-normal text-red-600 ml-4">
                    Country Code {state.formErrors.countryCode.toLowerCase()}
                  </span>
                )}
                {state.formErrors.phoneNo && (
                  <span className="text-sm font-normal text-red-600 ml-4">
                    {state.formErrors.phoneNo}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileCountry"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Country <span className="text-[red]">*</span>
            </label>
            <select
              id="profileCountry"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10 cursor-pointer"
              aria-label="Default select example"
              value={state.formData?.country ? state.formData?.country : ""}
              onChange={(e) => {
                setField("country", e.target.value);
              }}
              disabled={toasterMessage || state.buttonLoader}
            >
              <option value={""} className="cursor-pointer">
                Select Country
              </option>
              {jsonCountryCode.map((item) => (
                <option
                  key={item.name + item.iso3 + item.phone_code}
                  className="cursor-pointer"
                >
                  {item.name}
                </option>
              ))}
            </select>

            {state.formErrors.country && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.country}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileDiscordId"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Discord ID
            </label>
            <input
              id="profileDiscordId"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              value={state.formData?.discordId ? state.formData?.discordId : ""}
              onChange={(e) => {
                setField("discordId", e.target.value);
              }}
              onBlur={(e) => {
                setField(
                  "discordId",
                  e.target.value.trim().replace(/\s+/g, " ")
                );
              }}
              required
              placeholder="Discord ID"
              maxLength={50}
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.discordId && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.discordId}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profilefacebook"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              FaceBook Link
            </label>
            <input
              id="profilefacebook"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              value={state.formData?.facebook ? state.formData?.facebook : ""}
              onChange={(e) => {
                setField("facebook", e.target.value);
              }}
              onBlur={(e) => {
                setField(
                  "facebook",
                  e.target.value.trim().replace(/\s+/g, " ")
                );
              }}
              required
              placeholder="FaceBook Link"
              maxLength={50}
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.facebook && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.facebook}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileInsta"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Instagram Link
            </label>
            <input
              id="profileInsta"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              value={state.formData?.linkedIn ? state.formData?.linkedIn : ""}
              onChange={(e) => {
                setField("linkedIn", e.target.value);
              }}
              onBlur={(e) => {
                setField(
                  "linkedIn",
                  e.target.value.trim().replace(/\s+/g, " ")
                );
              }}
              required
              placeholder="Instagram Link"
              maxLength={50}
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.linkedIn && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.linkedIn}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileTwitter"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Telegram Link
            </label>
            <input
              id="profileTwitter"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              value={state.formData?.twitter ? state.formData?.twitter : ""}
              onChange={(e) => {
                setField("twitter", e.target.value);
              }}
              onBlur={(e) => {
                setField("twitter", e.target.value.trim().replace(/\s+/g, " "));
              }}
              required
              placeholder="Telegram Link"
              maxLength={50}
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.twitter && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.twitter}
              </label>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="profileDiscordId"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Website Link
            </label>
            <input
              id="profileWebsite"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              value={
                state.formData?.websiteUrl ? state.formData?.websiteUrl : ""
              }
              onChange={(e) => {
                setField("websiteUrl", e.target.value);
              }}
              onBlur={(e) => {
                setField(
                  "websiteUrl",
                  e.target.value.trim().replace(/\s+/g, " ")
                );
              }}
              required
              placeholder="Website Link"
              maxLength={50}
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.websiteUrl && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.websiteUrl}
              </label>
            )}
          </div>
          {/* as of now we hided discord link field */}
          {/* <div className="mt-4">
            <label
              htmlFor="profileDiscord"
              className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block"
            >
              Discord Link
            </label>
            <input
              id="profileDiscord"
              className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              type="text"
              value={state.formData?.discordUrl ? state.formData?.discordUrl : ""}
              onChange={(e) => {
                setField("discordUrl", e.target.value);
              }}
              onBlur={(e) => {
                setField(
                  "discordUrl",
                  e.target.value.trim().replace(/\s+/g, " ")
                );
              }}
              required
              placeholder="Discord Link"
              maxLength={50}
              disabled={toasterMessage || state.buttonLoader}
            />
            {state.formErrors.discordUrl && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {state.formErrors.discordUrl}
              </label>
            )}
          </div> */}
          {/* <div className="mt-4 relative" >
                <label className='text-dark text-sm font-normal p-0 mb-2 label ml-4'>Referral Code</label>
                <input className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 disabled:bg-accent disabled:border-accent'
                  type="text"
                  value={form?.referralCode}
                      placeholder="Referral Code"
                      maxLength={6}
                    onChange={(e) => { setField('referralCode', e.target.value) }}
                      disabled={profile?.referralCode !=null }

                />
                {!touched?.isReferral &&
              <span className='text-primary text-sm absolute bottom-[-22px] right-3'
              onClick={() => getIsExistingReferralCOde()}>
              <span>{referralloader && <Spinner className='text-sm-100' size="sm" />} </span> Verify
              </span>}
              </div> */}

          <div className="text-end gap-4 flex justify-center mt-16">
            <div>
              <Button
                type="cancel"
                btnClassName="min-w-[164px]"
                handleClick={handleDrawerClose}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                type="secondary"
                btnClassName="flex gap-2 min-w-[164px] justify-center"
                handleClick={(e) => saveDetails(e)}
                disabled={toasterMessage || state.buttonLoader}
              >
                <span>{state.buttonLoader && <Spinner />} </span> Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;
