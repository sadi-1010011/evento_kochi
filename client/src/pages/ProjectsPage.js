import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import moment from "moment";
// custom components
import Loading from '../components/Loading/Loading';
import HostIcon_Dark from '../img/host_dark.png';
import LocationIcon from '../img/location-pin.png';
import ImgGridGallery from '../components/ImgGridGallery/ImgGridGallery';
import '../App.css';


export default function ProjectsPage() {

    // values
    const { projectId } = useParams();
    const navigate = useNavigate();
    const REACT_APP_IP = '192.168.1.56';
    const REACT_APP_PORT = '4848';
    const baseurl = `http://${REACT_APP_IP}:${REACT_APP_PORT}/api`;
    
    // state
    const [project, setProject] = useState();

    // GET EVENT FROM BACKEND
    useEffect(() => {
        fetch(`${baseurl}/get-event/${projectId}`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
            .then((response) => response.json())
            .then((actualData) => {
                // fill fetched DATA in state
                setProject(actualData);
            })
            .catch((err) => console.log(err));
    }, [projectId]);



    // delete project
    function deleteProject(id) {
        alert('deleting project: ', project.title);
        axios.delete(`${baseurl}/admin/delete-event/${id}`)
            .then(res => { 
                console.log(res.data);
            })
            .catch(err => console.log(err));
            navigate("/current");  // back to home
    }

    // update project
    function editProject(id) {
        let existingData
        console.log('editing project: ', id);
        // now go to edit page
        navigate(`/projects/update/${id}`);
    }

    return (
        <div className="App">

            { !project ? (
                <div style={{ 'display': 'flex', 'minHeight': '50vh', 'alignItems': 'center' }}>
                    <Loading />
                </div>) :
            
            (<div className="projectpage-wrapper">

                <div className="event-gallery-container">
                    <ImgGridGallery />
                </div>

                <h1 className="pt-3 px-4 align-left">{ project.title }</h1>

                
                <div className="event-host-wrapper">
                    <img className="hosticon-img" src={ HostIcon_Dark } alt="host_icon" />
                    <span className="host-name">host name</span>
                </div>

                <p className="event-description px-4" >{ project.description ? project.description : 'project description..' }</p>

                <div className="locationwrapper px-2">
                    <img src={ LocationIcon } className='locationicon' alt="location" />
                    <span>{ project.location || 'kochi' }</span>
                </div>

                <div className="event-ticket-wrapper text-capitalize">
                    <h2>Total price</h2>
                    <span className="fw-bold" style={{ 'fontSize': '1.32rem'}}>0$</span>
                </div>

                {/* only for development stage */}
                <div className="text-center" style={{ 'margin': '5cm auto'}}>
                    <button onClick={ () => editProject(project.id) }>Edit Project</button>
                </div>

            </div>) }
        </div>
    );
    
}



{/* <img className="project-thumbnail" src={ project.imageurl || projectThumbnail } alt="project-thumbnail" /> */}
{/* <h4 className="project-date">{ project.timestamp || moment(project.date).utc().format('LL') }</h4> */}