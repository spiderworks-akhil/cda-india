import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/images/logo.svg";
import { MenuLineicon } from "../common/svgicon";

// Navigating remounts this component (there is no persistent layout in _app), so
// the "this menu was just clicked" flag has to outlive the component or it would
// be reset at exactly the moment it is needed.
let dismissedItem = null;

const Navbar = ({ navmenu }) => {
  const [dismissed, setDismissed] = useState(dismissedItem);
  // Touch screens have no hover, so in the mobile drawer a dropdown is opened by
  // tapping its arrow instead. Only the mobile stylesheet reads this.
  const [openItem, setOpenItem] = useState(null);

  const toggleDropdown = (event, key) => {
    // The arrow sits inside the item's link, which must not navigate here.
    event.preventDefault();
    event.stopPropagation();
    setOpenItem((current) => (current === key ? null : key));
  };

  // Menu urls come from the CMS and are stored either absolute ("/dubai/x") or
  // relative to their parent ("x" under "services"). Prepending the parent to
  // one that is already absolute is what turned a "/dubai/..." entry sitting
  // under a "/" parent into "////dubai/...", which next/link rejects.
  const handleNavigate = (url, parentUrl) => {
    if (!url) {
      return "#";
    }

    const path = url?.startsWith("/")
      ? url
      : [parentUrl, url].filter(Boolean).join("/");

    return "/" + path.replace(/^\/+/, "").replace(/\/{2,}/g, "/");
  };

  // A "#" url is the CMS way of saying the item has no page of its own and only
  // exists to open its dropdown, so it is rendered as plain text rather than a
  // link that would jump to the top of the current page.
  const isPlaceholder = (url) => !url || url === "#";

  // The dropdowns open purely on :hover. Clicking through to a page leaves the
  // pointer sitting where the link used to be, so the browser still considers
  // the menu hovered and re-opens it over the page that just loaded. Pull the
  // dropdown out of the DOM until the pointer actually leaves its parent item.
  const dismissDropdown = (key) => {
    dismissedItem = key;
    setDismissed(key);
  };

  const restoreDropdown = (key) => {
    if (dismissedItem === key) {
      dismissedItem = null;
    }

    setDismissed((current) => (current === key ? null : current));
  };

  // The third level opens to the right of its parent. For a menu item near the
  // right edge of the window that puts it past the viewport, so it is measured
  // on hover and opened to the left instead when it will not fit.
  const positionFlyout = (event) => {
    const parent = event.currentTarget;
    const flyout = parent.querySelector(".drop_menu_level");

    if (!flyout) return;

    flyout.classList.remove("drop_menu_level--flip");

    // The mobile drawer stacks the levels rather than flying out, so there is
    // nothing to flip there.
    if (window.getComputedStyle(flyout).position !== "absolute") return;

    const width = flyout.offsetWidth || 250;
    const gutter = 16;

    if (parent.getBoundingClientRect().right + width > window.innerWidth - gutter) {
      flyout.classList.add("drop_menu_level--flip");
    }
  };

  return (
    <nav className="hidden md:block">
      <ul className="flex flex-col md:flex-row items-center justify-center md:gap-[28px] gap-[15px]">
        {navmenu?.map((item, index) => {
          // Keyed by title rather than index so the flag still matches up after
          // the remount that a route change causes.
          const itemKey = item?.title ?? index;

          const itemLabel = (
            <>
              {item?.title}
              {item?.children?.length > 0 && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Toggle ${item?.title} menu`}
                  aria-expanded={openItem === itemKey}
                  className="nav-dropdown-toggle"
                  onClick={(event) => toggleDropdown(event, itemKey)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      toggleDropdown(event, itemKey);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M12 15L17 10H7L12 15Z" fill="white" />
                  </svg>
                </span>
              )}
            </>
          );

          return (
            <li
              key={index}
              onMouseEnter={() => restoreDropdown(itemKey)}
              onMouseLeave={() => restoreDropdown(itemKey)}
              className={`relative group nav-list-item ${item?.children?.length > 0 ? "has_child" : ""
                } ${openItem === itemKey ? "is-open" : ""}`}
            >
              {isPlaceholder(item?.url) ? (
                <span className="flex items-center gap-1 cursor-default">
                  {itemLabel}
                </span>
              ) : (
                <Link
                  href={handleNavigate(item?.url)}
                  onClick={() => dismissDropdown(itemKey)}
                  className="flex items-center gap-1"
                >
                  {itemLabel}
                </Link>
              )}

              {/* First Level Dropdown */}
              {item?.children?.length > 0 && dismissed !== itemKey && (
                <ul className="drop_menu absolute left-0 top-full mt-2 hidden group-hover:block bg-black text-white p-2 z-10">
                  {item?.children?.map((child, childIndex) => (
                    <li
                      key={childIndex}
                      onMouseEnter={
                        child?.children?.length > 0 ? positionFlyout : undefined
                      }
                      className={`relative group ${child?.children?.length > 0 ? "has_child" : ""
                        }`}
                    >
                      {isPlaceholder(child?.url) ? (
                        <span className="block px-4 py-2 cursor-default">
                          {child?.title}
                        </span>
                      ) : (
                        <Link
                          href={handleNavigate(child?.url)}
                          onClick={() => dismissDropdown(itemKey)}
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          {child?.title}
                        </Link>
                      )}

                      {/* Second Level Dropdown */}
                      {child?.children?.length > 0 && (
                        <ul className="drop_menu_level absolute left-full top-0 mt-0 hidden group-hover:block bg-black text-white p-2 z-10">
                          {child?.children?.map((innerChild, innerIndex) => (
                            <li key={innerIndex}>
                              {isPlaceholder(innerChild?.url) ? (
                                <span className="block px-4 py-2 cursor-default">
                                  {innerChild?.title}
                                </span>
                              ) : (
                                <Link
                                  href={handleNavigate(innerChild?.url, item?.url)}
                                  onClick={() => dismissDropdown(itemKey)}
                                  className="block px-4 py-2 hover:bg-gray-700"
                                >
                                  {innerChild?.title}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
