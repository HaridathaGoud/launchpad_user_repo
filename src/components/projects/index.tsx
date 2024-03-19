import React from 'react';
import Projectscomponent from './projectsComponent';
import BreadCrumb from '../../ui/breadcrumb';

export default function Project() {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-3">
      <BreadCrumb/>
      <Projectscomponent pjctType="Ongoing" pageSize="3" showBreadcrumb={false}/>
      <Projectscomponent pjctType="Upcoming" pageSize="3" showBreadcrumb={false} />
      <Projectscomponent pjctType="Closed" pageSize="3" showBreadcrumb={false} />
  </div>
  );
}
