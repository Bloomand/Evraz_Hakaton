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
        stationList = [
            {
                id: 0,
                name: "Опция 1"
            },
            {
                id: 1,
                name: "Опция 2"
            },
            {
                id: 2,
                name: "Опция 3"
            },
            {
                id: 3,
                name: "Опция 4"
            },
            {
                id: 4,
                name: "Опция 5"
            }
        ];
    } else {
        //запрос на одну станцию с учетом id usera userInfo.userId
        stationList = [
            {
                id: 2,
                name: "Опция 3"
            }
        ]
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
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
    },
    buttonContainer: {
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
        background: 'green',
        color: 'white',
        borderColor: 'green'
    }
}

export default ChooseStation;
