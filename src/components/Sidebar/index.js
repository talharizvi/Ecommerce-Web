import '../Sidebar/sidebar.css';
const Sidebar = ({ options, selectedOption, onOptionClick }) => {
    return (
      <div className="sidebar">
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={selectedOption === option ? 'active' : ''}
              onClick={() => onOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Sidebar;