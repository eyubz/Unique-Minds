import React from "react";
import img from "../Assets/educator.jpg";

const EducatorProfileDetail = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center md:flex-row">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <img
            src={img}
            alt="Profile"
            className="rounded-full w-40 h-40 mx-auto md:mx-0 mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">Ford Antonette</h1>
          <h2 className="text-lg text-gray-600">
            Senior Response Strategist, Executive Vice President of Admissions
          </h2>
        </div>

        <div className="w-full md:w-2/3 mt-8 md:mt-0 md:ml-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <ul>
              <li className="mb-4">
                <strong>Phone:</strong> (400) 139-9865
              </li>
              <li className="mb-4">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:fordantonette5@yahoo.com"
                  className="text-blue-500"
                >
                  fordantonette5@yahoo.com
                </a>
              </li>
              <li className="mb-4">
                <strong>Campus:</strong> IU Southeast
              </li>
              <li className="mb-4">
                <strong>Website:</strong>{" "}
                <a
                  href="https://mywebsite.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  mywebsite.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800">Education</h3>
        <ul className="mt-4 text-gray-600">
          <li className="mb-2">
            <strong>M.Arch.</strong> - Arch., Southern California Institute of
            Architecture, 2004
          </li>
          <li className="mb-2">
            <strong>B.A.</strong> - Sociology and Anthropology, Holy Cross
            College, 1995
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800">Interests</h3>
        <ul className="mt-4 text-gray-600 list-disc list-inside">
          <li>Architecture</li>
          <li>Social Impact Design</li>
          <li>Augmented and Virtual Reality</li>
          <li>Digital Fabrication</li>
          <li>Design Thinking</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800">About</h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quia, earum!
          Dolorum delectus magni aliquam nisi tempora quisquam ut? Odit placeat
          nam hic quia distinctio. Perferendis excepturi velit consectetur
          consequuntur rerum.
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Aperiam atque
          officia inventore, corrupti amet pariatur officiis. Uliam, ipsa
          doloremque obcaecati minima dignissimos ducimus, accusamus voluptas
          distinctio suscipit commod eligendi reiciendis? Lorem ipsum dolor sit
          amet.
        </p>
      </div>
    </div>
  );
};

export default EducatorProfileDetail;
