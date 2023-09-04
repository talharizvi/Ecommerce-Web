import React from 'react';
import Products from '../Products/index';
import AddProduct from '../AddProduct/index';
import Profile from '../Profile/index';
import Sidebar from '../../components/Sidebar';
import '../admin/admin.css';
import Header from '../../components/Header/Header';

const Content = ({ selectedOption }) => {
    return (
      <div className="content">
      {selectedOption === 'Products' && <Products />}
      {selectedOption === 'Add Product' && <AddProduct />}
      {selectedOption === 'Profile' && <Profile />}
      </div>
    );
  };

function AdminScreen() {
    const [selectedOption, setSelectedOption] = React.useState('Products');
  const options = ['Products', 'Add Product', 'Profile'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
    return (
        <div className="app">
            <Header count={0}/>
            <Sidebar
                options={options}
                selectedOption={selectedOption}
                onOptionClick={handleOptionClick}
            />
            <Content selectedOption={selectedOption} />
            {/* <div className="admin-content">
                <Routes>
                    <Route path="products" element={<Products />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </div> */}
        </div>
    );
}

export default AdminScreen;