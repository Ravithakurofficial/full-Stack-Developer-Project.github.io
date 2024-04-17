import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

function CreateProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [email, setEmail] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // Define imagePreviewUrl state

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreviewUrl(reader.result); // Set imagePreviewUrl when file is selected
        };
        if (file) {
            reader.readAsDataURL(file);
        }
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
            setImagePreviewUrl(null); // Reset imagePreviewUrl after submission
        }
    };

    React.useEffect(() => {
        if (location.state && location.state.id) {
            setEmail(location.state.id);
        }
    }, [location.state]);
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="">
                <img
                    src="/sch.png"
                    alt="Dribbble Logo"
                    className="w-40 h-40 mb-4"
                    style={{ marginLeft: "3%", marginTop: "1%px" }}
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-2 " style={{ marginLeft: "25%" }}>Welcome! Let's Create Your Profile</h2>
                <p className="text-sm text-gray-600 mb-4" style={{ marginLeft: "25%" }}>Let others get to know you better! You can do this later.</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md" style={{ marginLeft: "25%" }}>
                <br />
                <h1>Add An Avatar</h1>
                {/* Avatar and Choose Image Button */}
                <div className="flex items-center justify-center mb-4">
                    <div className="mr-4">
                        {imagePreviewUrl ? (
                            <img
                                src={imagePreviewUrl}
                                alt="Avatar"
                                className="ml-0 rounded-full"
                                style={{ height: "30%", width: "40%", borderRadius: "50%" }}
                            />
                        ) : (
                            <img
                                src="/photoicon.png"
                                alt="Photo Icon"
                                className="ml-0 rounded-full"
                                style={{ height: "80%", width: "80%", borderRadius: "50%" }}
                            />
                        )}
                    </div>
                    <label htmlFor="profileImage" className="cursor-pointer bg-white-200 rounded-full px-8 py-2 border border-gray-300">
                        Choose Image
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    <br />
                </div>
                <p className="text-sm text-gray-600 mb-4" style={{marginLeft : "58%", marginTop : "-15%"}}> > or choose one of our defaults </p>
                <br />
                <br />
                <br />
                <br />
                {/* Location Input */}
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Add your location:</label>
                    <input
                        type="text"
                        id="location"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        className="w-full h-10 border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        placeholder="Enter your location"
                        />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-half bg-customPink text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Create Profile
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateProfile;
