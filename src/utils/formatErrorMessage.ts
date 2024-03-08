import { isErrorDispaly } from "./errorHandling";
const formatErrorMessage = (error: any, from: any) => {
  if (error && typeof error !== "string" && !from) {
    return isErrorDispaly(error);
  }
  if (error && from === "contract") {
    return (
      error?.details ||
      error?.cause?.reason ||
      error?.message ||
      error.fault ||
      error
    );
  }
  return error;
};

export default formatErrorMessage;
