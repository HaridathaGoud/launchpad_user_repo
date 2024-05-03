import React, { useEffect, useMemo, useRef, useState } from "react";
const headerHeight = document.querySelector("#header")?.clientHeight || 75;
const scrollTabHeight =
  document.querySelector("#scrollTabs")?.clientHeight || 75;
const ScrollTabs = ({
  sections,
  tabsDivClass,
  tabClass,
  activeTabClass,
  active,
}) => {
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    if (active.id && active.shouldRedirect) {
      handleTabClick(active.id, null);
      return;
    }
    setActiveTab(active?.id || "projectFeed");
  }, [active]);
  const sectionRefs = useMemo(() => {
    const refs = sections.map((section: any) => {
      const ref = document.getElementById(section.id);
      return ref ? {id:section.id,ref}: {id:section.id,ref:null};
    });
    return refs;
  }, [sections]);
  const handleScroll = () => {
    sectionRefs.forEach((section: any) => {
      if (section?.ref) {
        const rect = section?.ref?.getBoundingClientRect();
        const height = headerHeight + scrollTabHeight + 10;
        if (rect?.top <= height && rect?.top > headerHeight) {
          setActiveTab(section.id);
        }
      }
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, headerHeight, scrollTabHeight]);

  const handleTabClick = (id, action) => {
    if (action) {
      action?.(id);
    } else {
      const section = document.getElementById(id);
      if (section) {
        const height = headerHeight + scrollTabHeight;
        const top = section?.getBoundingClientRect().top;
        const scrolltoTop = window.scrollY + top;
        const scrollToPosition = scrolltoTop - height;
        window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      }
    }
  };
  return (
    <div>
      <div className={tabsDivClass}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleTabClick(section.id, section.action)}
            className={`${
              activeTab === section.id ? activeTabClass : ""
            } ${tabClass}`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollTabs;
