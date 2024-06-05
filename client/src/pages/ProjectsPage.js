import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
// custom components
// import { AddProgressIcon } from '../components/AddNewProject/AddNewProject';
import Loading from '../components/Loading/Loading';
import ProjectToolbar from "../components/ProjectToolbar/ProjectToolbar";
import projectThumbnail from '../img/project-thumbnail-cropped.png';
// import ProgressContainer from '../components/ProgressContainer/ProgressContainer'
// import AddNewProgress from "../components/AddNewProgress/AddNewProgress";
import '../App.css';


export default function ProjectsPage() {

    // values
    const { projectId } = useParams();
    const navigate = useNavigate();
    const currentDate = moment().format('YYYY-MM-DD');

    const baseurl = 'http://localhost:4848/api';
    
    // state
    const [project, setProject] = useState();
    const [toggleupdatecard, setToggleupdatecard] = useState(false);
     


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

    // toggler
    function handleToggleCard() {
        setToggleupdatecard( !toggleupdatecard );
    }

    return (
        <div className="App">

            { !project ? (
                <div style={{ 'display': 'flex', 'minHeight': '50vh', 'alignItems': 'center' }}>
                    <Loading />
                </div>) :
            
            (<div className="projectpage-wrapper">

                <ProjectToolbar
                    projectname={ project.title }
                    projectstate={ project.location }
                    onDelete={ () => deleteProject(project._id) }
                    onEdit={ () => editProject(project._id) }
                    />

                <div className="project-background-container">
                    <img className="project-thumbnail" src={ project.imageurl || projectThumbnail } alt="project-thumbnail" />
                    <h4 className="project-date">{ project.timestamp || moment(project.date).utc().format('YYYY-MM-DD') }</h4>
                </div>


                {/* PROGRESS TREE */}

                <section className="progress-tree">

                    {/* {
                        project.progress.length ? <ProgressContainer progress={ progress } editDescription={ (id, value) => handleEditDescription(id, value) } /> : <span>no progress added!</span>
                    } */}

                </section>

            </div>) }
        </div>
    );

}