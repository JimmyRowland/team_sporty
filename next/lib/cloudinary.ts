export const cloudinary = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

const avatarPreset = "ax8ca8dq";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/df51z9s92/image/upload";

export const CloudinaryImageUpload = async (base64EncodedImage: string) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", base64EncodedImage);
        formData.append("upload_preset", avatarPreset);
        fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.secure_url !== "") {
                    resolve(data);
                }
            })
            .catch((err) => reject(err));
    });
};
