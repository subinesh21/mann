import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export class FirebaseImageService {
  static async uploadImage(file: File, path: string): Promise<string> {
    try {
      // Create a reference to the file location
      const storageRef = ref(storage, path);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
      throw new Error('Failed to upload image');
    }
  }

  static async uploadMultipleImages(files: File[], basePath: string): Promise<string[]> {
    try {
      const uploadPromises = files.map(async (file, index) => {
        const fileName = `${basePath}/${Date.now()}_${index}_${file.name}`;
        return await this.uploadImage(file, fileName);
      });
      
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw new Error('Failed to upload images');
    }
  }

  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract the path from the URL
      const path = this.extractPathFromUrl(imageUrl);
      if (!path) {
        throw new Error('Invalid image URL');
      }
      
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image from Firebase:', error);
      throw new Error('Failed to delete image');
    }
  }

  static extractPathFromUrl(url: string): string | null {
    try {
      // Extract path from Firebase Storage URL
      const regex = /\/o\/(.+?)(\?|$)/;
      const match = url.match(regex);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
      return null;
    } catch (error) {
      console.error('Error extracting path from URL:', error);
      return null;
    }
  }

  static generateImagePath(folder: string, fileName: string): string {
    return `${folder}/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  }
}

// Helper function for admin panel image uploads
export async function uploadProductImage(file: File, productId: string, imageType: string): Promise<string> {
  const path = FirebaseImageService.generateImagePath(`products/${productId}`, `${imageType}_${file.name}`);
  return await FirebaseImageService.uploadImage(file, path);
}

// Helper function for color variant images
export async function uploadColorImages(files: File[], productId: string, colorName: string): Promise<string[]> {
  const basePath = `products/${productId}/colors/${colorName}`;
  return await FirebaseImageService.uploadMultipleImages(files, basePath);
}