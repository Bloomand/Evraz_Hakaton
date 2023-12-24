import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ParkC({ ParkId }) {
    //let ParkName;
    const [ParkName, setParkName] = useState("");
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;


        let paramObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ ParkId }),
            signal: signal
        };

        paramObj.body = JSON.stringify({
            ParkId: ParkId
        });

        fetch("https://localhost:7226/park", paramObj)
            .then(response => response.json())
            .then(data => {
                console.log("!!!!!!", data);

                const newPaths = [];
                //ParkName = data["name"];
                setParkName(data["name"]);
            })

            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error("An error occurred while fetching admin stations:", err);
                }
            });

    }, [ParkId]);

    // useEffect(() => {
    //     console.log(paths)
    // }, [paths]);

    return (
        <div>Парк: {ParkName}</div>
    );
}
export default ParkC;