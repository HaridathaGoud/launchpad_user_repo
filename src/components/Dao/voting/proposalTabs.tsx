import React, { useState } from 'react';
import Voters from "./votersgrid"
import Discussions from '../proposal/createproposal/discussions'; 
import styles from "../proposal/createproposal/dao.module.css";

function ProposalTabbedContent() {
  const [activeTab, setActiveTab] = useState('voters');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-end items-center mt-5">
        <div className={`${styles.customTabs} tabs`}>
          <a
            className={`${styles.tab} ${activeTab === 'discussions' ? styles.tabActive : ''} tab`}
            onClick={() => handleTabClick('discussions')}
          >
            Discussions
          </a>
          <a
            className={`${styles.tab} ${activeTab === 'voters' ? styles.tabActive : ''} tab`}
            onClick={() => handleTabClick('voters')}
          >
            Voters
          </a>
        </div>
      </div>

      <div>
        {activeTab === 'voters' && <Voters/>}
        {activeTab === 'discussions' && <Discussions />}
      </div>
    </div>
  );
}

export default ProposalTabbedContent;
