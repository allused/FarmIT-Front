import React, { useMemo } from "react";
import api from "../api";
import { useState, useEffect } from "react";
import { LoadingIndicator } from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import FarmCard from "../components/Farm";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [farms, setFarms] = useState([]);
  const [newFarm, setNewFarm] = useState({
    farm_area: 0,
    trap_count: 0,
    farm_type_id: 1,
    farm_raw_data: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    getFarms();
  }, []);

  const getFarms = () => {
    setIsLoading(true);
    api
      .get("/api/farms/")
      .then((resp) => resp.data)
      .then((data) => {
        setFarms(data);
        console.log("farm data: ", data);
      })
      .catch((error) => {
        console.log(error);

        alert("Error occured during fetching farms");
        if (error.response.status === 401) navigate("/login");
      })
      .finally(setIsLoading(false));
  };

  const deleteFarm = (id) => {
    api
      .delete(`/api/farms/delete/${id}`)
      .then((resp) => {
        if (resp.status === 204) alert("Farm deleted!");
        else alert("Failed to delete farm.");
        getFarms();
      })
      .catch((error) => {
        console.log(error);
        alert("An error occured during deleting a farm!");
      });
  };

  const createFarm = (event) => {
    event.preventDefault();
    api
      .post("api/farms/", newFarm)
      .then((resp) => {
        if (resp.status === 201) alert("Farm created!");
        else alert("Failed to create Farm!");
        getFarms();
      })
      .catch((error) => {
        console.log(error);
        alert("An error occured during creating a farm!");
      });
  };

  const handleChange = (event) => {
    setNewFarm({ ...newFarm, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h2>Farms</h2>
      <div className="farms-container">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          farms.map((farm) => (
            <FarmCard farm={farm} handleDelete={deleteFarm} key={farm.id} />
          ))
        )}
      </div>
      <form onSubmit={createFarm}>
        <label htmlFor="farm_area">Area</label>
        <br />
        <input
          type="number"
          name="farm_area"
          placeholder="10"
          id="farm_area"
          required
          onChange={handleChange}
          value={newFarm.farm_area}
        />
        <label htmlFor="trap_count">Trap count</label>
        <br />
        <input
          type="number"
          name="trap_count"
          placeholder="2"
          id="trap_count"
          required
          onChange={handleChange}
          value={newFarm.trap_count}
        />
        <input type="submit" id="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
