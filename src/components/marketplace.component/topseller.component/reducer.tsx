export interface DashboardStateModel {
    currentIndex: number;
}
export const dashboardState = {
    currentIndex: 0
};

export const topsellerreducer = (state = dashboardState, action) => {
    switch (action.type) {
        case "setCurrentIndex":
            state = { ...state, currentIndex: action.payload };
            break;
        default:
            state = { ...state };
    }
    return state;
};