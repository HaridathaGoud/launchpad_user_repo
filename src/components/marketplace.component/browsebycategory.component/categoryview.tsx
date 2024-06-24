import React from 'react';
import BreadCrumb from '../../../ui/breadcrumb';
import Nfts from '../../nfts.component'
import { useParams } from 'react-router-dom';
export default function CategoryView() {
  const params = useParams();
  return (

      <div className="max-sm:px-3 md:mt-5 px-4 container mx-auto">
       <BreadCrumb/>
       <h1 className='text-2xl text-secondary font-semibold'>Browse by category</h1>
        <Nfts type="browse by categeory" categeoryName={params?.categeoryName}/>
        </div>

  );
}
