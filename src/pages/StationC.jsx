import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkC from './ParkC';


const StationC = ({ StationId, StationName }) => {
    const[stationName, setStationName]= useState(StationName)
    const [parks, setParks] = useState([]);
    const [example, setExample] = useState("jdsdbsdbjc");

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;


        let paramObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ StationId }),
            signal: signal
        };

        fetch("https://localhost:7226/station_parks", paramObj)
            .then(response => response.json())
            .then(data => {
                const newParks = data["parkIds"].map(element => ({
                    id: element,
                    name: "",
                    paths: []
                }));
                if (newParks) {
                    setParks(newParks);
                }
            }).catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error("An error occurred while fetching admin stations:", err);
                }
            });;

    }, [StationId]);

    useEffect(() => {
        //console.log("Her much")
        setExample(
            <div>
                {
                    parks.map(
                        park => (
                            <ParkC key={park.id} ParkId={park.id} />
                        )
                    )
                }
            </div>
        )
    }, [parks]);


    return (
        <div>
            <div>Станция: {StationName}</div>
            {example}
        </div>
    );
}
export default StationC;