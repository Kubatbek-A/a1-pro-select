import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

import RightIconSVG from "../../assets/icons/arrow-right.svg";

import "./styles.scss";

const OPTIONS = [
  { value: "account", label: "ACCOUNT" },
  { value: "wallet", label: "WALLET" },
  { value: "bonuses", label: "BONUSES" },
  { value: "bets", label: "BETS" },
  { value: "history", label: "HISTORY" },
];

export const Select = () => {
  const [selectedItem, setSelectedItem] = useState(OPTIONS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="select">
      <div onMouseEnter={handleMouseEnter} className="select__label">
        <span>{selectedItem.label}</span>
      </div>

      <ul className={classNames("select__menu", { active: isOpen })}>
        {OPTIONS.map((item, idx) => (
          <li
            key={`${idx}-${item.value}`}
            onClick={() => handleItemClick(item)}
            className="select__menu__item"
          >
            {item.label}
            <img src={RightIconSVG} alt="Right Arrow" />
          </li>
        ))}
      </ul>
    </div>
  );
};
