import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ChooseStation = () => {
    const [selectedStation, setSelectedStation] = useState("");

    const handleStationChange = (e) => {
        setSelectedStation(e.target.value);
    };

    const stationOptions = [
        "Станция 1",
        "Станция 2",
        "Станция 3",
        // Добавьте остальные названия станций в этот массив
    ];

    return (
        <div>
            <label>Выберите станцию:</label>
            <select value={selectedStation} onChange={handleStationChange}>
                <option value="">--Выберите станцию--</option>
                {stationOptions.map((station, index) => (
                    <option key={index} value={station}>
                        {station}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ChooseStation;
