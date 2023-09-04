import { useForm } from "react-hook-form";
import '../AddProduct/addProduct.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slices/productSlice';
import React, {useState} from 'react';
import ImageUploader from "../../components/ImageUploader/ImageUploader";

function AddProduct() {
  const [selectedImageNames, setSelectedImageNames] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  console.log('selectedImages_names', selectedImages)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();

    const handleImageSelect = (e) => {
      const files = e.target.files;
  
      if (files && files.length > 0) {
        const selectedImageList = [];
        for (let i = 0; i < files.length; i++) {
          const imageURL = URL.createObjectURL(files[i]);
          selectedImageList.push({
            file: files[i],
            url: imageURL,
          });
        }
        setSelectedImages(selectedImageList);
      }
      console.log('event-image', e)
    };

    const onSubmit = (data) => {
      // Generate a unique ID using uuidv4()
      const productId = uuidv4();

  // Get the selected files and their names
  // Get the selected files and their names
  const images = [];
  const imageNames = [];
  for (let i = 0; i < data.images.length; i++) {
    const file = data.images[i];
    images.push({
      name: file.name,
      url: URL.createObjectURL(file),
    });
    imageNames.push(file.name);
  }
  setSelectedImageNames(imageNames);
      // Create an object with the desired format
      const productData = {
        id: productId, // You can generate a unique ID here
        title: data.name,
        price: parseFloat(data.price),
        description: data.description,
        category: data.category,
        image: images.length > 0 ? images[0].url : '', // Assuming you want to use the first image as the main image
        rating: {
          rate: 3.9, // You can set a default rating if needed
          count: 120, // You can set a default count if needed
        },
        images: images, // Use all selected images
        isWishlist: false, // You can set this as needed
      };
    
      console.log('Formatted Data', productData);
      dispatch(addProduct(productData));
      alert('Item added successfully')
    };

    return (
      console.log('selectedimage', selectedImages),
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
  <label>Name</label>
  <input
    type="text"
    name="name"
    {...register('name', {
      required: 'Name is required',
    })}
  />
  {errors.name && <p>{errors.name.message}</p>}

  <label>Category</label>
  <input
    type="text"
    name="category"
    {...register('category', {
      required: 'Category is required',
    })}
  />
  {errors.category && <p>{errors.category.message}</p>}

  <label>Description</label>
  <textarea
    name="description"
    {...register('description', {
      required: 'Description is required',
    })}
  />
  {errors.description && <p>{errors.description.message}</p>}

  <label>Quantity</label>
  <input
    type="number"
    name="quantity"
    {...register('quantity', {
      required: 'Quantity is required',
      min: {
        value: 1,
        message: 'Quantity must be at least 1',
      },
    })}
  />
  {errors.quantity && <p>{errors.quantity.message}</p>}

  <label>Price</label>
  <input
    type="number"
    name="price"
    step="0.01"
    {...register('price', {
      required: 'Price is required',
      min: {
        value: 0.01,
        message: 'Price must be at least 0.01',
      },
    })}
  />
  {errors.price && <p>{errors.price.message}</p>}

        <label>Images</label>
        <input
          type="file"
          name="images"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleImageSelect} // Handle image selection
          {...register("images", {
            required: "At least one image is required",
          })}
        />
        {selectedImages.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ))}
        {/* {errors.images && <p>{errors.images.message}</p>} */}


      <button type="submit" className="add-product-button">Add Product</button>
  </form>
        </div>
    )
}

export default AddProduct