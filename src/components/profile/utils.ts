import { validateContentRule, emailValidation,validateUrl,acceptOnlyAlphabets,acceptAlphaNumbericSpecialCharacters } from "../../utils/validation";
import { ProfileModel } from "./models";
export const validateForm = (form: ProfileModel) => {
  const {
    firstName,
    lastName,
    phoneNo,
    email,
    countryCode,
    country,
    discordId,
    facebook,
    linkedIn,
    twitter,
    websiteUrl,
    discordUrl,
  } = form;
  const errors: ProfileModel = {};
  const validateField = (
    field: string,
    fieldName: string,
    required = true,
    validationFunc?: (value: string) => boolean,
    errorMessage?: string
  ) => {
    if (required && (!field || field === "")) {
      errors[fieldName] = "Is required";
    } else if (validationFunc?.(field)) {
      errors[fieldName] = errorMessage || `Invalid ${fieldName.toLowerCase()}`;
    }
  };
  validateField(
    firstName?.trim() || "",
    "firstName",
    true,
    (value: string) => acceptAlphaNumbericSpecialCharacters(value),
    "Invalid first name"
  );
  validateField(
    firstName?.trim() || "",
    "firstName",
    true,
    (value: string) => value?.length<3,
    "First name must be 3 characters or above"
  );
  validateField(
    lastName?.trim() || "",
    "lastName",
    true,
    (value: string) => acceptAlphaNumbericSpecialCharacters(value),
    "Invalid last name"
  );
  validateField(
    lastName?.trim() || "",
    "lastName",
    true,
    (value: string) => value?.length<3,
    "Last name must be 3 characters or above"
  );
  validateField(
    phoneNo || "",
    "phoneNo",
    true,
    (value: string) =>
      validateContentRule(value) || value.length < 6 || value.length > 12,
    "Invalid phone number"
  );
  validateField(
    email || "",
    "email",
    true,
    (value: string) => emailValidation(value),
    "Invalid email address"
  );
  validateField(
    countryCode || "",
    "countryCode",
    true,
    undefined,
    "Is required"
  );
  validateField(country || "", "country", true, undefined, "Is required");
  validateField(
    discordId || "",
    "discordId",
    false,
    (value: string) => validateContentRule(value),
    "Invalid discord Id"
  );
  if (facebook !== undefined && facebook !== '' && facebook !==null) {
    validateField(
      facebook,
      "facebook",
      false,
      (value: string) => validateUrl(value),
      "Please provide valid content for Facebook"
    );
  }
  if (linkedIn !== undefined && linkedIn !== '' && linkedIn!==null) {
      validateField(
        linkedIn,
        "linkedIn",
        false,
        (value: string) => validateUrl(value),
        "Please provide valid content for Instagram"
      );
  }
  if (twitter !== undefined && twitter !== '' && twitter !==null) {
      validateField(
        twitter,
        "twitter",
        false,
        (value: string) => validateUrl(value),
        "Please provide valid content for Twitter"
      );
  }
  if (websiteUrl !== undefined && websiteUrl !== '' && websiteUrl !==null) {
      validateField(
        websiteUrl,
        "websiteUrl",
        false,
        (value: string) => validateUrl(value),
        "Please provide valid content for Website"
      );
  }
  if (discordUrl !== undefined && discordUrl !== '' && discordUrl !==null) {
      validateField(
        discordUrl,
        "discordUrl",
        false,
        (value: string) => validateUrl(value),
        "Please provide valid content for Discord Link"
      );
  }
  return errors;
};

export const isErrorDispaly = (objValue: any) => {
  if (objValue?.data && typeof objValue?.data === "string") {
    return objValue.data;
  } else if (
    objValue?.response.data &&
    objValue?.response.data.title &&
    typeof objValue?.response.data.title
  ) {
    return objValue?.response.data.title;
  } else if (
    objValue?.originalError &&
    typeof objValue?.originalError.message === "string"
  ) {
    return objValue?.originalError.message;
  } else {
    return "Something went wrong please try again!";
  }
};
