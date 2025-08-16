// src/utils/downloadUtils.js marketing

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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
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
 * @param {string} apkUrl - URL of the APK file
 * @param {string} fileName - Name of the APK file
 * @param {Function} onSuccess - Callback for successful download
 * @param {Function} onError - Callback for download error
 * @param {Function} onFallback - Callback to show fallback options
 */
export const triggerAutoDownload = async (apkUrl, fileName, onSuccess, onError, onFallback) => {
    try {
        // Wait a moment for UI to update
        setTimeout(async () => {
            let success = false;
            
            // Try direct download first
            if (apkUrl && apkUrl.startsWith('http')) {
                success = await downloadAPKFromURL(apkUrl, fileName);
            } else {
                success = await downloadAPK(apkUrl, fileName);
            }
            
            if (success && onSuccess) {
                onSuccess();
                
                // Show fallback after delay in case download doesn't work
                setTimeout(() => {
                    if (onFallback) onFallback();
                }, 8000);
            } else if (!success && onError) {
                onError('Download failed. Please try the manual download button.');
                if (onFallback) onFallback();
            }
        }, 1000);
    } catch (error) {
        if (onError) onError(error.message);
        if (onFallback) onFallback();
    }
};

/**
 * Enhanced download with retry mechanism
 * @param {Object} config - Download configuration
 * @param {string} config.apkUrl - URL of the APK file
 * @param {string} config.fileName - Name of the APK file
 * @param {string} config.fallbackUrl - Google Drive fallback URL
 * @param {Function} config.onProgress - Progress callback
 * @param {Function} config.onSuccess - Success callback
 * @param {Function} config.onError - Error callback
 * @param {Function} config.onFallback - Fallback callback
 */
export const downloadAPKWithFallback = async (config) => {
    const {
        apkUrl = '/assets/Diabeater.apk',
        fileName = 'Diabeater.apk',
        fallbackUrl = '',
        onProgress,
        onSuccess,
        onError,
        onFallback
    } = config;

    try {
        if (onProgress) onProgress('Starting download...');
        
        let downloadSuccess = false;
        
        // Try primary download method
        if (apkUrl.startsWith('http')) {
            downloadSuccess = await downloadAPKFromURL(apkUrl, fileName);
        } else {
            downloadSuccess = await downloadAPK(apkUrl, fileName);
        }
        
        if (downloadSuccess) {
            if (onProgress) onProgress('Download started successfully!');
            if (onSuccess) onSuccess();
            
            // Still show fallback after delay in case user has issues
            setTimeout(() => {
                if (onFallback) onFallback();
            }, 10000);
        } else {
            throw new Error('Primary download method failed');
        }
        
    } catch (error) {
        console.error('Download failed:', error);
        
        if (onError) onError(`Download failed: ${error.message}`);
        
        // Immediately show fallback options
        if (onFallback) onFallback();
        
        // If fallback URL is provided, offer to open it
        if (fallbackUrl) {
            setTimeout(() => {
                if (window.confirm('Would you like to try downloading from Google Drive instead?')) {
                    window.open(fallbackUrl, '_blank');
                }
            }, 2000);
        }
    }
};

/**
 * Open Google Drive fallback link
 * @param {string} fallbackUrl - Google Drive URL
 */
export const openFallbackLink = (fallbackUrl) => {
    if (fallbackUrl && fallbackUrl !== 'https://drive.google.com/file/d/your-file-id/view?usp=sharing') {
        window.open(fallbackUrl, '_blank');
        return true;
    } else {
        console.warn('No valid fallback URL provided');
        return false;
    }
};