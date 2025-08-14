// src/utils/downloadUtils.js

/**
 * Downloads the APK file for the user
 * @param {string} apkUrl - URL or path to the APK file
 * @param {string} fileName - Name for the downloaded file
 * @returns {Promise<boolean>} - Success status
 */
export const downloadAPK = async (apkUrl = '/assets/Diabeater.apk', fileName = 'Diabeater.apk') => {
    try {
        // Method 1: Direct download link (if APK is hosted on your server)
        const link = document.createElement('a');
        link.href = apkUrl;
        link.download = fileName;
        link.target = '_blank';
        
        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('APK download initiated');
        return true;
    } catch (error) {
        console.error('Error downloading APK:', error);
        return false;
    }
};

/**
 * Downloads APK from a remote URL (if hosted elsewhere)
 * @param {string} url - Remote URL of the APK
 * @param {string} fileName - Name for the downloaded file
 */
export const downloadAPKFromURL = async (url, fileName = 'Diabeater.apk') => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(downloadUrl);
        
        console.log('APK download completed');
        return true;
    } catch (error) {
        console.error('Error downloading APK from URL:', error);
        return false;
    }
};

/**
 * Trigger automatic APK download after successful verification
 * @param {Function} onSuccess - Callback for successful download
 * @param {Function} onError - Callback for download error
 */
export const triggerAutoDownload = async (onSuccess, onError) => {
    try {
        // Wait a moment for UI to update
        setTimeout(async () => {
            const success = await downloadAPK();
            if (success && onSuccess) {
                onSuccess();
            } else if (!success && onError) {
                onError('Download failed. Please try the manual download button.');
            }
        }, 1000);
    } catch (error) {
        if (onError) onError(error.message);
    }
};