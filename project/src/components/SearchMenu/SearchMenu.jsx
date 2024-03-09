import React, { useState, useEffect } from "react";
import './SearchMenu.css';
import axios from "axios";

  const SearchMenu = () => {
    const [users, setUsers] = useState([]);
    const [req, setReq] = useState({
      Institutes: "",
      Specialist: ""
    });
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [selectedSpecialist, setSelectedSpecialist] = useState('');
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const result = await axios.get("http://localhost:3000/project/src/Inst.php");
      setUsers(result.data.reverse());
    };
  
    const selectInstetut = async (e) => {
      setSelectedInstitute(e.target.value);
      let name = e.target.name;
      let value = e.target.value;
      req[name] = value;
      var data = value;
  
      var response = fetch("http://localhost:3000/project/src/Specialist.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data }),
      }).then(function (response) {
        return response.json();
      })
        .then(function (myJson) {
          setReq(myJson)
        })
    };
  
    const selectSpecialist = (e) => {
      setSelectedSpecialist(e.target.value);
      let name = e.target.name;
      let value = e.target.value;
      req[name] = value;
    };
  
    return {
      users,
      req,
      selectedInstitute,
      selectedSpecialist,
      loadUsers,
      selectInstetut,
      selectSpecialist,
    };
  };

export default SearchMenu;



{/*
import React, { useState, useEffect } from "react";
import './SearchMenu.css';
import axios from "axios";

const SearchMenu = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [req, setReq] = useState({
    Institutes: "",
    Specialist: ""
  });
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3000/project/src/Inst.php");
    setUsers(result.data.reverse());
  };

  const selectInstetut = async (e) => {
    setSelectedInstitute(e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    req[name] = value;
    var data = value;

    var response = fetch("http://localhost:3000/project/src/Specialist.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data }),
    }).then(function (response) {
      return response.json();
    })
      .then(function (myJson) {
        setReq(myJson)
      })
  };

  const selectSpecialist = (e) => {
    setSelectedSpecialist(e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    req[name] = value;
  };

  return {
    users,
    req,
    selectedInstitute,
    selectedSpecialist,
    loadUsers,
    selectInstetut,
    selectSpecialist,
  };
};

export default SearchMenu; */}