import React from "react";
import Add from "../Components/Add";

function Home() {
  // const [uploadContactServerResponse,setUploadContactServerResponse] = useState({})

  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <h1>Add to Contact Details</h1>
      <div>
        <Add />
      </div>
    </div>
  );
}

export default Home;
