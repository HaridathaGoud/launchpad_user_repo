import React from 'react';
import NftCardsShimmer from './NftCardShimmer';
import NoData from '../../../ui/noData';
import Button from '../../../ui/Button';
import Spinner from  '../../loaders/spinner'
import { useNavigate } from 'react-router-dom';
import defaultlogo from '../../../assets/images/default-logo.png';
import { useAccount } from 'wagmi';
const NftCards = ({ NftDetails ,addToFavorites,favoriteLoader,saveView,cardLoader}) => {
    const { address,isConnected } = useAccount();

    const navigate = useNavigate();
    const navigateToAsset = (item:any) => {
        navigate(
          `/marketplace/nft/${item.tokenId}/${item.collectionContractAddress}/${item.id}`
        );
      };
      
    return (
        <>
        {(NftDetails?.loading || cardLoader) &&
            Array.from({ length: 6 }, (_, index) => (
              <div key={index}>
                <NftCardsShimmer />
              </div>
            ))}

            {!NftDetails?.loading && <>
                {NftDetails?.data?.length >0 && NftDetails?.data?.map((item:any) => (
                    <div key={item?.id}>
                        <div className='shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]'>
                            <Button
                                handleClick={
                                    isConnected
                                        ? () => saveView?.(item)
                                        :() => navigateToAsset(item)
                                }
                                type="plain" btnClassName="w-full"
                            >
                            <img 
                            src={
                                item?.image && !item?.image?.includes("null")
                                  ? item.image.replace(
                                      "ipfs://",
                                      "https://ipfs.io/ipfs/"
                                    )
                                  : defaultlogo
                              }
                             alt="" 
                             className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg  ${
                                item?.isUnlockPurchased &&
                                address !== item?.walletAddress
                                  ? "blur-image"
                                  : ""
                              }`} />
                            </Button>
                            <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                                <Button
                                    type="plain"
                                    handleClick={() => addToFavorites(item)}
                                    btnClassName=""
                                >
                                    {favoriteLoader?.id !== item.id && (
                                        <span
                                            className={`icon like-white ${item?.isFavourite ? "active" : ""
                                                }`}
                                        ></span>
                                    )}
                                    {favoriteLoader?.id === item.id &&
                                        favoriteLoader?.loading && (
                                            <span>
                                                <Spinner />
                                            </span>
                                        )}
                                </Button>
                            </div>
                            {item?.badge && <span className='py-1 px-3 bg-primary text-white text-base font-semibold absolute rounded-tl-lg top-0 left-0'>{item?.badge}</span>}
                            <Button
                                handleClick={
                                      isConnected
                                        ? () => saveView(item)
                                        :() => navigateToAsset(item)
                                }
                                type="plain"
                                btnClassName="w-[100%]"
                            > 
                            <div className='px-2 py-2.5'>
                                <p className='text-xs text-secondary truncate text-left'>{item?.seriesname}</p>
                                <h2 className='mb-2.5 text-base font-semibold truncate text-secondary text-left'>{item?.name}</h2>
                                <div className="flex justify-between truncate mb-3 gap-2"> <p className='opacity-60 truncate text-secondary flex-1 text-left'>Price</p> <p className='font-semibold text-secondary flex-1 truncate text-right'>{item?.price}{' Matic'}</p> </div>
                                <div className="flex justify-between gap-2"> <p className='opacity-60 text-secondary flex-1 text-left'>Highest bid</p>  <p className='font-semibold text-secondary flex-1 text-right truncate'>{item?.highestBid}{' Matic'}</p> </div>
                            </div>
                            <hr />
                            <div className='px-2.5 py-4 flex justify-center'>
                                {/* <div className='flex add-cart cursor-pointer'>
                <span className='icon card-cart'></span>
                <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Add to Cart</span>
                                 </div> */}
                                {/* <div className='w-px border'></div> */}
                                <div className='flex shop-card cursor-pointer'>
                                    <span className='icon card-shop'></span>
                                    <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Buy Now</span>
                                </div>
                            </div>
                            </Button>
                        </div>
                    </div>
                ))}
                {!NftDetails?.data?.length && 
               <div className='md:col-span-2 xl:col-span-3'>
                 <div className='text-center'> 
                <NoData text={""} />
                </div>
                </div>}
                
            </>}
        </>);
};

export default NftCards;