import React from "react";
import '../App.css';

export default function CatogoryPage() {

    return (
        <div className="catogory-page">
            <h2 className="m-4">Catogory Page</h2>

            <div className="container text-center">
                <div className="row mt-2">
                    <div className="col m-3">
                        <div className="catogory_card">
                            music
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="catogory_card">
                            sports
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col m-3">
                        <div className="catogory_card">
                            entertains
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="catogory_card">
                            party
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col m-3">
                        <div className="catogory_card">
                            Art
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="catogory_card">
                            Tech
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}