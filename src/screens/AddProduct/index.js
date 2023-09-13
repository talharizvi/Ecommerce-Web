import { useForm, Controller } from "react-hook-form";
import '../AddProduct/addProduct.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct } from '../../redux/slices/productSlice';
import React, {useState, useRef, useEffect} from 'react';
import { useLocation } from 'react-router-dom';


function AddProduct() {
  const location = useLocation();
  const dataItem = location.state;
  console.log('data-item', dataItem)
  //const {image, title, category, description, price, images, rating} = data;
  const [selectedImages, setSelectedImages] = useState(dataItem?.images ?  dataItem?.images : []);
  console.log('selectedImages_names', selectedImages)

    const {
      control,
        register,
        handleSubmit,
        formState: { errors }
        , setValue, getValues
    } = useForm();
    const dispatch = useDispatch();

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    const fileUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      fileUrls.push(imageUrl);
    }

    setSelectedImages([...selectedImages, ...fileUrls]);
  };

  // Function to remove an image URL from the array
  const removeImage = (imageUrl) => {
    const updatedImages = selectedImages.filter((image) => image !== imageUrl);
    setSelectedImages(updatedImages);
  };

    const onSubmit = (data) => {
      console.log('data-onsubmit', data)
      console.log('data-onsubmit-selectedImages', selectedImages)
  //     const images = [];
  // for (let i = 0; i < data.images.length; i++) {
  //   const file = data.images[i];
  //   console.log('file', file)
  //   images.push({
  //     name: file.name,
  //     url: URL.createObjectURL(file),
  //   });
  // }

      if (dataItem?.id) {
        // Edit operation: Dispatch the editProduct action
        const editedProduct = {
            ...dataItem,
             // Keep the same ID for the edited product
             title: data.name,
            price: parseFloat(data.price),
            description: data.description,
            category: data.category,
            images: selectedImages,
            image: selectedImages.length > 0 ? selectedImages[0]?.url || selectedImages[0] : '',
        };
        dispatch(editProduct(editedProduct));
        alert('Item edited successfully');
    } else {
      // Generate a unique ID using uuidv4()
      const productId = uuidv4();

  // Get the selected files and their names
  // const images = [];
  // for (let i = 0; i < data.images.length; i++) {
  //   const file = data.images[i];
  //   images.push({
  //     name: file.name,
  //     url: URL.createObjectURL(file),
  //   });
  // }
        // Add operation: Dispatch the addProduct action
        const productData = {
            id: productId,
            title: data.name,
            price: parseFloat(data.price),
            description: data.description,
            category: data.category,
            //image: images.length > 0 ? images[0].url : '',
            rating: {
                rate: 3.9,
                count: 120,
            },
            images: selectedImages,
            image: selectedImages.length > 0 ? selectedImages[0]?.url || selectedImages[0] : '',
            isWishlist: false,
        };
        dispatch(addProduct(productData));
        alert('Item added successfully');
    }
    };

    return (
      console.log('selectedimage', selectedImages,'errors', errors),
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
  <label>Name</label>
  <input
    type="text"
    name="name"
    {...register('name', {
      required: 'Name is required',
    })}
    defaultValue={dataItem?.title}
  />
  {errors.name && <p className="errorText">{errors.name.message}</p>}

  <label>Category</label>
  <input
    type="text"
    name="category"
    {...register('category', {
      required: 'Category is required',
    })}
    defaultValue={dataItem?.category}
  />
  {errors.category && <p className="errorText">{errors.category.message}</p>}

  <label>Description</label>
  <textarea
    name="description"
    {...register('description', {
      required: 'Description is required',
    })}
    defaultValue={dataItem?.description}
  />
  {errors.description && <p className="errorText">{errors.description.message}</p>}

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
  {errors.quantity && <p className="errorText">{errors.quantity.message}</p>}

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
    defaultValue={dataItem?.price}
  />
  {errors.price && <p className="errorText">{errors.price.message}</p>}

      <div>
        <label>Images</label>
        <Controller
          name="images" // Field name
          control={control}
          defaultValue={[]} // Initial value, should be an empty array
          rules={{ 
            //required: 'At least one image is required' 
            validate: () => selectedImages.length > 0 || 'At least one image is required' 
          }} // Validation rule
          render={({ field }) => (
            <>
              <input
                type="file"
                name="images"
                accept="image/png, image/jpeg"
                multiple
                style={{ display: 'none' }} // Hide the file input
                ref={(e) => (field.ref = e)} // Connect the ref of the file input to Controller
                onChange={(e) => {
                  field.onChange(e); // Trigger onChange event
                  handleFileInputChange(e); // Custom logic for handling image selection
                }}
              />
              <button
                type="button"
                onClick={() => field.ref.click()} // Trigger file input click on button click
              >
                Select Images
              </button>
              {/* {field.value.map((image, index) => (
                <div key={index}>
                  <img src={URL.createObjectURL(image)} alt={`Image ${index}`} height='100' width='100'/>
                  <button onClick={() => removeImage(field, URL.createObjectURL(image))}>Remove</button>
                </div>
              ))} */}
              {selectedImages.map((imageUrl) => (
          <div key={imageUrl} style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
            <img src={imageUrl} alt="Selected" width="100" height="100" />
            <button onClick={() => removeImage(imageUrl)} style={{
      marginLeft: 10, // Add left margin to create some spacing
      padding: '5px 10px', // Add padding for better button appearance
      backgroundColor: 'red', // Background color
      color: 'white', // Text color
      border: 'none', // Remove the default button border
      borderRadius: 5, // Add rounded corners
      cursor: 'pointer', // Change cursor on hover
    }}>Remove</button>
          </div>
        ))}
            </>
          )}
        />
        {errors.images && <p className="errorText">{errors.images.message}</p>}
      </div>

      <button type="submit" className="add-product-button">{dataItem ? 'Edit Product' : 'Add Product'}</button>
  </form>
        </div>
    )
}

export default AddProduct
