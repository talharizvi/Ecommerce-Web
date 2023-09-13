import '../TableView/tableView.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { removeProduct } from '../../redux/slices/productSlice';
import { useDispatch } from 'react-redux';

const TableView = ({data})=>{
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = (event, item) => {
        event.stopPropagation();
        nav('/admin/add-product', { state: item });
    };

    const handleDeleteClick = (event, item) =>{
        event.stopPropagation();
        dispatch(removeProduct(item));
    };

    return(
        <div>
            <table>
                <tr>
                    <th>Image</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {data.map((item)=>{
                    return(
                        <tr>
                    <td style={{ paddingRight: '10px' }}><img src={item.image} alt={item.title} width="50" height="50" /></td>      
                    <td style={{ paddingLeft: '10px' }}>{item.id.length>2 ? `${item.id.slice(0,2)}...` : item.id}</td>
                    <td>{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</td>
                    <td>{item.description.length > 50 ? `${item.description.slice(0, 50)}...` : item.description}</td>
                    <td>{item.price}</td>
                    <td><button className="add-cart-btn" onClick={(event)=>handleEdit(event,item)}>Edit</button></td>
                    <td><FaTrash style={{ color: 'gray' }} onClick={(event)=>handleDeleteClick(event,item)}/></td>
                </tr>
                    )
                })}
                
            </table>
        </div>  
    )
}

export default TableView;