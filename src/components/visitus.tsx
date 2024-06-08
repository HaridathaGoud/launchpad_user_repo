import React from 'react';
import Button from '../ui/Button';

const VisitUs  = () => {
  const handleApplyNow = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSesoFMRUkGlnD9GKuW3zdz6bX6xRFmWam1R-Aln21e3dOHUxQ/viewform?hl=en_GB&pli=1');
  };
    return (
          <div className={`applynowSection max-sm:py-10 px-3 lg:px-0 max-sm:rounded py-[74px]`}>
            <div className={`container mx-auto lg:flex items-center justify-between`}>
                <div>
                    <h2 className="text-black font-semibold text-[32px]">Get Started Today <span className={`text-primary`}>{process.env.REACT_APP_OFFERING_TITLE}s</span> Project To Launch At DOTT</h2>
                    <p className={`text-neutral text-base font-normal`}>Fill the form / Schedule a Free Call with our Experts / Brainstorm Ideas for your Project /<br/> Get your Quote / Project Development / Launch your Project</p>
                </div>
                <div className={`max-sm:text-center mt-4 md:mt-0 shrink-0`}>
                  <Button type='applynow' btnClassName="dark-textwhite">
                    Visit Us
                </Button>
                </div>
            </div>
          </div>
    );


};

export default VisitUs;