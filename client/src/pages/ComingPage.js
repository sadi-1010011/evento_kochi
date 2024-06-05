import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import moment from "moment";
import NavbarHeader from "../components/NavbarHeader/NavbarHeader";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
import checkDate from "../utility/checkDate";
import Loading from "../components/Loading/Loading";
// import data from "../data/data"; // SAMPLE DATA

export default function ComingPage() {

    const [projects, setProjects] = useState();
    const baseurl = 'http://localhost:4848/api/admin';      

    useEffect(() => {
        // get data from BACKEND
        fetch(`${baseurl}/get-all-events`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }}
         )
         .then((response) => response.json())
         .then((actualData) => {
             setProjects(actualData);
         })
         .catch((err) => {
             console.log(err.message);
         });

    }, []);

    useEffect(() => {
        // only upcoming events
        // !!!!!!!!!!!!!!!!

        for (const i in projects) {
            const eventDate = new moment(projects[i].timestamp).format("DD-MM-YYYY");
            const currentDate = new moment(Date.now()).format("DD-MM-YYYY");
            const checkDateResult = checkDate(eventDate, currentDate); // currentdate always second argument!
            // dont show current events, old events
            if (checkDateResult === '0' || checkDateResult === '-') {
                // console.log(i,') event date === ', eventDate, i,' current date ==== ',currentDate)
                // console.log('deleting ', eventDate);
                delete projects[i];
            }
        }
    }, [projects]);

    return (
        <div className="App">
            <NavbarHeader activetab={3} />
            {
                projects ? (<ProjectContainer projects={ projects } state='current' />) : <Loading />
            }
            <Footer />
        </div>
    );
}