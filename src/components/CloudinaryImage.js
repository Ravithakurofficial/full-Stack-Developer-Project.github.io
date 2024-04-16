import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const CloudinaryImage = ({ publicId }) => {
  const cloudinary = new Cloudinary({ cloud: { cloudName: 'dprhhjdku' } }); // Replace 'your-cloud-name' with your Cloudinary cloud name
  const myImage = cloudinary.image(publicId, { transformation: { resize: fill().width(100).height(150) } });

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default CloudinaryImage;
