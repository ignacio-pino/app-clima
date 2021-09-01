import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  // state principal

  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  // states para consultar a la api

  const [consulta, setConsulta] = useState(false);

  const [resultado, setResultado] = useState({});

  const [error, setError] = useState(false);

  //destructuring

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultaAPI = async () => {
      if (consulta) {
        const appId = "1cf7a9f9a4154aec1194adf02176dbb0";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        console.log(url);
        const api = await fetch(url);
        const frase = await api.json();
        setResultado(frase);
        setConsulta(false);

        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    consultaAPI();
  }, [consulta, ciudad, pais, resultado, setError]);

  let componente;

  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsulta={setConsulta}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
