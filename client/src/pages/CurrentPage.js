import React, { useEffect, useState } from "react";
import NavbarHeader from "../components/NavbarHeader/NavbarHeader";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import checkDate from "../utility/checkDate";
import moment from "moment";
// import data from "../data/data"; // LOCAL SAMPLE DATA

export default function CurrentPage() {
    const [projects, setProjects] = useState();
    const REACT_APP_IP = '192.168.1.56';
    const REACT_APP_PORT = '4848';
    const baseurl = `http://${REACT_APP_IP}:${REACT_APP_PORT}/api/admin`;

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

            // only current events
            // !!!!!!!!!!!!!!!!

            for (const i in actualData) {
                const eventDate = new moment(actualData[i].timestamp).format("DD-MM-YYYY");
                const checkDateResult = checkDate(eventDate);
                // dont show upcoming events, old events
                if (checkDateResult === '+' || checkDateResult === '-') {
                    // console.log(i,') event date === ', eventDate, i,' current date ==== ',currentDate)
                    // console.log('deleting ', eventDate)
                    // delete actualData[i]
                }
            }
            // console.log(actualData);
            setProjects(actualData);
         })
         .catch((err) => {
             console.log(err.message);
         });
    
       }, []);

    return (
        <div className="App">
            <NavbarHeader activetab={2} />
            {
                projects ? (<ProjectContainer projects={ projects } state='current' />) : <Loading />
            }
            <Footer />
        </div>
    );
}