import React, { useEffect, useState } from 'react';
import { get } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../reducers/layoutReducer';
import Projectscomponent from './projectsComponent';
import NoDataFound from '../../ui/noData';
import { guid } from '../../utils/constants';
const pageNo = 1;
const pageSize = 3
const ProjectCardComponent = (props:any) => {
    const rootDispatch = useDispatch()
    const user = useSelector((state: any) => state?.auth?.user);
    const [loader, setLoader] = useState(false);
    const [cardSeeMoreHide, setCardSeeMoreHide] = useState<boolean>(false);
    const [cardDetails, setCardDetails] = useState<any>();
    const loaderMessage = "No data found"

    useEffect(() => {
        getPrjectCardDetails(pageNo, pageSize, null)
    }, [user?.id]);

    const getPrjectCardDetails = async (
        pageNo: number,
        pageSize: number,
        search: any
    ) => {
        setLoader(true)
        setCardSeeMoreHide(false);
        try{
            let details = cardDetails ? { ...cardDetails } : {};
            const skip = pageNo * pageSize - pageSize;
            let OpenPrjctsresponse = await get(`User/Projects/${"Ongoing"}/${pageSize}/${skip}/${search}/${user?.id || guid}`);
            let upcomingPrjctsresponse = await get(`User/Projects/${"Upcoming"}/${pageSize}/${skip}/${search}/${user?.id || guid}`);
            let closedPrjctsresponse = await get(`User/Projects/${"Ended"}/${pageSize}/${skip}/${search}/${user?.id || guid}`);
    
            if (OpenPrjctsresponse.status === 200) {
                details = { ...details, OpenIvos: OpenPrjctsresponse.data };
            } else {
                rootDispatch(setError({ message: OpenPrjctsresponse }))
            }
            if (upcomingPrjctsresponse.status === 200) {
                details = { ...details, UpcomingIvos: upcomingPrjctsresponse.data };
            } else {
                rootDispatch(setError({ message: upcomingPrjctsresponse }))
            }
            if (closedPrjctsresponse.status === 200) {
                details = { ...details, EndedIvos: closedPrjctsresponse.data };
            } else {
                rootDispatch(setError({ message: closedPrjctsresponse }))
            }
            setCardDetails(details);
        }catch(error){
            rootDispatch(setError({ message: error }))
        }finally{
            setLoader(false)
        }
        
    };

    return (
        <>
            {(!loader && cardDetails?.OpenIvos?.length === 0 && cardDetails?.UpcomingIvos?.length === 0 && cardDetails?.EndedIvos?.length === 0 && props.from!=='dashBoard') &&
                <NoDataFound text ={loaderMessage}/>}
            {(loader || cardDetails?.OpenIvos?.length > 0 || cardDetails?.UpcomingIvos?.length > 0 || cardDetails?.EndedIvos?.length > 0) && <>
                <Projectscomponent pjctType="Ongoing" pageSize="3" showBreadcrumb={false} from={props?.from || 'projects'} 
                    loader={loader}
                    cardSeeMoreHide={cardSeeMoreHide}
                    loaderMessage={loaderMessage}
                    loadData={false}
                    cardDetails={cardDetails?.OpenIvos} />
                <Projectscomponent pjctType="Upcoming" pageSize="3" showBreadcrumb={false} from={props?.from || 'projects'} 
                    loader={loader}
                    cardSeeMoreHide={cardSeeMoreHide}
                    loaderMessage={loaderMessage}
                    loadData={false}
                    cardDetails={cardDetails?.UpcomingIvos} />
                <Projectscomponent pjctType="Closed" pageSize="3" showBreadcrumb={false} from={props?.from || 'projects'}
                    loader={loader}
                    cardSeeMoreHide={cardSeeMoreHide}
                    loaderMessage={loaderMessage}
                    loadData={false}
                    cardDetails={cardDetails?.EndedIvos} />
            </>}

        </>);

}
export default ProjectCardComponent
