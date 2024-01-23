interface ProfileModel{
    id?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNo?: string;
    country?: string;
    countryCode?: string;
    profilePicUrl?: string;
    walletAddress?: any;
    status?: string,
    imageUrl?: string;
    kycStatus?: string;
    discordId?:string;
    referralCode?:string;
}

interface ProfileStateModel{
    profileInfo:ProfileModel,
    loader:boolean,
    editProfileDrawer:boolean,
}

interface EditProfileStateModel{
    formData:ProfileModel,
    formErrors:ProfileModel,
    buttonLoader:boolean,
}
export {ProfileModel,ProfileStateModel,EditProfileStateModel}