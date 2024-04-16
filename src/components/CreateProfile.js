import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";

function CreateProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [email, setEmail] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!image) {
                alert("Please select an image");
                return;
            }

            const cloudName = 'dprhhjdku'; // Replace with your Cloudinary cloud name
            const cloudinary = new Cloudinary({ cloud: { cloudName } });
            const apiEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'ipglqofh'); // Replace with your Cloudinary upload preset
            formData.append('name', email); // Set name in Cloudinary as email
            formData.append('public_id', email); // Set public ID in Cloudinary as email

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            console.log("Image uploaded to Cloudinary:", data.secure_url);
            alert("Image uploaded successfully!");

            // Navigate to /home with email as state
            navigate("/home", { state: { email } });

        } catch (error) {
            console.error('Error uploading image:', error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setImage(null);
        }
    };

    // Extract email from location state when component mounts
    React.useEffect(() => {
        if (location.state && location.state.id) {
            setEmail(location.state.id);
        }
    }, [location.state]);

    return (
        <div>
            <h2>Create Profile</h2>
            <h1>Hello {email}, welcome to the home</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {image && (
                <div>
                    <h3>Preview:</h3>
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Profile Preview"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                </div>
            )}
        </div>
    );
}

export default CreateProfile;
