import React from "react";
import SegmentForm from "./components/segmentForm";


function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center mt-10">Segment Management</h1>
      <div className="flex justify-center mt-6">
   <SegmentForm />
      </div>
    </div>
  );
}

export default App;
