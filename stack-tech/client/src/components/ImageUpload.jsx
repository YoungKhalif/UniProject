import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ 
  currentImage, 
  onImageSelect, 
  onImageUpload, 
  disabled = false,
  size = 'medium' 
}) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Call parent handler
    if (onImageSelect) {
      onImageSelect(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file || !onImageUpload) return;

    setUploading(true);
    try {
      await onImageUpload(file);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`image-upload ${size} ${disabled ? 'disabled' : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      
      <div 
        className={`upload-area ${dragOver ? 'drag-over' : ''} ${preview ? 'has-image' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!preview ? openFileDialog : undefined}
      >
        {preview ? (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
            <div className="image-overlay">
              <button 
                type="button"
                className="btn-change"
                onClick={openFileDialog}
                disabled={disabled}
              >
                Change
              </button>
              <button 
                type="button"
                className="btn-remove"
                onClick={handleRemove}
                disabled={disabled}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <p>Drop image here or click to browse</p>
            <span>Supports: JPG, PNG, GIF (max 5MB)</span>
          </div>
        )}
      </div>

      {onImageUpload && preview && (
        <div className="upload-actions">
          <button 
            type="button"
            className="btn-upload"
            onClick={handleUpload}
            disabled={uploading || disabled}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
