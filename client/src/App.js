import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

const App = () => {
  const [sectorsData, setSectorsData] = useState([]);
  const [sectorsParentData, setSectorsParentData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [childSector, setChildSector] = useState(null);
  const [agree, setAgree] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // Fetch sectors data and the parent sectors from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/sectors");
        setSectorsData(response.data);
        const responseParent = await axios.get("/api/data/parentSectors");
        setSectorsParentData(responseParent.data);
      } catch (error) {
        console.error("Error fetching sectors data:", error);
      }
    };

    fetchData();
  }, [reload]);

  useEffect(() => {
    // Set the default selected value when sectorsParentData changes
    if (sectorsParentData.length > 0 && !selectedParent) {
      setSelectedParent(sectorsParentData[0].value);
    }
  }, [sectorsParentData, selectedParent]);

  const renderOptions = (options) => {
    return options.map((option) => {
      if (option.children && option.children.length > 0) {
        return (
          <optgroup key={option.value} label={option.label}>
            {renderOptions(option.children)}
          </optgroup>
        );
      } else {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      }
    });
  };

  const generateHierarchy = () => {
    const hierarchy = [];

    sectorsData.forEach((option) => {
      if (!option.parent) {
        hierarchy.push({ ...option, children: [] });
      } else {
        const parent = hierarchy.find((item) => item.value === option.parent);
        if (parent) {
          parent.children.push({ ...option, children: [] });
        }
      }
    });

    return hierarchy;
  };

  const hierarchicalData = generateHierarchy();

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleChildSectorChange = (event) => {
    setChildSector(event.target.value);
  };

  const toggleAgree = () => {
    setAgree((prevAgree) => !prevAgree);
  };

  const handleParentChange = (event) => {
    setSelectedParent(event.target.value);
  };

  const resetForm = () => {
    setAgree(false);
    setSelectedParent(null);
    setChildSector("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/api/data/saveNewSector", {
        label: childSector,
        agree: agree,
        parent: selectedParent,
      });
      resetForm();
      setReload(true);
      alert("Data Saved Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-form-container dark-theme">
      <h2 className="form-title">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h2>

      <div className="form-group">
        <label htmlFor="sectors">Sectors:</label>

        <select id="sectors" className="form-control">
          {renderOptions(hierarchicalData)}
        </select>
      </div>

      <div className="form-group-check">
        <input
          type="checkbox"
          id="agree"
          onChange={toggleAgree}
          className="form-checkbox"
        />
        <label htmlFor="agree" className="checkbox-label">
          Agree to terms
        </label>
      </div>

      <div className="form-group">
        <input
          type="button"
          value="Add a child sector"
          className="btn-submit"
          onClick={toggleForm}
        />
      </div>
      {showForm && (
        <form className="my-form" onSubmit={handleSubmit}>
          <div>
            {" "}
            <select
              id="parents"
              className="form-control"
              value={selectedParent}
              onChange={handleParentChange}
            >
              {sectorsParentData.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <div className="form-group-text">
              <input
                type="text"
                placeholder="Enter a child sector here"
                value={childSector}
                onChange={handleChildSectorChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Save child sector"
                className="btn-submit"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
