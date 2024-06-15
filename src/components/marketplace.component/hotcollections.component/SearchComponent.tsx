import React  from 'react';

interface SearchInputComponentProps {
  text: string,
  style: any,
  children?: React.ReactNode 
  numberOfLines?:number,
  fontFamily?:string,
}

const SearchInputComponent = ({ text, style, children,numberOfLines,fontFamily }: SearchInputComponentProps) => {

  return (<>
     <div className='relative xl:w-[42rem] md:w-96 h-[42px]'>
      <input type="text" placeholder="Search Movie, NFT Name,  Category...... " className="rounded-[30px] focus:outline-none input input-bordered w-full xl:w-[42rem] md:w-96 h-[42px] pr-12" />
       <span className='icon search absolute top-[10px] right-[18px] cursor-pointer' />
    </div>
    </>
  );
};

export default SearchInputComponent;
