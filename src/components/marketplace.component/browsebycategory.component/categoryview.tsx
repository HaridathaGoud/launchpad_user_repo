import React from 'react';
import BreadCrumb from '../../../ui/breadcrumb';
import  CollectionItems  from '../hotcollections.component/CollectionItems';

export default function CategoryView() {

  return (
   
      <div className="max-sm:px-3 md:mt-5 px-4 container mx-auto">
       <BreadCrumb/>
       <h1 className='text-2xl text-secondary font-semibold'>Browse by category</h1>
        <CollectionItems />
        </div> 
    
  );
}
