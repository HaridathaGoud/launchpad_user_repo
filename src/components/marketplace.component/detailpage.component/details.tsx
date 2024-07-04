import React from "react";
import Button from "../../../ui/Button";

const Details = ({
  isCopied,
  nftDetails,
  nftcontractDetails,
  handleCopy,
  collectionAddress,
  getDate,
}) => {
  return (
    <section className="shadow rounded-lg bg-primary-content mt-4">
      <div className="px-2.5 py-2">
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-2xl font-semibold text-secondary">Overview</h1>
          <p className="text-secondary text-base font-semibold">
            {"By"}
            <span className="text-neutral ml-1">
              {nftDetails?.creatorName ||
                nftDetails?.creatorWalletAddress?.slice(0, 4) +
                  "...." +
                  nftDetails?.creatorWalletAddress?.substring(
                    nftDetails?.creatorWalletAddress?.length - 4,
                    nftDetails?.creatorWalletAddress?.length
                  )}
              <span className="copy-space">
                {!nftDetails?.creatorName &&
                  nftDetails?.creatorWalletAddress && (
                    <Button
                      type="plain"
                      handleClick={() =>
                        handleCopy(nftDetails?.creatorWalletAddress)
                      }
                    >
                      <span
                        className={`${
                          isCopied !== nftDetails?.creatorWalletAddress
                            ? "icon md copy-icon c-pointer ms-0"
                            : "icon md check-icon"
                        }`}
                      />
                    </Button>
                  )}
              </span>
            </span>
          </p>
        </div>

        {nftDetails?.description && (
          <>
            <h3 className="text-base font-semibold text-secondary mb-4">
              Description
            </h3>
            <p className="text-secondary">{nftDetails?.description}</p>
          </>
        )}
      </div>
      <hr className="mt-[22px] mb-3" />
      <div className="px-2.5 pt-2 pb-6">
        <h1 className="text-base font-semibold text-secondary mb-4">Details</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h1 className="font-semibold text-secondary">Contract Address</h1>
            {nftcontractDetails?.contractAddress != null && (
              <h4 className="text-neutral font-semibold break-all">
                {nftcontractDetails?.contractAddress?.slice(0, 4) +
                  "...." +
                  nftcontractDetails?.contractAddress?.substring(
                    nftcontractDetails?.contractAddress.length - 4,
                    nftcontractDetails?.contractAddress.length
                  )}{" "}
                <span className="copy-space">
                  {nftcontractDetails?.contractAddress && (
                    <Button
                      type="plain"
                      btnClassName={`${
                        isCopied !== nftcontractDetails?.contractAddress
                          ? "icon md copy-icon c-pointer ms-0"
                          : "icon md check-icon"
                      }`}
                      handleClick={() =>
                        handleCopy(nftcontractDetails?.contractAddress)
                      }
                    />
                  )}
                </span>
              </h4>
            )}

            {nftcontractDetails?.contractAddress == null && (
              <h4 className="text-neutral font-semibold break-all">
                {collectionAddress}
                <span className="copy-space">
                  {collectionAddress &&
                    nftcontractDetails?.contractAddress == null && (
                      <Button
                        type="plain"
                        handleClick={() => handleCopy(collectionAddress)}
                      >
                        <span
                          className={`${
                            !isCopied
                              ? "icon md copy-icon c-pointer ms-0"
                              : "icon md check-icon"
                          }`}
                        />
                      </Button>
                    )}
                </span>
              </h4>
            )}
          </div>
          <div>
            <h1 className="font-semibold text-secondary">Token ID</h1>
            <h4 className="text-neutral font-semibold break-all">
              {nftcontractDetails?.tokenId || "--"}
            </h4>
          </div>
          <div>
            <h1 className="font-semibold text-secondary">Token Standard</h1>
            <h4 className="text-neutral font-semibold break-all">
              {nftcontractDetails?.tokenStandard || "--"}
            </h4>
          </div>
          <div>
            <h1 className="font-semibold text-secondary">Chain</h1>
            {/* <h4 className="text-neutral font-semibold break-all">Polygon</h4> */}
            <h4 className="overview-value text-neutral">{nftcontractDetails?.blockChain || '--'}</h4>
          </div>
          <div>
            <h1 className="font-semibold text-secondary">Last Updated</h1>
            <h4 className="text-neutral font-semibold break-all">
              {getDate(nftcontractDetails?.date)}
            </h4>
          </div>
          <div>
            <h1 className="font-semibold text-secondary">Creator Earnings</h1>
            <h4 className="text-neutral font-semibold break-all">
              {nftcontractDetails?.creatorEarnings || "0%"}
            </h4>
          </div>
          {nftcontractDetails?.externalLink && (
            <div className="col-span-3">
              <h1 className="font-semibold text-secondary">External Link</h1>
              {nftcontractDetails?.externalLink && (
                <Button
                  type="plain"
                  btnClassName="!text-neutral font-semibold break-all text-start"
                  handleClick={() =>
                    window.open(nftcontractDetails?.externalLink, "_blank")
                  }
                >
                  <span className="text-neutral c-pointer">
                    {(!nftcontractDetails?.externalLink && "-") ||
                      nftcontractDetails?.externalLink}
                  </span>
                </Button>
              )}
              {!nftcontractDetails?.externalLink && <h4>{"-"}</h4>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Details;
