import React from "react";
import Weather from "./components/Weather";

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Weather city="London" />
    </div>
  );
};

export default App;
