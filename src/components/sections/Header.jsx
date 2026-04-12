import { useState } from "react";
import iconUnits from "../../assets/images/icon-units.svg";
import logo from "../../assets/images/logo.svg";
import iconDropdown from "../../assets/images/icon-dropdown.svg";
import UnitDropDown from "./UnitDropDown";

const Header = () => {
  const [isUnitMenuOpen, setIsUnitMenuOpen] = useState(true);

  return (
    <header>
      <div className="flex flex-row justify-between px-10 pt-5 pb-5 md:px-20 xl:px-30">
        <img src={logo} alt="logo" className="w-35 md:w-40" />
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUnitMenuOpen((current) => !current)}
            className="flex items-center gap-2 rounded-xl border border-neutral-600/80 bg-neutral-800 px-4 py-3 text-neutral-0 shadow-[0_10px_25px_rgba(3,1,45,0.35)] transition-colors hover:bg-neutral-700"
          >
            <img src={iconUnits} alt="" className="w-4" />
            <span className="text-base font-medium tracking-[0.01em]">Units</span>
            <img
              src={iconDropdown}
              alt=""
              className={`w-3 transition-transform ${
                isUnitMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isUnitMenuOpen ? <UnitDropDown /> : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
