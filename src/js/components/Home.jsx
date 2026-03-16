import React from "react";
import Formulario from './Formulario';
import './Home.css';
//import App from "../services/App";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    return (
        <div className="text-center">           

            <h1 className="text-center mt-5">Lista de Tareas</h1>
            <Formulario/>
        </div>
    );
};

export default Home;
