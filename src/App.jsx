import React from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Download from "./components/Download";
import About from "./components/About";

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Download />
    </main>
  );
};

export default App;
