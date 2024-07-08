import React, { useState } from "react";
import Voters from "./votersGrid";
// import Discussions from '../proposal/createproposal/discussions';
import styles from "../dao.module.css";
import Button from "../../../ui/Button";

const ProposalTabs = () => {
  const [activeTab, setActiveTab] = useState("voters");

  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-start items-center mt-10 project-detail-tab">
        <div className={`${styles.customTabs} tabs custom-btn-new !p-0`}>
          {/* <Button
          type='plain'
            btnClassName={`${styles.tab} ${activeTab === 'discussions' ? styles.tabActive : ''} tab`}
            handleClick={() => handleTabClick('discussions')}
          >
            Discussions
          </Button> */}
          <Button
            type="plain"
            btnClassName={`${styles.tab} ${
              activeTab === "voters" ? styles.tabActive : ""
            } tab`}
            handleClick={() => handleTabClick("voters")}
          >
            Voters
          </Button>
        </div>
      </div>

      <div>
        {activeTab === "voters" && <Voters />}
        {/* {activeTab === 'discussions' && <Discussions />} */}
      </div>
    </div>
  );
};

export default ProposalTabs;
