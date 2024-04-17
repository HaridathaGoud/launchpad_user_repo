import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const ProfileView = ({ profile, address }) => {
  const [addressCopied, setAddressCopied] = useState(false);
  const handleAddressCopy = () => {
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 500);
  };

  return (
    <div className="lg:col-span-4 md:col-span-2">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1 gap-4">
        <div>
          <h1 className="text-sm font-normal text-secondary opacity-[0.9] break-all">
            First Name
          </h1>
          <p className="font-medium text-sm text-secondary break-all">
            {profile.firstName ? profile.firstName : "-"}
          </p>
        </div>
        <div>
          <h1 className="text-sm font-normal text-secondary opacity-[0.9] break-all">
            Last Name
          </h1>
          <p className="font-medium text-sm text-secondary break-all">
            {profile.lastName ? profile.lastName : "-"}
          </p>
        </div>
        <div>
          <h1 className="text-sm font-normal text-secondary opacity-[0.9] break-all">
            Email
          </h1>
          <p className="font-medium text-sm text-secondary break-all">
            {profile.email ? profile.email : "-"}
          </p>
        </div>

        <div>
          <h1 className="text-sm font-normal text-secondary opacity-[0.9] break-all">
            Phone No
          </h1>
          <p className="font-medium text-sm text-secondary break-all">
            {profile.phoneNo ? (
              <>
                {profile?.countryCode} {profile?.phoneNo}
              </>
            ) : (
              "-"
            )}
          </p>
        </div>
        <div>
          <h1 className="text-sm font-normal text-secondary opacity-[0.9] break-all">
            Country
          </h1>
          <p className="font-medium text-sm text-secondary break-all">
            {profile.country ? profile.country : "-"}
          </p>
        </div>
        <div>
          <h1 className="text-sm font-normal text-secondary opacity-[0.9] break-all">
            Discord ID
          </h1>
          <p className="font-medium text-sm text-secondary break-all">
            {profile.discordId ? profile.discordId : "-"}
          </p>
        </div>
        {profile.kycStatus && profile.kycStatus !== null && (
          <div>
            <h1 className="text-sm font-normal text-secondary opacity-[0.9] break-all">
              KYC Status
            </h1>
            <p className="kyc-badge mt-1 txt-green break-all capitalize">
              {profile.kycStatus ? profile.kycStatus.toLowerCase() : "-"}
            </p>
          </div>
        )}
        {/* <div>Referrer Code</div>
                    <div>My Referral Code</div> */}

        <div className="lg:col-span-2">
          <h1 className="text-sm font-normal text-secondary opacity-[0.9]">
            Wallet Address
          </h1>
          <p className="font-medium text-sm text-secondary">
            {address || "-"}
            {
              <CopyToClipboard
                text={address}
                options={{ format: "text/plain" }}
                onCopy={() => handleAddressCopy()}
              >
                <span
                  className={
                    !addressCopied
                      ? "icon copy-icon cursor-pointer ms-0"
                      : "icon check-icon"
                  }
                />
              </CopyToClipboard>
            }
          </p>
        </div>
        {profile.facebook &&
        <div className="lg:col-span-2">
          <h1 className="text-sm font-normal text-secondary opacity-[0.9]">
          FB URL
          </h1>
          <p className="font-medium text-sm text-secondary">
            {profile.facebook || "-"}
          </p>
        </div>
        }
        {profile.linkedIn &&
        <div className="lg:col-span-2">
          <h1 className="text-sm font-normal text-secondary opacity-[0.9]">
          Insta URL
          </h1>
          <p className="font-medium text-sm text-secondary">
            {profile.linkedIn || "-"}
          </p>
        </div>
        }
        {profile.twitter && 
        <div className="lg:col-span-2">
          <h1 className="text-sm font-normal text-secondary opacity-[0.9]">
          Telegram URL
          </h1>
          <p className="font-medium text-sm text-secondary">
            {profile.twitter || "-"}
          </p>
        </div>
        }
        {profile.websiteUrl &&
        <div className="lg:col-span-2">
          <h1 className="text-sm font-normal text-secondary opacity-[0.9]">
          Website URL
          </h1>
          <p className="font-medium text-sm text-secondary">
            {profile.websiteUrl || "-"}
          </p>
        </div>
        }
        {profile.discordUrl && 
        <div className="lg:col-span-2">
          <h1 className="text-sm font-normal text-secondary opacity-[0.9]">
          Discord URL
          </h1>
          <p className="font-medium text-sm text-secondary">
            {profile.discordUrl || "-"}
          </p>
        </div>
        }
      </div>
    </div>
  );
};

export default ProfileView;
