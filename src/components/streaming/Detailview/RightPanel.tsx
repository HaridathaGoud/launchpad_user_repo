import React, { useState } from 'react';

import CommentsComponent from './comments';
import ReviewComponent from './reviews';
import WriteReview from './writereview';
import ReviewSummary from './reviewsummary';
import ReviewSuccess from './reviewsuccess';
import RelatedVideos from '../Dashboard/Relatedvideos';


export default function RightPanel() {

  const [activeTab,setActiveTab]=useState(0)

  return (
    <>
      <div className="border border-[#9AA0A6] rounded-lg  pt-5">
        <div role="tablist" className="tabs tabstyle pb-4">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Comments" checked />
          <div role="tabpanel" className="tab-content pt-10"> <CommentsComponent/></div>

          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Reviews"  />
          <div role="tabpanel" className="tab-content pt-10 px-3">
            {activeTab===0 && <ReviewComponent setActiveTab={setActiveTab}/>}
            {activeTab===1 && <WriteReview setActiveTab={setActiveTab}/>}
            {activeTab===2 && <ReviewSummary setActiveTab={setActiveTab}/>}
            {activeTab===3 &&<ReviewSuccess />}
            </div>

        </div>
         
      </div>
      <RelatedVideos  />
    </>
  );
}
