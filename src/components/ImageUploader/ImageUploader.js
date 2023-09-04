import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function ImageUploader({ errors, register }) {
  const [selectedImages, setSelectedImages] = useState([]);

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
  };

  return (
    <div>
      <label>Images</label>  
      <input
        type="file"
        name="images"
        multiple // Ensure the 'multiple' attribute is present
        onChange={handleImageSelect}
        {...register("images", {
            required: "At least one image is required",
          })}
      />
      <div className="selected-images">
        {selectedImages.map((image, index) => (
          <div key={index} className="selected-image">
            <img src={image.url} alt={`Image ${index}`} />
            <p>{image.file.name}</p>
          </div>
        ))}
      </div>
      {errors.images && <p>{errors.images.message}</p>}
    </div>
  );
}

export default ImageUploader;