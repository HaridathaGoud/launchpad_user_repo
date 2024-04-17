import { ProfileStateModel } from "./models";

export const initialState: ProfileStateModel = {
  profileInfo: {
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    country: "",
    countryCode: "",
    profilePicUrl: "",
    walletAddress: "",
    status: "",
    imageUrl: "",
    kycStatus: "",
    discordId: "",
    referralCode: "",
    facebook:"",
    linkedIn:"",
    twitter:"",
    websiteUrl:"",
    discordUrl:"",

  },
  loader: false,
  editProfileDrawer: false,
};

export const profileReducer = (state=initialState, action) => {
  switch (action.type) {
    case "setProfileInfo":
      state = { ...state, profileInfo: action.payload };
      break;
    case "setEditProfileDrawer":
      state = { ...state, editProfileDrawer: action.payload };
      break;
    case "setLoader":
      state = { ...state, loader: action.payload };
      break;
    default:
      state = { ...state };
  }
  return state;
};

export const editProfileReducer = (state, action) => {
  switch (action.type) {
    case "setFormData":
      state = { ...state, formData: action.payload };
      break;
    case "setFormErrors":
      state = { ...state, formErrors: action.payload };
      break;
    case "setButtonLoader":
      state = { ...state, buttonLoader: action.payload };
      break;
    default:
      state = { ...state };
  }
  return state;
};
