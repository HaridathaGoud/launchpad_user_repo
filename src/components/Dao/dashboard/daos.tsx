import React, {useEffect, useReducer } from "react";
import DaoCardShimmer from "../shimmers/daodashboard";
import apiCalls from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";

const reducers = (state: any, action: any) => {
  switch (action.type) {
    case "initialData":
      return { ...state, initialData: action.payload };
    case "pageNo":
      return { ...state, pageNo: action.payload };
    case "loader":
      return { ...state, loader: action.payload };
    case "hideButton":
      return { ...state, hideButton: action.payload };
  }
};
function DaoCards(props: any) {
  const [state, dispatch] = useReducer(reducers, {
    initialData: [],
    pageNo: 2,
    loader: false,
    hideButton: false,
  });
  const rootDispatch=useDispatch()
  const take = 8;
  useEffect(() => {
    dispatch({ type: "initialData", payload: props?.daoData?.data || [] });
    if (props?.daoData?.data?.length < take) {
      dispatch({ type: "hideButton", payload: true });
    }
  }, [props?.daoData]);

  const fetchMoreData = () => {
    dispatch({ type: "pageNo", payload: state?.pageNo + 1 });
    const skip = state.pageNo * take - take;
    getDaoCardDetails(take, skip);
  };
  const getDaoCardDetails = async (take: number, skip: number) => {
    try {
      dispatch({ type: "loader", payload: true });
      const response = await apiCalls.getDaoDetails(take, skip);
      if (response) {
        dispatch({ type: "loader", payload: false });
        dispatch({
          type: "initialData",
          payload: [...state?.initialData, ...response?.data],
        });
        if (response.data.length < take) {
          dispatch({ type: "hideButton", payload: true });
        }
      } else {
        dispatch({ type: "loader", payload: false });
      }
    } catch (error) {
      rootDispatch(setError({message:error}))
      dispatch({ type: "loader", payload: false });
    }
  };
  return (
    <div>
      <div className="container mx-auto max-sm:px-3 mt-4">
        <h5 className="font-semibold text-2xl text-secondary">DAO’s</h5>

        <div className="grid md:grid-cols-4 gap-4">
          {props.loading || state?.loader ? (
            [...Array(4)].map((_, index) => (
              <div key={index}>
                <DaoCardShimmer />
              </div>
            ))
          ) : (
            <>
              {state?.initialData?.map((item: any) => (
                <>
                  <div
                    className="shadow rounded mt-md-0 mt-3 sm-m-0 cursor-pointer rounded-lg transform transition-transform duration-500 hover:scale-[1.03]"
                    onClick={() => props?.goToHome(item)}
                  >
                    <img
                      src={item?.image}
                      className="w-full rounded-t-lg h-[350px] object-cover"
                      alt={item?.name || 'Dao'}
                    />
                    <div className="p-2 rounded-b-lg">
                      <div className="text-base font-normal text-secondary !mb-0">
                        <span className="text-base-200 text-base font-semibold">
                          Name:
                        </span>{" "}
                        {item?.name}
                      </div>
                      <div className="text-base font-normal text-secondary mb-1">
                        <span className="text-base-200 text-base font-semibold">
                          {" "}
                          Members:
                        </span>{" "}
                        {item?.members?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
        <div className="text-center mt-4">
          {state?.loader && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {!state.hideButton && (
            <div>
              <span
                onClick={fetchMoreData}
                className="cursor-pointer text-base text-primary font-semibold"
              >
                See More
              </span>
              <span
                onClick={fetchMoreData}
                className="mx-auto block icon see-more cursor-pointer mt-[-4px]"
              ></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DaoCards;
