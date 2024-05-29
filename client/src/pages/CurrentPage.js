import React, { useEffect, useState } from "react";
import NavbarHeader from "../components/NavbarHeader/NavbarHeader";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
import Footer from "../components/Footer/Footer";
import axios from "axios";
// import data from "../data/data"; // LOCAL SAMPLE DATA

export default function CurrentPage() {
    const [projects, setProjects] = useState();
    const baseurl = 'http://localhost:4848/api/admin';

    useEffect(() => {
        // get data from BACKEND

        // axios.get(`${baseurl}/get-all-events`).then((response) => {
        //     setProjects(response.data);
        // });

        // axios.get(`${baseurl}/get-all-events`)
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });

        fetch(`${baseurl}/get-all-events`, {
            mode : "cors",
            headers : { 
                'crossorigin': true,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }}
         )
         .then((response) => response.json())
         .then((actualData) => {
            console.log(actualData);
            setProjects(actualData);
         })
         .catch((err) => {
             console.log(err.message);
         });
    
       }, []);

    return (
        <div className="App">
            <NavbarHeader />
            <ProjectContainer projects={ projects } state='current' />
            <Footer />
        </div>
    );
}