import React, { useEffect } from 'react'
import axios from 'axios';

export default function API() {

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:8081/api/login').then(function(response) {
            console.log(response.data);
            })
    }

   
  return (
    <div>API</div>
  )
}
