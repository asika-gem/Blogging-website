import dotenv from "dotenv";
dotenv.config();

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY, 
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
//  Storage service for image uploads
export const uploadFile = async (buffer, fileName = "file.jpg") => {
  try {
    const response = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${fileName}`,
    });

    return response;
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw new Error("Image upload failed");
  }
};
