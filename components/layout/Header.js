import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "../../public/images/logo.svg";
import { CircleArrow2icon, CircleArrowicon, MenuLineicon } from "../common/svgicon";
import Navbar from "../common/Nav";
import Link from "next/link";
import { Urlredirect } from "../common/functions/urlnavigate";

const Header = ({ general }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add("ready");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const [active, setActive] = useState(false);
  const navRef = useRef(null);

  const handleNavClick = () => {
    setActive((prev) => !prev); // Toggle class
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setActive(false); // Remove class on outside click
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header ref={containerRef} className="header">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <Image src={Logo} alt="CDA Audit" width={101} height={55} priority />
        </Link>

        <Navbar navmenu={general?.all_menus?.Main_Menu} />

        <div ref={navRef} className={active ? "nav2 active" : "nav2"}>
     
          <Link
            href={Urlredirect(general?.all_settings?.contact_btn_url)}
            className="btn items-center gap-[12px] hidden md:flex"
          >
            <span> {general?.all_settings?.contact_btn_text} </span>
            <CircleArrow2icon />
          </Link>

          <button type="button" className="md:hidden btn-reset" aria-label="Open menu" aria-expanded={active} onClick={handleNavClick}>
            <MenuLineicon />
          </button>
          <Navbar navmenu={general?.all_menus?.Main_Menu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
