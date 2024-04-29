import React, { useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StickyTabBar = ({ sections,tabsDivClass,tabClass,activeTabClass,active }) => {
  const location=useLocation();
  const navigate=useNavigate()
  const tabRefs = useRef({});
  useEffect(()=>{
    if(location.hash){
      handleTabClick(location.hash.slice(1),null)
    }
  },[location.pathname])
  const activeTab=useMemo(()=>{
    return active || location.hash?.slice(1)
  },[location.hash,active])
  const handleEntries=(entries)=>{
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id='#'+entry.target.id
          navigate(id);
        } 
      });
  }
 
  useEffect(() => {
   const observers:any=[]
    Object.values(sections).forEach((section:any) => {
        const ref=document.getElementById(section.id)
        if(ref){
          const observer = new IntersectionObserver(
            (entries) => {
              handleEntries(entries)
            },
            {threshold:section.threshold}
          );
          observer.observe(ref);
          observers.push(observer)
        }
    });
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sections,window.scrollY]);

  const handleTabClick = (id,action) => {
    if(action){
      action?.(id)
    }else{
      const section = document.getElementById(id);
      if(section){
          const navbarHeight = document.querySelector('header')?.clientHeight || 0;
            const height=navbarHeight+30
            const top = section?.getBoundingClientRect().top;
            const scrollPosition = window.scrollY;
            const scrollToPosition = scrollPosition + top- height ;
            const finalScrollPosition = scrollToPosition - (height) -25;
            window.scrollTo({ top: finalScrollPosition, behavior: "smooth" });
      }
    }
  };
  return (
    <div>
      <div className={tabsDivClass}>
        {sections.map((section) => (
          <button
            key={section.id}
            ref={(ref) => (tabRefs.current[section.id] = ref)}
            onClick={() => handleTabClick(section.id,section.action)}
            className={`${activeTab===section.id ? activeTabClass : ''} ${tabClass}`}

          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickyTabBar;
