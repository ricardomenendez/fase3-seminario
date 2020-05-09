import React from "react";
import Registro from "./Registro";

const elements = [];
export default function TablaRegistro(props) {
  const data = props.data.reverse();
  const content = () => {
    data.forEach((element) => {
      console.log(element);
      elements.push(<Registro object={element} />);
    });
    return elements;
  };
  return (
    <div>
      <h2 align="center"> Datos </h2>
      <table className="table">
        <thead>
          <tr>
            <td> Dispositivo </td>
            <td> Temperatura </td>
            <td> Humedad </td>
            <td> CO2 </td>
            <td> Smoke </td>
            <td> LPG </td>
            <td> Fecha </td>
          </tr>
        </thead>
        <tbody>{content()}</tbody>
      </table>
    </div>
  );
}
