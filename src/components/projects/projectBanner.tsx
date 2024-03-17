import React from 'react';
import defaultbannerimg from '../../assets/images/default-bg.png';

function ProjectBanner(props: any) {
    return (
            <div className="">
                {props.bannerImage && <div className="avatar w-full">
                    <div className={`w-full rounded-[15px] h-[380px]`}>
                        <img className='object-cover h-full w-full' src={props.bannerImage || defaultbannerimg} alt='project'/>
                    </div>
                </div>}
            </div>
  );
}

export default ProjectBanner;
