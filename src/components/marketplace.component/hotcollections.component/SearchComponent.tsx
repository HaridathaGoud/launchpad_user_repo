import React  from 'react';

interface SearchInputComponentProps {
  text: string,
  style: any,
  children?: React.ReactNode 
  numberOfLines?:number,
  fontFamily?:string,
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchIcon: () => void;
  search: string;
}

const SearchInputComponent = ({ text, style, children,numberOfLines,fontFamily,handleSearch,handleChange,handleSearchIcon,search }: SearchInputComponentProps) => {

  return (<>
     <div className='relative xl:w-[42rem] md:w-96 h-[42px]'>
      <input type="text" placeholder="Search Movie, NFT Name,  Category...... " className="rounded-[30px] focus:outline-none input input-bordered w-full xl:w-[42rem] md:w-96 h-[42px] pr-12" 
      onKeyDown={handleSearch}
      onChange={handleChange}      
      value={search}/>
       <span className='icon search absolute top-[10px] right-[18px] cursor-pointer' onClick={handleSearchIcon}/>
    </div>
    </>
  );
};

export default SearchInputComponent;
