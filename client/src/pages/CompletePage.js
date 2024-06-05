import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import NavbarHeader from "../components/NavbarHeader/NavbarHeader";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
import moment from "moment";
import Loading from "../components/Loading/Loading";
import checkDate from "../utility/checkDate";
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

            // only past events
            // !!!!!!!!!!!!!!!!

            for (const i in actualData) {
                const eventDate = new moment(actualData[i].timestamp).format("DD-MM-YYYY");
                const currentDate = new moment(Date.now()).format("DD-MM-YYYY");
                const checkDateResult = checkDate(eventDate, currentDate); // currentdate always second argument!
                // dont show current date events, upcoming events
                if (checkDateResult === '0' || checkDateResult === '+') {
                    // console.log(i,') ', eventDate, i,') ',currentDate)
                    console.log('deleting ', eventDate)
                    delete actualData[i]
                }
            }
            setProjects(actualData);
         })
         .catch((err) => {
             console.log(err.message);
         });

    }, []);

    return (
        <div className="App">
            <NavbarHeader activetab={1} />
            {
                projects ? (<ProjectContainer projects={ projects } progress='complete' />) : <Loading />
            }
            <Footer />
        </div>
    );
}