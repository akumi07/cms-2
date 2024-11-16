import React, { useState } from 'react';
import { Widget } from '@uploadcare/react-widget';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Ensure your firebase.js is correctly configured
import Navbar from '../Navbar';

const AddCar = () => {
  const [carName, setCarName] = useState('');
  const [carType, setCarType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  // Handle image upload from Uploadcare
  const handleImageChange = async (fileGroup) => {
    if (fileGroup) {
      const uploadedFiles = await fileGroup.files().then((files) => 
        Promise.all(files.map((file) => file.cdnUrl))
      );
      setImages(uploadedFiles);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      await addDoc(collection(db, "cars"), {
        carName,
        carType,
        description,
        images,
      });
      alert("Car added successfully!");
      setCarName('');
      setCarType('');
      setDescription('');
      setImages([]);
    } catch (error) {
      console.error("Error adding car: ", error);
      alert("Failed to add car. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10 mb-10 sm:p-4 md:p-8 lg:p-10">
        <h2 className="text-2xl font-semibold text-center mb-6 sm:text-xl lg:text-3xl">Add New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Car Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="carName">
              Car Name
            </label>
            <input
              type="text"
              id="carName"
              name="carName"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
              placeholder="Enter car name"
              required
            />
          </div>

          {/* Car Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="carType">
              Car Type
            </label>
            <select
              id="carType"
              name="carType"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
              required
            >
              <option value="">Select Car Type</option>
              <option value="sedan">Sedan</option>
              <option value="civic">Civic</option>
              <option value="xuv">XUV</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
              rows="4"
              placeholder="Enter car description"
              required
            />
          </div>

          {/* Image Upload */}
           <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="images">
              Upload Images (Max 10)
            </label>
            <Widget
              publicKey="e91f4fa2f7f73440966c" // Replace with your Uploadcare public key
              multiple
              imagesOnly
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            <p className="mt-2 text-xs text-gray-500">You can upload up to 10 images.</p>
          </div> 

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// // export default AddCar;
// import React, { useState } from 'react';
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../firebase/firebase"; // Ensure your firebase.js is correctly configured
// import Navbar from '../Navbar';

// const AddCar = () => {
//   const [carName, setCarName] = useState('');
//   const [carType, setCarType] = useState('');
//   const [description, setDescription] = useState('');

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Add car details to Firebase
//       await addDoc(collection(db, "cars"), {
//         carName,
//         carType,
//         description,
//       });

//       // Success message and reset form
//       alert("Car added successfully!");
//       setCarName('');
//       setCarType('');
//       setDescription('');
//     } catch (error) {
//       console.error("Error adding car:", error);
//       alert("Failed to add car. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10 mb-10 sm:p-4 md:p-8 lg:p-10">
//         <h2 className="text-2xl font-semibold text-center mb-6 sm:text-xl lg:text-3xl">Add New Car</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Car Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="carName">
//               Car Name
//             </label>
//             <input
//               type="text"
//               id="carName"
//               name="carName"
//               value={carName}
//               onChange={(e) => setCarName(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
//               placeholder="Enter car name"
//               required
//             />
//           </div>

//           {/* Car Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="carType">
//               Car Type
//             </label>
//             <select
//               id="carType"
//               name="carType"
//               value={carType}
//               onChange={(e) => setCarType(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
//               required
//             >
//               <option value="">Select Car Type</option>
//               <option value="sedan">Sedan</option>
//               <option value="civic">Civic</option>
//               <option value="xuv">XUV</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
//               rows="4"
//               placeholder="Enter car description"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 sm:py-1 sm:text-sm lg:py-3 lg:text-lg"
//             >
//               Add Car
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddCar;
