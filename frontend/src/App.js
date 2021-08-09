import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
    return (
        <div id="app" className="app">
            <Header />
            <Footer />
        </div>
    );
}

export default App;
