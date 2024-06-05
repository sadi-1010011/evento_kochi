import React, { useEffect, useState} from "react";
import moment from "moment";
import ProjectCard from '../ProjectCard/ProjectCard';
import Loading from "../Loading/Loading";
import { AddProjectCard, AddProgressIcon } from '../AddNewProject/AddNewProject';
import "./ProjectContainer.css";

function ProjectWrapper({ project, progress }) {

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <ProjectCard
                key={ project.id }
                id={ project._id }
                name={ project.title }
                description={ project.description }
                location={ project.location }
                timestamp={ project.timestamp }
                progressbar = { progress === 'complete' ? 100 : 85 } // default 85%
                pic={ String(project.imageurl) }
            />
        </div>
    );
}

export default function ProjectContainer({ projects, progress }) {

    // toggler
    const [toggleupdatecard, setToggleupdatecard] = useState(false);
    function handleToggleCard() { setToggleupdatecard( !toggleupdatecard ); }

    // smooth scroll to bottom
    useEffect(() => {
        if (toggleupdatecard) {
            // console.log('scrolling..');
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, [toggleupdatecard]);


    return (
        <section className="products-section" id="product-page">
            <div className="container m-auto">
                <div className="row pt-0 pb-5 justify-content-center">
                    {
                        projects ?
                        projects.map(project => <ProjectWrapper key={project._id} project={project} progress={progress}  />) :
                        (<h1 className="serverUnavailable">server unavailable !</h1>)
                    }
                </div>
                    <AddProgressIcon togglecard={ handleToggleCard } />
                    { toggleupdatecard && <AddProjectCard title="Create Project" /> }
            </div>
        </section>
    );
}
