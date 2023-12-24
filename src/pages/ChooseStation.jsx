import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ChooseStation = () => {
    const [stationList, setStationList] = useState([]);

    const navigate = useNavigate();
    let params = new URLSearchParams(window.location.search);
    let userInfo = {};
    const [numChoice, setNumChoice] = useState(0);//Проверка на наличие выбора станции
    const [example, setExample] = useState();

    for (let param of params.entries()) {
        let [key, value] = param;
        value = decodeURIComponent(value);
        userInfo[key] = value;
    }

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;
        let paramObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: "",
            signal: signal
        }

        if (userInfo.role == 0) {
            //запрос на все станции

            fetch("https://localhost:7226/admin_stations", paramObj)
                .then(response => response.json())
                .then(data => {
                    console.log(data["stations"]);
                    if (Array.isArray(data["stations"])) { // or do similar validation to ensure it's an array
                        setStationList(data["stations"]);
                    }else{
                        console.log("NOOOOO")
                    }
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        console.error("An error occurred while fetching admin stations:", err);
                    }
                });

        } else {
            //запрос на одну станцию с учетом id usera userInfo.userId
            paramObj.body = JSON.stringify({
                userId: userInfo.userId
            })
            fetch("https://localhost:7226/user_station", paramObj)
                .then(response => response.json())
                .then(data => { setStationList([data["station"]]); })

        }
        return () => {
            abortController.abort();
        };
        // You would need to add any external values used inside the effect that might change over time to the dependencies array
    }, [userInfo.role, userInfo.userId]);

    const [optionsList, setOptionsList] = useState();

    useEffect(() => {
        if (stationList != []) {
            let dop = stationList.map(option => ({ ...option, status: 0 }));
            console.log(dop)
            console.log("dfsfsdvd!", stationList)
            setOptionsList(dop); // Assuming you want to update optionsList here.
        }
    }, [stationList]);


    useEffect(() => {
        if (optionsList) {
            console.log(optionsList)
            let num = 0;
            for (let option of optionsList) {
                if (option.status === 1) {
                    num++;
                }
            }
            setNumChoice(num);

            setExample(<div style={styles.buttonContainer}>
                {optionsList.map(option => (
                    <button
                        key={option.id}
                        onClick={() => handleStationClick(option.id)}
                        style={{ ...styles.button, ...(option.status === 1 ? styles.activeButton : {}) }}
                    >
                        {option.name}
                    </button>
                ))}
            </div>);
        }
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
                {example}
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