import React from "react";
import imgFeature from "../../Assets/img.jpg";

const FeatureSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-blue-500 rounded-lg shadow-md mt-10">
      <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center">
        <img
          src={imgFeature}
          alt="Feature"
          className="w-full max-w-sm h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 md:pl-6 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Enhancing Learning Experience
        </h2>
        <p className="text-lg text-white">
          Our platform offers engaging and interactive content designed to make
          learning accessible and enjoyable. With features tailored to support
          students with Down syndrome, we ensure that every learner can thrive
          and reach their full potential.
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;
