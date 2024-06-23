import React from "react";
import NaviLink from "../../ui/NaviLink";
import Button from "../../ui/Button";

const Sidebar = ({ list, isChecked, closeDrawer }) => {
  return (
    <div className="drawer drawer-end mobile-header">
      <input
        id="navbar-mobile-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isChecked}
        onChange={closeDrawer}
      />
      <div className="drawer-side mt-16 z-[999]">
        <label
          htmlFor="navbar-mobile-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu px-4 pt-2 w-full min-h-full bg-white text-base-content">
          <div className="text-right">
            <Button type={"plain"} handleClick={closeDrawer}>
              <span className="icon close cursor-pointer"></span>
            </Button>
            <ul className="pl-[34px] pt-2">
              {list.map(({ name, type, path, menu }) => (
                <Button type="plain" handleClick={closeDrawer} key={name} btnClassName="flex flex-col items-start justify-start">
                  <li className="group !hover:bg-transparent mb-4">
                    <NaviLink
                      path={path}
                      type="primary"
                      className="mr-[30px] text-secondary cursor-pointer bg-transparent"
                    >
                      {name}
                    </NaviLink>
                  </li>
                  {type === "dropdown" &&
                    menu &&
                    menu.map((dropdownItem) => (
                      <li
                        className="group !hover:bg-transparent mb-4"
                        key={dropdownItem.name}
                      >
                        <NaviLink
                          path={dropdownItem.path}
                          type="primary"
                          className="mr-[30px] text-secondary cursor-pointer bg-transparent"
                        >
                          {dropdownItem.name}
                        </NaviLink>
                      </li>
                    ))}
                </Button>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
