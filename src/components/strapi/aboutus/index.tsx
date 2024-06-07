import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom
import Button from '../../../ui/Button';
import abstract1 from '../../../assets/images/about-abstarct1.svg'
import abstract2 from '../../../assets/images/about-abstarct2.svg'
import yellowellipse from '../../../assets/images/yellow-ellipse.svg'
import blueellipse from '../../../assets/images/blue-ellipse.svg'
import VisitUs from '../../visitus';

function AboutUs() {
  const [postDetails, setPost] = useState([]);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:1337/api/aboutpages?populate=*');
        const response = await fetch('https://wonderful-baseball-df5acc8ae6.strapiapp.com/api/aboutpages?populate=*');
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
        //  const obj =  data.data.filter((item) =>{
        //     return item?.id === parseInt(params?.id)
        //   })
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  console.log('postDetails',postDetails);

  return (
    <div>
      {postDetails?.data?.map((item) => (<>
        <div className="bg-[#E7F4FA] bg-about relative">
          <div className='container mx-auto grid md:grid-cols-2 items-center px-3 lg:px-0'>
            <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.abouttitle} <span className='text-primary'>{item.attributes.primarytitle}</span> {item.attributes.suffixtitle} </h1>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.ybDescription}</p>
              <div className="flex gap-16 my-6">
                <div>
                  <h1 className='text-[48px] font-semibold text-secondary'>{item.attributes.expvalue}</h1>
                  <p className='text-base font-medium text-primary'>{item.attributes.explabel}</p>
                </div>
                <div>
                  <h1 className='text-[48px] font-semibold text-secondary'>{item.attributes.devvalue}</h1>
                  <p className='text-base font-medium text-primary'>{item.attributes.devlabel}</p>
                </div>
              </div>
              <Button type='primary' children={item.attributes.contact.Title} btnClassName='md:w-[160px]' />
              <Button type='cancel' children={item.attributes.knowmore.Title} btnClassName='ml-4 md:w-[160px] whitespace-nowrap' />
            </div>
            <div>
              <img src={item.attributes.bannerimg.data.attributes.url} alt="" width='' className='md:w-[564px] ml-auto' />
            </div>
          </div>
          <img src={abstract1} alt="" className='absolute bottom-[-180px]' />
          <img src={abstract2} alt="" className='absolute right-0 top-56' />
        </div>
        <div className='relative pt-16 px-3 lg:px-0'>
          <div className='grid lg:grid-cols-2 items-center container mx-auto'>
            <div>
              <span className='inline-block bg-primary h-1 w-[54px] mb-7'></span>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.ybs} <span className='text-primary'>{item.attributes.custom}</span> {item.attributes.sstitle} </h1>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.Description}</p>
            </div>
            <div className='lg:absolute mt-4 lg:mt-0 right-0 top-16 lg:w-[600px] bg-primary-content blockchain-shadow px-14 py-7'>
              <div className="md:flex items-center gap-10">
                <img src={item.attributes.bcimg.data.attributes.url} alt="" className='w-[91px] mb-2 md:mb-0' />
                <div>
                  <h1 className='text-secondary text-xl font-medium'>{item.attributes.bctitle}</h1>
                  <p className='text-base text-base-200 font-normal'>{item.attributes.bcdesc}</p>
                </div>
              </div>
              <div className="md:flex items-center gap-10 my-10">
                <img src={item.attributes.fsimg.data.attributes.url} alt="" className='mb-2 md:mb-0' />
                <div>
                  <h1 className='text-secondary text-xl font-medium'>{item.attributes.fstitle}</h1>
                  <p className='text-base text-base-200 font-normal'>{item.attributes.fsdesc}</p>
                </div>
              </div>
              <div className="md:flex items-center gap-10">
                <img src={item.attributes.ssimg.data.attributes.url} alt="" className='mb-2 md:mb-0' />
                <div>
                  <h1 className='text-secondary text-xl font-medium'>{item.attributes.sstitle}</h1>
                  <p className='text-base text-base-200 font-normal'>{item.attributes.ssdesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className='pt-48 container mx-auto'>
            <h1 className='text-[40px] font-semibold text-secondary text-center mb-8'>{item.attributes.chooseyb} <span className='text-primary'>YellowBlock</span>? </h1>
            <div className='grid lg:grid-cols-3 gap-4 px-3 lg:px-0'>
              <div className='border border-[#E8E7E7] rounded-2xl py-6 px-9 bg-primary-content choose-shadow'>
                <img src={item.attributes.visionimg.data.attributes.url} alt="" />
                <h1 className='my-3 text-secondary text-xl font-bold'>{item.attributes.visiontitle}</h1>
                <p className='text-base text-base-200 font-normal'>{item.attributes.visiondesc}</p>
              </div>
              <div className='border border-[#E8E7E7] rounded-2xl py-6 px-9 bg-primary-content choose-shadow'>
                <img src={item.attributes.expertimg.data.attributes.url} alt="" />
                <h1 className='my-3 text-secondary text-xl font-bold'>{item.attributes.exptitle}</h1>
                <p className='text-base text-base-200 font-normal'>{item.attributes.expdesc}</p>
              </div>
              <div className='border border-[#E8E7E7] rounded-2xl py-6 px-9 bg-primary-content choose-shadow'>
                <img src={item.attributes.commitimg.data.attributes.url} alt="" />
                <h1 className='my-3 text-secondary text-xl font-bold'>{item.attributes.committitle}</h1>
                <p className='text-base text-base-200 font-normal'>{item.attributes.commitdesc}</p>
              </div>
            </div>
          </div>
          <img src={yellowellipse} className='absolute top-0 z-[-1] ' alt="" />
          <img src={blueellipse} className='right-0 absolute bottom-[-200px] z-[-1] ' alt="" />
        </div>
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-4 justify-center lg:justify-between container mx-auto mt-16 px-3 lg:px-0">
          <img src={item.attributes.fireblock.data.attributes.url} alt="" />
          <img src={item.attributes.metamask.data.attributes.url} alt="" />
          <img src={item.attributes.web3.data.attributes.url} alt="" />
          <img src={item.attributes.blockfill.data.attributes.url} alt="" />

        </div>
        <div className='pt-16'>
          <VisitUs />
        </div>
      </>

      ))}
    </div>
  );
}

export default AboutUs;