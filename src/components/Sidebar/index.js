import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import '../Sidebar/sidebar.css';

const Sidebar = ({ options, selectedOption, onOptionClick }) => {
  return (
    <div className="sidebar">
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <Link
              to={`/admin/${option.path}`} // Use the path property from options
              className={`sidebar-link ${selectedOption.path === option.path ? 'active' : ''}`}
              onClick={() => onOptionClick(option)} // Pass the path to the click handler
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;