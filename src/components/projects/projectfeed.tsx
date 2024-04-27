import React from 'react';
import NoDataFound from '../../ui/nodatafound';

const ProjectFeed = (props) => {

    return (
        <>
            {props.pjctFeed?.introductionHtml ?

                <div
                    className="detail-table"
                    dangerouslySetInnerHTML={{ __html: props.pjctFeed?.introductionHtml }}
                ></div> :
                <NoDataFound />
            } 

        </>
    );


};

export default ProjectFeed;