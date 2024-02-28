import React, { useState } from 'react';
import Voters from "./votersGrid"
// import Discussions from '../proposal/createproposal/discussions'; 
import styles from "../dao.module.css";
import Button from '../../../ui/Button';

function ProposalTabs() {
  const [activeTab, setActiveTab] = useState('voters');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-end items-center mt-10">
        <div className={`${styles.customTabs} tabs`}>
          {/* <Button
          type='plain'
            btnClassName={`${styles.tab} ${activeTab === 'discussions' ? styles.tabActive : ''} tab`}
            handleClick={() => handleTabClick('discussions')}
          >
            Discussions
          </Button> */}
          <Button
          type='plain'
            btnClassName={`${styles.tab} ${activeTab === 'voters' ? styles.tabActive : ''} tab`}
            handleClick={() => handleTabClick('voters')}
          >
            Voters
          </Button>
        </div>
      </div>

      <div>
        {activeTab === 'voters' && <Voters/>}
        {/* {activeTab === 'discussions' && <Discussions />} */}
      </div>
    </div>
  );
}

export default ProposalTabs;
