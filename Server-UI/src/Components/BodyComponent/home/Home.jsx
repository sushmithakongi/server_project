import React from "react";
import "./home.scss";
import Pie from "../charts/Pie";
import Dotnet from "../charts/Dotnet";
import Bar1 from "../charts/Bar";
const Home = () => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div className="home">
      {/* <Sidebar/> */}
      <h2
        style={{
          textAlign: "center",
          color: "black",
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        Server Usage Dashboard
      </h2>
      <div className="homeContainer">
        {/* <Navbar/> */}

        {/* <div className="widget"></div> */}
        <div className="dotnet">
          <Dotnet />
        </div>
        <div className="dotnet">
          <Pie />
        </div>
        <div className="pie">
          <Bar1 />
        </div>
        {/* <div className="homeContainer">
          <div className="charts"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
