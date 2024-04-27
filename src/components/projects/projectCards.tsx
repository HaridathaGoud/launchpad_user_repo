import React, { useEffect, useState } from 'react';
import { get } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setError } from '../../reducers/layoutReducer';
import Projectscomponent from './projectsComponent';
import NoDataFound from '../../ui/nodatafound';

const ProjectCardComponent = () => {
    const rootDispatch = useDispatch()
    const pageNo = 1;
    const pageSize = 3
    const pjctTypes = { Ongoing: "Ongoing", Upcoming: "Upcoming", Closed: "Ended" };
    const [loader, setLoader] = useState(false);
    const [cardSeeMoreHide, setCardSeeMoreHide] = useState<boolean>(false);
    const [cardDetails, setCardDetails] = useState<any>();
    const loaderMessage = "No data found"

    useEffect(() => {
        getProjectsDetails()
    }, []);

    const getProjectsDetails = () => {
        getPrjectCardDetails(pageNo, pageSize, pjctTypes, null);
    }
    const getPrjectCardDetails = async (
        pageNo: number,
        pageSize: number,
        type: any,
        search: any
    ) => {
        setLoader(true);
        setCardSeeMoreHide(false);
        let details = cardDetails ? { ...cardDetails } : {};
        const skip = pageNo * pageSize - pageSize;
        let OpenPrjctsresponse = await get(`User/Projects/${"Ongoing"}/${pageSize}/${skip}/${search}`);
        let upcomingPrjctsresponse = await get(`User/Projects/${"Upcoming"}/${pageSize}/${skip}/${search}`);
        let closedPrjctsresponse = await get(`User/Projects/${"Ended"}/${pageSize}/${skip}/${search}`);

        if (OpenPrjctsresponse.status === 200) {
            details = { ...details, OpenIvos: OpenPrjctsresponse.data };
            setLoader(false);
        } else {
            rootDispatch(setError({ message: OpenPrjctsresponse }))
            setLoader(false);
        }
        if (upcomingPrjctsresponse.status === 200) {
            details = { ...details, UpcomingIvos: upcomingPrjctsresponse.data };
            setLoader(false);
        } else {
            rootDispatch(setError({ message: upcomingPrjctsresponse }))
            setLoader(false);
        }
        if (closedPrjctsresponse.status === 200) {
            details = { ...details, EndedIvos: closedPrjctsresponse.data };
            setLoader(false);
        } else {
            rootDispatch(setError({ message: closedPrjctsresponse }))
            setLoader(false);
        }
        setCardDetails(details);
    };

    return (
        <>
            {(!loader && cardDetails?.OpenIvos?.length === 0 && cardDetails?.UpcomingIvos?.length === 0 && cardDetails?.EndedIvos?.length === 0) &&
                <NoDataFound text ={loaderMessage}/>}
            {(loader || cardDetails?.OpenIvos?.length > 0 || cardDetails?.UpcomingIvos?.length > 0 || cardDetails?.EndedIvos?.length > 0) && <>
                <Projectscomponent pjctType="Ongoing" pageSize="3" showBreadcrumb={false} showpjctType={true}
                    loader={loader}
                    cardSeeMoreHide={cardSeeMoreHide}
                    loaderMessage={loaderMessage}
                    loadData={false}
                    cardDetails={cardDetails?.OpenIvos} />
                <Projectscomponent pjctType="Upcoming" pageSize="3" showBreadcrumb={false} showpjctType={true}
                    loader={loader}
                    cardSeeMoreHide={cardSeeMoreHide}
                    loaderMessage={loaderMessage}
                    loadData={false}
                    cardDetails={cardDetails?.UpcomingIvos} />
                <Projectscomponent pjctType="Closed" pageSize="3" showBreadcrumb={false} showpjctType={true}
                    loader={loader}
                    cardSeeMoreHide={cardSeeMoreHide}
                    loaderMessage={loaderMessage}
                    loadData={false}
                    cardDetails={cardDetails?.EndedIvos} />
            </>}

        </>);

}
export default ProjectCardComponent
