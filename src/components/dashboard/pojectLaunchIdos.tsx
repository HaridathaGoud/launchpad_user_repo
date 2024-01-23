import React from 'react';

function ProjectLanchIdos() {
  const handleApplyNow = () => {
    window.open('https://forms.gle/JrvAhmqEA8ksFJAK6');
  };

  return (
    <>
      <div className="apply-now">
        <div>
          <h2 className="apply-title">
            Apply for your {process.env.REACT_APP_OFFERING_TITLE}s
            <br /> Project to launch at {process.env.REACT_APP_TOKEN_SYMBOL}{' '}
          </h2>
          <p>If you have an amazing project that you'd like to launch at Minnapad, apply now!</p>
        </div>
        <div>
          <div className="p-relative">
            <button
              type="button"
              className="custom-button"
              onClick={() => {
                handleApplyNow();
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectLanchIdos;
