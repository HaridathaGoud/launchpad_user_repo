import React from 'react';

interface SearchInputComponentProps {
  text: string;
  style: any;
  children?: React.ReactNode;
  numberOfLines?: number;
  fontFamily?: string;
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchIcon: () => void;
  search: string;
  placeholdertext?: string;
  searchWidth:any;
}

const SearchInputComponent: React.FC<SearchInputComponentProps> = ({
  text,
  style,
  children,
  numberOfLines,
  fontFamily,
  handleSearch,
  handleChange,
  handleSearchIcon,
  search,
  placeholdertext,searchWidth,
}) => {
  const defaultPlaceholder = 'Search NFT Name,  Category......';
  const placeholder = placeholdertext || defaultPlaceholder;

  return (
    <div className={`relative xl:w-[42rem] md:w-96 h-[42px] search-section ${searchWidth}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-[30px] text-secondary focus:outline-none input input-bordered w-full h-[42px] pr-12"
        onKeyDown={handleSearch}
        onChange={handleChange}
        value={search}
        style={style}
      />
      <span
        className='icon search absolute top-[10px] right-[18px] cursor-pointer'
        onClick={handleSearchIcon}
      />
    </div>
  );
};

export default SearchInputComponent;
