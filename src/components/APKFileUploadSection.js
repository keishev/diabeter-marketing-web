// src/components/APKFileUploadSection.js
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import './APKFileUploadSection.css';

const APKFileUploadSection = ({ 
    title, 
    currentAPKUrl, 
    onSave, 
    contentKey 
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.name.toLowerCase().endsWith('.apk')) {
            setError('Please select a valid APK file');
            return;
        }

        // Validate file size (max 100MB)
        const maxSize = 200 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            setError('APK file size must be less than 100MB');
            return;
        }

        try {
            setIsUploading(true);
            setError('');
            setSuccess('');

            // Delete old APK if exists
            if (currentAPKUrl) {
                try {
                    const oldRef = ref(storage, `assets/apk/diabeater.apk`);
                    await deleteObject(oldRef);
                } catch (deleteError) {
                    console.log('Old APK file not found or already deleted');
                }
            }

            // Upload new APK
            const storageRef = ref(storage, `assets/apk/diabeater.apk`);
            const uploadTask = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(uploadTask.ref);

            // Save the download URL
            await onSave(contentKey, downloadURL);
            
            setSuccess('APK uploaded successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            console.error('Error uploading APK:', error);
            setError('Failed to upload APK. Please try again.');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }

        // Clear the input
        event.target.value = '';
    };

    const handleDeleteAPK = async () => {
        if (!currentAPKUrl) return;
        
        if (!window.confirm('Are you sure you want to delete the current APK file?')) {
            return;
        }

        try {
            setIsUploading(true);
            setError('');

            // Delete from storage
            const storageRef = ref(storage, `assets/apk/diabeater.apk`);
            await deleteObject(storageRef);

            // Clear the URL from database
            await onSave(contentKey, '');
            
            setSuccess('APK deleted successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            console.error('Error deleting APK:', error);
            setError('Failed to delete APK. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="apk-upload-section">
            <h3 className="section-title">{title}</h3>
            
            <div className="upload-container">
                <div className="current-file-info">
                    {currentAPKUrl ? (
                        <div className="file-status success">
                            <span className="status-icon">✅</span>
                            <span>APK file uploaded and ready for download</span>
                            <button 
                                className="delete-button"
                                onClick={handleDeleteAPK}
                                disabled={isUploading}
                            >
                                Delete APK
                            </button>
                        </div>
                    ) : (
                        <div className="file-status empty">
                            <span className="status-icon">⚠️</span>
                            <span>No APK file uploaded</span>
                        </div>
                    )}
                </div>

                <div className="upload-controls">
                    <label className="file-input-label">
                        <input
                            type="file"
                            accept=".apk"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                            className="file-input"
                        />
                        <span className="file-input-button">
                            {isUploading ? 'Uploading...' : 'Choose APK File'}
                        </span>
                    </label>
                    
                    {isUploading && (
                        <div className="upload-progress">
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <span className="progress-text">Uploading...</span>
                        </div>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <div className="upload-guidelines">
                    <h4>Upload Guidelines:</h4>
                    <ul>
                        <li>File must be in .apk format</li>
                        <li>Maximum file size: 100MB</li>
                        <li>Uploaded APK will replace the existing one</li>
                        <li>File will be stored securely in Firebase Storage</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default APKFileUploadSection;