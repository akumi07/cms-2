import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Assuming you're using Firebase for authentication
import Navbar from './Navbar';

function ProductListPage() {
  const [cars, setCars] = useState([]); // State to store cars
  const [searchQuery, setSearchQuery] = useState(''); // State to store search input
  const [filteredCars, setFilteredCars] = useState([]); // State for filtered cars
  const navigate = useNavigate();

  // Fetch cars created by the logged-in user
  const fetchCars = async () => {
    const user = auth.currentUser;
    if (user) {
      // Replace with actual API call to fetch the user's cars from the database
      const userCars = [
        { id: 1, name: 'Car 1', model: 'Model 1', userId: user.uid },
        { id: 2, name: 'Car 2', model: 'Model 2', userId: user.uid },
        { id: 3, name: 'Car 3', model: 'Model 3', userId: user.uid },
        // Example cars
      ];
      setCars(userCars);
      setFilteredCars(userCars); // Set the filtered cars initially as all cars
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  // Handle search query change and filter cars based on search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = cars.filter(car =>
      car.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      car.model.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  // Fetch cars when component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">My Cars</h1>

        <div className="mb-4 flex justify-between items-center">
          <div className="w-1/2">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search cars by name or model..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button
            onClick={() => navigate('/addCar')} // Redirect to add car page
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Car
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition">
                <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
                <p className="text-sm text-gray-600">{car.model}</p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/editCar/${car.id}`)} // Redirect to edit car page
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit Car
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No cars found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
