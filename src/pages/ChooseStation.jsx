import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ChooseStation = () => {
    const navigate = useNavigate();
    let params = new URLSearchParams(window.location.search);
    let userInfo = {};
    const [numChoice, setNumChoice] = useState(0);//Проверка на наличие выбора станции

    for (let param of params.entries()) {
        let [key, value] = param;
        value = decodeURIComponent(value);
        userInfo[key] = value;
    }

    let stationList;

    if (userInfo.role == 0) {
        //запрос на все станции
        paramObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
        }
        fetch("https://26.254.63.154:7226/admin_stations", paramObj)
            .then(response => response.json())
            .then(data => { stationList = data["stations"] })
    } else {
        //запрос на одну станцию с учетом id usera userInfo.userId
        paramObj = {
            headers: {
                'Accept': 'appli cation/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                userId: userInfo.userId
            })
        }
        fetch("https://26.254.63.154:7226/user_station", paramObj)
            .then(response => response.json())
            .then(data => { stationList = [data["station"]] })

    }

    const [optionsList, setOptionsList] = useState(stationList.map(option => ({ ...option, status: 0 })));

    useEffect(() => {
        let num = 0;
        for (let option of optionsList) {
            if (option.status === 1) {
                num++;
            }
        }
        setNumChoice(num);
    }, [optionsList]);

    const handleStationClick = (id) => {
        setOptionsList(currOptions =>
            currOptions.map(option => {
                if (option.id === id) {
                    return { ...option, status: option.status === 0 ? 1 : 0 };
                }
                return option;
            }),
        );
    };
    function stationInfo() {
        navigate('/main', { state: { objects: optionsList } });
    }
    return (
        <div style={styles.pageall}>
            <div style={styles.container}>
                <h1>Выбор станции</h1>
                <div style={styles.buttonContainer}>
                    {optionsList.map(option => (
                        <button
                            key={option.id}
                            onClick={() => handleStationClick(option.id)}
                            style={{ ...styles.button, ...(option.status === 1 ? styles.activeButton : {}) }}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
                <button id="button_next" onClick={stationInfo} disabled={numChoice === 0}>Перейти в меню станции</button>
            </div>
        </div>
    )
};

const styles = {
    pageall: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#E5E4E2',
    },
    container: {
        width: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
        background: 'white',
        fontSize: '25px',
        paddingBottom: '20px',
    },
    buttonContainer: {
        fontSize: '25px',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '10px'
    },
    button: {
        padding: '10px 20px',
        margin: '5px',
        border: '1px solid #ccc',
        background: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    activeButton: {
        background: '#349EFF',
        color: 'white',
        borderColor: '#349EFF'
    }
}

export default ChooseStation;