import React from 'react'
import "./Pokemon.css"
function Pokemon({datos}) {
  return (
    <div
          className="card">
          <h3>
            {datos.name} (#{datos.id})
          </h3>
          <img src={datos.image} alt={datos.name} />
          <p>Height: {datos.height / 10} m</p>
          <p>Weight: {datos.weight / 10} kg</p>
          <p>Type(s): {datos.types.join(", ")}</p>
          <p>Abilities: {datos.abilities.join(", ")}</p>
        </div>
  )
}

export default Pokemon