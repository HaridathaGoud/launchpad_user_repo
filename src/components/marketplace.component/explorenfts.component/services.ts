import apiCalls from "../../../utils/api";
export const saveViews = async (obj: any) => {
  const response = await apiCalls.postMarketplace(`User/SaveViewer`, obj);
  if (response.status === 200) {
    return { status: "ok", error: null };
  } else {
    return { status: null, error: apiCalls.isErrorDispaly(response) };
  }
};

export const saveFavorite = async (obj: any) => {
  const response = await apiCalls.postMarketplace(`User/SaveFavorite`, obj);
  if (response.status === 200) {
    return { status: "ok", error: null };
  } else {
    return { status: null, error: apiCalls.isErrorDispaly(response) };
  }
};
