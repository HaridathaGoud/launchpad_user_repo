import React from 'react';
import nodata from '../../assets/images/no-data.png';

const ProjectFeed = (props) => {

    return (
        <>
            {props.pjctFeed?.introductionHtml ?

                <div
                    className="detail-table"
                    dangerouslySetInnerHTML={{ __html: props.pjctFeed?.introductionHtml }}
                ></div> :
                <div className="text-center mt-6">
                    <img width={120} className='mx-auto' src={nodata} />
                    <p className="text-secondary text-center">No data found</p>
                </div>
            } 

        </>
    );


};

export default ProjectFeed;