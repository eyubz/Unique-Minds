import React from "react";
import imgEducator1 from "../Assets/teacher1.jpg";

const educators = [
  {
    id: 1,
    name: "Jane Doe",
    image: imgEducator1,
    rank: 1,
  },
  {
    id: 2,
    name: "John Smith",
    image: imgEducator1,
    rank: 2,
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: imgEducator1,
    rank: 3,
  },
];

const TopEducators = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md mt-10 mb-10">
      <h2 className="text-center text-3xl font-bold mb-8">
        Top 3 Educators of the Month
      </h2>
      <div className="flex justify-between items-end gap-8">
        {educators.map((educator) => (
          <div
            key={educator.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-110 hover:shadow-xl ${
              educator.rank === 1 ? "scale-110" : "scale-100"
            }`}
            style={{
              marginTop: educator.rank === 1 ? "-20px" : "0",
              zIndex: educator.rank === 1 ? "10" : "1",
            }}
          >
            <img
              src={educator.image}
              alt={educator.name}
              className="w-48 h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{educator.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEducators;
