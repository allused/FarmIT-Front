import React from "react";
import "../styles/FarmCard.css";

const FarmCard = ({ farm, handleDelete }) => {
  const formattedDate = new Date(farm.created_at).toLocaleDateString("hu-HU");
  console.log(farm);
  return (
    <div className="farm-card">
      <div className="farm-card-header">
        <h3>{farm.farm_type} Farm</h3>
        <p className="creation-date">Created on: {formattedDate}</p>
      </div>
      <div className="farm-card-body">
        <p>
          <strong>Area:</strong> {farm.farm_area} acres
        </p>
        <p>
          <strong>Trap Count:</strong> {farm.trap_count}
        </p>
        <button
          className="delete-farm-btn"
          onClick={() => handleDelete(farm.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FarmCard;
