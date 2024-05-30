import React, { useEffect, useState } from "react";
import axios from "axios";
import plusIcon from '../../img/plus.png';
import { useNavigate } from "react-router-dom";
import LocationIcon from './../../img/location.png';
import projectThumbnail from './../../img/project-thumbnail.png';
import './AddNewProject.css';

export function AddProgressIcon({ togglecard }) {
    return (
        <div className="addprogress-wrapper">
            <span className="plusicon-wrapper">
                <img src={ plusIcon } alt="add" onClick={ togglecard } />
            </span>
        </div>
    );
}

export function AddProjectCard({ editExistingProject = false, projectId = '' }) {

    const navigate = useNavigate();
    const baseurl = 'http://localhost:4848/api';

    // DEFAULT PROJECT
    const [newInput, setNewInput] = useState({
        title: '',
        description: '',
        date: '',
        location: 'Kochi',
        imageurl: '',
        timestamp: Date.now(),
    });

    // EDIT EXISTING PROJECT
    useEffect(() => {
        // console.log(projectId)
        if (editExistingProject && projectId) {
            fetch(`${baseurl}/get-event/${projectId}`,  {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }}
                )
                .then((response) => response.json())
                .then((projectData) => {
                    console.log('editing project: ',projectData);
                    // add to newinput
                    setNewInput({
                        title: projectData.title,
                        description: projectData.description,
                        date: projectData.date,
                        location: projectData.location,
                        timestamp: projectData.timestamp,
                        imageurl: projectData.imageurl,
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
       
            }
    }, [editExistingProject]);

    // UI-UX feature
    useEffect(() => {
        const currentstatevalue = newInput.state;
        let i; // console.log(currentstatevalue)
        const currentTab = document.getElementsByClassName('projectstate-btn');
        for (i=0; i<currentTab.length; i++) {
            currentTab[i].classList.remove('active-projectstate'); // remove class
            if (currentstatevalue === currentTab[i].textContent) {
                // console.log(currentTab[i]) // apply class
                currentTab[i].classList.add('active-projectstate');
            }
        }

    }, [newInput]);
    
    function handleName(event) {
        event.preventDefault();
        const { value } = event.target;
        setNewInput(prevInput => {
            return { ...prevInput, title: value }
        });
    }

    // function handleState(value) {
    //     setNewInput(prevInput => {
    //         return { ...prevInput, state: value }
    //     });
    // }

    function handleDescription(event) {
        event.preventDefault();
        const { value } = event.target;
        setNewInput(prevInput => {
            return {
                    ...prevInput,
                    description: value
                }
        });
    }

    function handleDate(event) {
        event.preventDefault();
        const { value } = event.target;
        setNewInput(prevInput => {
            return {
                    ...prevInput,
                    date: value
                }
        });
    }

    function handlePicUpload(event) {
        event.preventDefault();

        const { value } = event.target;
        setNewInput(prevInput => {
            return {
                    ...prevInput,
                    imageurl: value
                }
        });
        // let { files } = event.target.files;
        // let reader = new FileReader();
        // let pic;
        // reader.readAsDataURL(files[0]);
        
        // reader.onload = (e) => {
        //     // pic = e.target.result;
        //     console.warn('image selected', pic);
        // }

        // setNewInput(prevInput => {
        //     return {
        //             ...prevInput,
        //             pic: pic
        //         }
        // });
    }

    function handleLocation(event) {
        event.preventDefault();

        const { value } = event.target;
        setNewInput(prevInput => {
            return {
                    ...prevInput,
                    location: value
                }
        });
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        // if(any unfilled field return)
        // ... conditions and checking step
        
        // send request according to edit or create
        
        if (editExistingProject && projectId) {
            // UPDATE
            console.log(newInput);
            axios.put(`${baseurl}/admin/update-event/${projectId}`, newInput)
                .then(res => console.log(res.data));
                navigate(-1); // previous page
        } else {   
            // CREATE
            axios.post(`${baseurl}/admin/create-event`, newInput)
            .then(res => {
                console.log(res.data)
                window.location.reload(); // reload page
            });
        }
    }

    function handleClear(event) {
        event.preventDefault();
        setNewInput({
            title: '',
            description: '',
            date: '',
            location: '',
            timestamp: '',
            imageurl: '',
        });
    }


    return (
        <div className="product-card">
            <h3 className="updateinput-title">{ editExistingProject ? 'Edit Event' : 'Create Event' }</h3>
            <form action="" className="form-group custom-form">
                <img src={ newInput.imageurl || projectThumbnail } className="product-image" alt="projectPic" />
                <label htmlFor="custom-fileupload" className="custom-uploadlabel">
                    {/* <input type="file" id="custom-fileupload" className="form-control" onChange={ handlePicUpload }/> */}
                    <input type="text" id="custom-fileupload" className="form-control" onChange={ handlePicUpload } value={ newInput.imageurl } placeholder="poster url.." />
                </label>
                <input type="text" className="event-title" placeholder="Event title.." onChange={ handleName } value={ newInput.title } />
                <input type="text" className="event-description" placeholder="description.." onChange={ handleDescription } value={ newInput.description } />
                <div className="locationwrapper">
                    <img src={ LocationIcon } className='locationicon' alt="location" />
                    <span>
                        <input type="text" className="event-location" placeholder="location" onChange={ handleLocation } />
                    </span>
                </div>
                <input type="date" className="updateinput-date form-control" onChange={ handleDate } />
                <button className="buy-btn" onClick={ handleSubmit }>
                    {
                        editExistingProject ? 'Update Event' : 'Create Event'
                    }
                </button>
            </form>
		</div>
    );
}