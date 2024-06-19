import React from 'react'
import StatusDetailview from './detailviewstatus'
import SearchInputComponent from './SearchComponent'
import NftCards from './Nftcards'
import SearchBar from '../../../ui/searchBar'

export const CollectionItems = ({ setSearchInput,
 searchInputRef,
  minMaxCategory,
  handlePriceRangeSelection,
  activeTab,
  getNftsDetails,
  NftDetails, }) => {

  return (<>
    <div className="mt-7 mb-[42px]">
      <div className="md:flex justify-between">
        {/* <SearchInputComponent handleSearch={handleSearch} handleChange={handleChange} handleSearchIcon={handleSearchIcon} search={searchValue} /> */}
        <SearchBar onSearch={setSearchInput} inputRef={searchInputRef} placeholder="Search Movie, NFT Name,  Category...... "/>
        <div className="flex items-center max-sm:mt-2">
          <div className="dropdown mr-2.5">
            <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: {minMaxCategory} <span className="icon drop-arrow"></span></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li onClick={(event) => handlePriceRangeSelection(event, 'low2high')} ><a>Low</a></li>
              <li onClick={(event) => handlePriceRangeSelection(event, 'high2low')}><a>High</a></li>
            </ul>
          </div>
          <span className='bg-accent p-2.5 rounded cursor-pointer'>
            <span className="icon filter-squre"></span>
          </span>
          <span className="mx-4 bg-accent p-2.5 rounded cursor-pointer">
            <span className="icon filter-dots"></span>
          </span>
          <span className='bg-accent p-2.5 rounded relative cursor-pointer'>
            <span className="icon filter-cart"></span>
            <span className='bg-primary text-white w-[16px] top-[-4px] right-[4px] text-xs h-[16px] inline-block flex justify-center items-center absolute rounded-full'>4</span>
          </span>
        </div>
      </div>
    </div>
    <div className='grid md:grid-cols-12 lg:gap-[45px]'>
      <div className='col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3'>
        <StatusDetailview activeTab={activeTab} getNftsDetails={getNftsDetails} />
      </div>
      <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 grid md:grid-cols-2 xl:grid-cols-3 gap-[16px]'>
        <NftCards NftDetails={NftDetails}/>
      </div>
    </div>

  </>)
}
