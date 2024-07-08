import React from 'react';
import NoDataFound from '../../../ui/noData';

const ProjectFeed = (props) => {

    return (
        <>
            {props.pjctFeed?.introductionHtml ?

                <div
                    className="detail-table dark-textwhite text-sm text-neutral"
                    dangerouslySetInnerHTML={{ __html: props.pjctFeed?.introductionHtml }}
                ></div> :
                <NoDataFound />
            } 

        </>
    );


};

export default ProjectFeed;