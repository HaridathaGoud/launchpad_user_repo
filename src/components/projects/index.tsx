import React from 'react';
import BreadCrumb from '../../ui/breadcrumb';
import ProjectCardComponent from './projectCards';

export default function Project() {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-3">
      <BreadCrumb/>
      <ProjectCardComponent />
  </div>
  );
}
