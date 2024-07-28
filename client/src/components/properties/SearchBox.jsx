import React, { useState } from "react";
import AsyncSelect from "react-select/async";
const SearchBox = () => {
  const [selectedCategory, setSelectedCategory] = useState("PG");
  const [rentDetails, setRentDetails] = useState({
    category:"rent",
    location: null,
    bhkType: "",
    budget: "",
  });
  const [pgDetails, setPgDetails] = useState({
    category:"pg",
    location: null,
    occupancyType: "",
    budget: "",
  });
  const [plotDetails, setPlotDetails] = useState({
    category:"plot",
    location: null,
    useType: "",
    budget: "",
  });
console.log(rentDetails);
  // const logSearchDetails = () => {
  //   switch (selectedCategory) {
  //     case "PG":
  //       console.log(pgDetails);
  //       break;
  //     case "Rent":
  //       console.log(rentDetails);
  //       break;
  //     case "Plot":
  //       console.log(plotDetails);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className="container mx-auto h-screen pt-[20vh] bg-[url('https://plus.unsplash.com/premium_photo-1661962462805-3bdae6487873?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <h1 className="text-4xl font-bold text-center text-white mb-6 font-[roboto]">
        Find a home away from home
      </h1>
      <div className="flex justify-center mb-4">
        <div className="relative bg-gray-100 rounded-full p-2 flex">
          <CategoryButton
            category="PG"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <CategoryButton
            category="Rent"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <CategoryButton
            category="Plot"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
      <SearchBar
        category={selectedCategory}
        setRentDetails={setRentDetails}
        setPgDetails={setPgDetails}
        setPlotDetails={setPlotDetails}
      />
      {/* <button
        onClick={logSearchDetails}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Log Search Details
      </button> */}
    </div>
  );
};

function CategoryButton({ category, selectedCategory, setSelectedCategory }) {
  const isSelected = selectedCategory === category;

  return (
    <button
      className={`px-5 py-1 mx-1 transition-all duration-300 ease-in-out   ${
        isSelected ? "text-red-500" : "text-gray-500"
      }`}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
      <div
        className={`border-b-2 transition-all duration-300 ease-in-out  ${
          isSelected ? "border-red-500" : "border-transparent"
        }`}
      ></div>
    </button>
  );
}

function SearchBar({ category, setRentDetails, setPgDetails, setPlotDetails }) {
  const metropolitanCities = [
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Pune", label: "Pune" },
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Noida", label: "Noida" },
    { value: "Dehradun", label: "Dehradun" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Hyderabad", label: "Hyderabad" },
  ];

  const loadOptions = (inputValue, callback) => {
    // GeoNames API call
    fetch(
      `http://api.geonames.org/searchJSON?name_startsWith=${inputValue}&maxRows=10&username=priyanshu22275`
    )
      .then((response) => response.json())
      .then((data) => {
        const options = data.geonames.map((city) => ({
          value: city.name,
          label: city.name,
        }));
        callback(options);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        callback([]);
      });
  };

  const handleLocationChange = (selectedOption) => {
    if (category === "Rent") {
      setRentDetails((prevDetails) => ({
        ...prevDetails,
        location: selectedOption,
      }));
    } else if (category === "PG") {
      setPgDetails((prevDetails) => ({
        ...prevDetails,
        location: selectedOption,
      }));
    } else if (category === "Plot") {
      setPlotDetails((prevDetails) => ({
        ...prevDetails,
        location: selectedOption,
      }));
    }
  };

  const handleBhkTypeChange = (event) => {
    setRentDetails((prevDetails) => ({
      ...prevDetails,
      bhkType: event.target.value,
    }));
  };

  const handleBudgetChange = (event) => {
    if (category === "Rent") {
      setRentDetails((prevDetails) => ({
        ...prevDetails,
        budget: event.target.value,
      }));
    } else if (category === "PG") {
      setPgDetails((prevDetails) => ({
        ...prevDetails,
        budget: event.target.value,
      }));
    } else if (category === "Plot") {
      setPlotDetails((prevDetails) => ({
        ...prevDetails,
        budget: event.target.value,
      }));
    }
  };

  const handleOccupancyChange = (event) => {
    setPgDetails((prevDetails) => ({
      ...prevDetails,
      occupancyType: event.target.value,
    }));
  };

  const handleUseTypeChange = (event) => {
    setPlotDetails((prevDetails) => ({
      ...prevDetails,
      useType: event.target.value,
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full md:w-1/2 bg-gray-100 p-3 border rounded-full flex items-center">
        {category === "Rent" ? (
          <>
            <AsyncSelect
              className="w-1/3 mr-2"
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions={metropolitanCities}
              placeholder="Location"
              isClearable
              onChange={handleLocationChange}
            />
            <select
              className="border-2 border-gray-300 rounded-full p-2 w-1/3 mr-2"
              onChange={handleBhkTypeChange}
            >
              <option value="">Select BHK/Type</option>
              <option value="1BHK">1 BHK</option>
              <option value="2BHK">2 BHK</option>
              <option value="3BHK">3 BHK</option>
              <option value="4BHK">4 BHK</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>
            <select
              className="border-2 border-gray-300 rounded-full p-2 w-1/3 mr-2"
              onChange={handleBudgetChange}
            >
              <option value="">Select Budget</option>
              <option value="3000">3k</option>
              <option value="5000">5k</option>
              <option value="10000">10k</option>
              <option value="50000">50k</option>
              <option value="100000">1 lakh</option>
              <option value="300000">3 lakh</option>
              <option value="400000">4 lakh</option>
            </select>
          </>
        ) : category === "PG" ? (
          <>
            <AsyncSelect
              className="w-1/3 mr-2"
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions={metropolitanCities}
              placeholder="Location"
              isClearable
              onChange={handleLocationChange}
            />
            <select
              className="border-2 border-gray-300 rounded-full p-2 w-1/3 mr-2"
              onChange={handleOccupancyChange}
            >
              <option value="">Select Occupancy Type</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Shared">Shared</option>
              <option value="Alone">Alone</option>
            </select>
            <select
              className="border-2 border-gray-300 rounded-full p-2 w-1/3 mr-2"
              onChange={handleBudgetChange}
            >
              <option value="">Select Budget</option>
              <option value="3000">3k</option>
              <option value="5000">5k</option>
              <option value="10000">10k</option>
              <option value="50000">50k</option>
              <option value="100000">1 lakh</option>
              <option value="300000">3 lakh</option>
              <option value="400000">4 lakh</option>
            </select>
          </>
        ) : category === "Plot" ? (
          <>
            <AsyncSelect
              className="w-1/3 mr-2"
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions={metropolitanCities}
              placeholder="Location"
              isClearable
              onChange={handleLocationChange}
            />
            <select
              className="border-2 border-gray-300 rounded-full p-2 w-1/3 mr-2"
              onChange={handleUseTypeChange}
            >
              <option value="">Select Use Type</option>
              <option value="Commercial">Commercial</option>
              <option value="Personal">Personal</option>
            </select>
            <select
              className="border-2 border-gray-300 rounded-full p-2 w-1/3 mr-2"
              onChange={handleBudgetChange}
            >
              <option value="">Select Budget</option>
              <option value="3000">3k</option>
              <option value="5000">5k</option>
              <option value="10000">10k</option>
              <option value="50000">50k</option>
              <option value="100000">1 lakh</option>
              <option value="300000">3 lakh</option>
              <option value="400000">4 lakh</option>
            </select>
          </>
        ) : null}
        <button className="bg-red-500 text-white px-4 py-2 rounded-full ml-2">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
