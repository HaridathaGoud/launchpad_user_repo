import React from 'react';
import Projectscomponent from './projectsComponent';

export default function Project() {
  return (
    <div className="container mx-auto max-sm:px-3 mt-3">
      <Projectscomponent pjctType="Ongoing" pageSize="3" showBreadcrumb={true}/>
      <Projectscomponent pjctType="Upcoming" pageSize="3" showBreadcrumb={true} />
      <Projectscomponent pjctType="Closed" pageSize="3" showBreadcrumb={true} />
  </div>
  );
}
