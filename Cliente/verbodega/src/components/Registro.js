import React from "react";

export default function Registro(props) {
  const {
    temperatura,
    humedad,
    co2,
    lpg,
    smoke,
    date,
    id,
    dipositivo,
  } = props.object;
  console.log(props);

  return (
    <tr>
      <td>{dipositivo}</td>
      <td>{temperatura}</td>
      <td>{humedad}</td>
      <td>
        {co2 > 0 ? (
          <div className="alert alert-danger"> {co2} </div>
        ) : (
          <div className="alert alert-success"> {co2} </div>
        )}
      </td>
      <td>
        {smoke > 0 ? (
          <div className="alert alert-danger"> {smoke} </div>
        ) : (
          <div className="alert alert-success"> {smoke} </div>
        )}
      </td>
      <td>
        {lpg > 0 ? (
          <div className="alert alert-danger"> {lpg} </div>
        ) : (
          <div className="alert alert-success"> {lpg} </div>
        )}
      </td>
      <td>{date}</td>
    </tr>
  );
}
