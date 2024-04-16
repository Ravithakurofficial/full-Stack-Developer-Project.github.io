import React from "react";

const Banner = () => {
    return (
        <div className="bg-customYellow p-8 font-sans">
            <img src="/image.png" alt="dribbble" />
            <h2 className="text-2xl font-bold text-yellow-900 mt-4">
                Discover the world's top<br />Designers & Creatives.
            </h2>
            {/* Adjusted image size using responsive width and custom height */}
            <img className="w-full sm:w-3/4 md:w-2/3 lg:w-full h-auto" src="/banner.png" alt="Banner" style={{ minHeight: '60vh', minWidth: '40vw', marginLeft: "-125px"}} />
            <br />
            <h3 className="text-sm text-yellow-900 mt-2">Art by <u>Peter Tarka</u></h3>
        </div>
    );
}

export default Banner;
