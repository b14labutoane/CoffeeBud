import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/two_coffees.jpeg";
import '../components/Header';
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
      <Router>
        <div>
            <h1>hi</h1>
            <Header />
        </div>
      </Router>
      </div>
    </div>
  );
}

export default Home;