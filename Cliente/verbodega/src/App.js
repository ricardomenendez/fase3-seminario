import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HolaMundo from "./components/HolaMundo";
import TablaRegistro from "./components/TablaRegistro";
import Demo from "./components/GraficaLinea";
import Demo2 from "./components/GraficaLinea2";
import axios from "axios";

const data2 = [
  { disp: "VerBodega1", temp: 31, hum: 87, gas: 230 },
  { disp: "VerBodega1", temp: 32, hum: 87, gas: 230 },
  { disp: "VerBodega1", temp: 31, hum: 90, gas: 330 },
  { disp: "VerBodega1", temp: 34, hum: 92, gas: 331 },
  { disp: "VerBodega1", temp: 32, hum: 88, gas: 322 },
  { disp: "VerBodega1", temp: 31, hum: 89, gas: 280 },
  { disp: "VerBodega1", temp: 33, hum: 85, gas: 301 },
  { disp: "VerBodega1", temp: 31, hum: 87, gas: 230 },
  { disp: "VerBodega1", temp: 31, hum: 87, gas: 230 },
];

function App() {
  const [datos = [], setDatos] = useState();

  useEffect(() => {
    axios
      .get(
        "https://gys3v1rzp9.execute-api.us-east-1.amazonaws.com/Test//getBodega"
      )
      .then((res) => {
        setDatos(
          res.data.Items.sort(function (a, b) {
            return a.id - b.id;
          })
        );
        console.log(datos);
      });
  }, []);

  function getDat() {
    axios
      .get(
        "https://gys3v1rzp9.execute-api.us-east-1.amazonaws.com/Test//getBodega"
      )
      .then((res) => {
        return res.data.Items.sort(function (a, b) {
          return a.id - b.id;
        });
      });
  }
  return (
    <div>
      <ul class="nav justify-content-center bg-success text-white">
        <li class="nav-item">
          <h1 class="nav-link active">VerBodega</h1>
        </li>
      </ul>
      <div>
        <div className="row">
          <div className="col-xl-6" align="center">
            <div className="row card">
              <div className="col" align="center">
                <h2 className="card-title">Humedad</h2>
                <div className="card-body">
                  <Demo2 data={datos} />
                </div>
              </div>
            </div>

            <div className="row card" align="center">
              <h2 className="card-title">Temperatura</h2>
              <div className="card-body">
                <Demo data={datos} />
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card row">
              <div className="card-body">
                <h3 className="card-title"> Temperatura </h3>
                <h4 className="card-text">
                  {" "}
                  {datos[datos.length - 1] == undefined
                    ? "NaN"
                    : datos[datos.length - 1].temperatura}{" "}
                </h4>
              </div>
            </div>

            <div className="card row">
              <div className="card-body">
                <h3 class="card-title"> Humedad </h3>
                <h4 class="card-text">
                  {" "}
                  {datos[datos.length - 1] == undefined
                    ? "NaN"
                    : datos[datos.length - 1].humedad}{" "}
                </h4>
              </div>
            </div>
            <div className="card row">
              <div className="card-body">
                <h3 class="card-title"> CO2 </h3>
                <h4 class="card-text">
                  {" "}
                  {datos[datos.length - 1] == undefined
                    ? "NaN"
                    : datos[datos.length - 1].co2}{" "}
                </h4>
              </div>
            </div>

            <div className="card row">
              <div className="card-body">
                <h3 class="card-title"> LPG </h3>
                <h4 class="card-text">
                  {" "}
                  {datos[datos.length - 1] == undefined
                    ? "NaN"
                    : datos[datos.length - 1].lpg}{" "}
                </h4>
              </div>
            </div>

            <div className="card row">
              <div className="card-body">
                <h3 class="card-title"> Humo </h3>
                <h4 class="card-text">
                  {" "}
                  {datos[datos.length - 1] == undefined
                    ? "NaN"
                    : datos[datos.length - 1].smoke}{" "}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2"> </div>
          <div className="col-lg-8">
            <TablaRegistro data={datos} />
          </div>
          <div className="col-lg-2"> </div>
        </div>
      </div>
    </div>
  );
}

export default App;
