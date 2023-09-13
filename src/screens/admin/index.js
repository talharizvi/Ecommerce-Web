import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../admin/admin.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar';

const AdminScreen = () => {
  const navigate = useNavigate();
  const options = [
    { label: 'Products', path: 'products' },
    { label: 'Add Product', path: 'add-product' },
    { label: 'Profile', path: 'profile' },
  ];
  const defaultOption = options[0];
  const [selectedOption, setSelectedOption] = React.useState(defaultOption);
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    navigate(`/admin/${option}`);
  };
  
  return (
    <div className="app">
      <Header count={0} />
      <div className="admin-content">
        <Sidebar options={options} selectedOption={selectedOption} onOptionClick={handleOptionClick}/>
        <div className="content">
          <Outlet /> {/* This is where the nested route content will be displayed */}
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;