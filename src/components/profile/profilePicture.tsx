import React, { useContext, useState } from "react";
import defaultAvathar from "../../assets/images/default-avatar.jpg";
import { apiUploadPost } from "../../utils/api";
import { store } from "../../store";
import { setUserID } from "../../reducers/rootReducer";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";

const ProfilePicture = ({ profile, updateProfile }) => {
  const {setErrorMessage,setToaster}:OutletContextModel=useContext(outletContext)
  const [loader, setLoader] = useState(false);
  const handleUpload = (event: any, type: any) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      uploadToServer(file,event);
    }
  };

  const uploadToServer = async (
    file: any,
    event
  ) => {
    const body: any = new FormData();
    setLoader(true);
    let fileType = {
      "image/png": true,
      "image/jpg": true,
      "image/jpeg": true,
      "image/PNG": true,
      "image/JPG": true,
      "image/JPEG": true,
    };
    body.append("file", file);
    if (fileType[file?.type]) {
      try {
        const response = await apiUploadPost(
          `Upload/UploadFileNew/${profile.id}`,
          body
        );
        if (response.statusText.toLowerCase() === "ok") {
          setErrorMessage?.("");
          let updatedProfile = { ...profile };
          updatedProfile.profilePicUrl = response.data[0];
          updateProfile(updatedProfile);
          setToaster?.("Profile picture update successful!");
          store.dispatch(setUserID(updatedProfile));
        } else {
          setErrorMessage?.(response);
        }
      } catch (error) {
        setErrorMessage?.(error);
      } finally {
        setLoader(false);
      }
    } else {
      setErrorMessage?.(
        "File is not allowed. Please upload only jpg, png, jpeg files!"
      );
      event.target.value='';
      window.scrollTo(0, 0);
      setLoader(false);
    }
  };
  return (
    <div className="relative profile-size md:w-40 xl-4 hover:opacity-80">
      {loader && (
        <div className="animate-pulse space-x-4">
          <div className="w-40 h-40 mx-auto rounded-full bg-slate-200  max-w-md"></div>
        </div>
      )}
      {!loader && (
        <div className="avatar">
          <div className="md:w-40 md:h-40 rounded-full">
            <img
              className="h-full w-full object-cover"
              src={
                profile?.profilePicUrl || profile?.imageUrl || defaultAvathar
              }
              alt={profile?.firstName}
            />
          </div>
        </div>
      )}
      <span className="icon camera cam-position cursor-pointer">
        <input
          type="file"
          name="myImage"
          className="opacity-0 w-[26px] cursor-pointer"
          onChange={(e) => handleUpload(e, "profile")}
        />
      </span>
    </div>
  );
};

export default ProfilePicture;
