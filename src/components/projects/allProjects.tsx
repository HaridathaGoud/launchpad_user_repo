import React from 'react'
import {  useParams } from 'react-router-dom';
import Projectscomponent from './projectsComponent';

const AllProjects = () => {
  const params=useParams()

  
  return (
    <div className='container mx-auto max-sm:px-3 md:mt-3 lg:mt-6'>
   
  <Projectscomponent pageSize="9" pjctType={params.type}/>
              
  </div>
  )
}

export default AllProjects