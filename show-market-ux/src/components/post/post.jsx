import React, { useState, useRef } from 'react';

const Post = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const dragIndex = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    const dt = new DataTransfer();
    newImages.forEach(file => dt.items.add(file));
    if (fileInputRef.current) {
      fileInputRef.current.files = dt.files;
    }
  };

  const handleDragStart = (e, index) => {
    dragIndex.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIdx = dragIndex.current;
    if (dragIdx === null || dragIdx === dropIndex) return;
    const newImages = [...images];
    const [draggedImage] = newImages.splice(dragIdx, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    setImages(newImages);
    dragIndex.current = null;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('description', description);
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:8080/api-post/create-post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Listing posted successfully!');
        console.log('Posted:', result);
        // Reset form
        setTitle('');
        setPrice('');
        setCategory('');
        setCondition('');
        setDescription('');
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        alert('Error posting listing: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error posting listing: ' + error.message);
    }
  };

  return (
    <section style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>Post a New Listing</h2>
          <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              list="categories"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <datalist id="categories">
              <option value="Electronics" />
              <option value="Furniture" />
              <option value="Clothing" />
              <option value="Vehicles" />
              <option value="Other" />
            </datalist>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="condition" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Condition:</label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer'
              }}
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="images" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Images:</label>
            <input
              ref={fileInputRef}
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              {images.map((image, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    cursor: 'grab',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      backgroundColor: 'rgba(255, 0, 0, 0.8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Post Listing
          </button>
          </form>
        </div>
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: '2rem',
          height: 'fit-content'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Preview</h3>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#fafafa'
          }}>
            {images.length > 0 && (
              <div style={{ marginBottom: '1rem', position: 'relative' }}>
                <img
                  src={URL.createObjectURL(images[currentImageIndex])}
                  alt="Main preview"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0'
                  }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            )}
            <h4 style={{ margin: '0 0 0.3rem 0', color: '#333', fontSize: '1.1rem' }}>{title || 'Your Title Here'}</h4>
            <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#007bff', margin: '0 0 0.3rem 0' }}>
              ${price || '0'}
            </p>
            <p style={{ margin: '0 0 0.3rem 0', color: '#666', fontSize: '0.9rem' }}>
              Condition: {condition || 'Not specified'}
            </p>
            <p style={{ margin: '0 0 0.3rem 0', color: '#666', fontSize: '0.9rem' }}>
              Category: {category || 'Not specified'}
            </p>
            <p style={{ margin: '0', color: '#333', fontSize: '0.9rem' }}>
              {description || 'Your description will appear here...'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
