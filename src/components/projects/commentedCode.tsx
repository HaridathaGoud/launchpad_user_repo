import styles from "./projectdetails.module.css";
import silver from "../../assets/images/silver.png";
import Gold from "../../assets/images/gold.png";
import platinum from "../../assets/images/platinum.png";
import activeSilver from "../../assets/images/silver-active.png";
import activeGold from "../../assets/images/gold-active.png";
import activePlatinum from "../../assets/images/platinum-active.png";
const [currMemberShip,setCurrMembership]
const memberships = [
    {
      name: "Silver",
      url: `${silver}`,
      activeUrl: `${activeSilver}`,
      price: 1,
    },
    { name: "Gold", url: `${Gold}`, activeUrl: `${activeGold}`, price: 2},
    {
      name: "Platinum",
      url: `${platinum}`,
      activeUrl: `${activePlatinum}`,
      price: 3,
    },
  ];

  const handleMembership = (membership) => {
    if (membership.name === currMembership?.name) {
      setCurrMembership(null);
      return;
    }
    setCurrMembership(membership);
  };
  <h2 className="text-base font-semibold mb-2 text-secondary">
        Select Your Subscription Plan
      </h2>

     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {memberships.map((membership) => (
          <div
            key={membership.name}
            className={`card border justify-between ${
              currMembership?.name === membership.name
                ? "border-primary !bg-info-content"
                : "border cursor-pointer !bg-primary-content"
            }`}
            onClick={() => handleMembership(membership)}
          >
            <h1 className="font-semibold text-2xl text-center mt-8 mb-5 text-secondary">
              {membership.name}
            </h1>
            <div className="text-center  mb-10">
              <Image
                src={
                  membership.name === currMembership?.name
                    ? membership.activeUrl
                    : membership.url
                }
                className="mx-auto"
              />
            </div>
            <div
              className={`${
                membership.name === currMembership?.name &&
                `bg-primary rounded-tl-0 rounded-tr-0 rounded-br-xl rounded-bl-xl ${styles.maticActive}`
              }  border-t cursor-pointer py-4 px-6 text-center`}
            >
              <span
                className={`${
                  membership.name === currMembership?.name
                    ? styles.activeShop
                    : styles.shop
                } icon mr-2`}
              ></span>
              <span
                className={`${
                  membership.name === currMembership?.name
                    ? "text-base-100"
                    : "text-secondary opacity-80 "
                } text-base font-semibold`}
              >
                Buy Now {membership.price}{" "}MATIC
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>

      <p className={`text-secondary opacity-60`}>
      We will Get back to you Soon.
    </p>