import React, { useState } from "react";
import styles from "./dao.module.css";
import discussionProfile from "../../../../assets/images/discussion-profile.png";
import TextInput from "../../inputs/textinput";
const Discussions = () => {
  const [isToggle, setIsToggle] = useState(false);

  const ReplayOpen = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className="">
      <div className="flex gap-4 mb-9 mt-[40px]">
        <div className="w-12 h-12 shrink-0">
          <img src={discussionProfile} />
        </div>
        <div>
          <span className="text-base font-semibold text-secondary">
            Donald Rice .{" "}
          </span>
          <span>55min ago</span>
          <p className={`mt-1 mb-5 text-secondary opacity-60`}>
            Christian spirit passion virtues suicide morality. pinnacle moral
            pinnacle hope abstract right disgust joy.
          </p>
          <div className="">
            <button
              className="font-semibold mr-4 md:mr-9 cursor-pointer text-secondary"
              onClick={ReplayOpen}
            >
              Reply
            </button>
            <span className="font-semibold  mr-4 md:mr-9 text-secondary">
              You Liked
            </span>
            <a href="#" className="font-semibold  mr-4 md:mr-9 text-secondary">
              Share
            </a>
            <span className="font-semibold text-secondary">
              {" "}
              <span className={`icon ${styles.love}`}></span>24
            </span>
          </div>
          {isToggle && (
            <div className="discussion-replay mt-2">
              <TextInput />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussions;
