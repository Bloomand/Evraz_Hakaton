import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const MainPage = () => {

    const [example, setExample] = useState();
    const location = useLocation();
    let { objects } = location.state;

    const paramObj = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: ""
    }

    useEffect(() => {
<<<<<<< HEAD
        
        objects = objects.filter(station => station.status !== 0)

        const DATA = [
            {
                id: 0,
                name: 'Cevero Disconnected',
                parks: [
                    {
                        id: 0,
                        name: "Park 1",
                        ways: [{
                            id: 0,
                            loko: {
                                id: 0,
                                info: 333
                            },
                            wagons: [{
                                id: 0,
                                info: 1332,
                            },
                            {
                                id: 1,
                                info: 35452,
                            }, {
                                id: 3,
                                info: 1332,
                            },
                            {
                                id: 4,
                                info: 35452,
                            }, {
                                id: 0,
                                info: 1332,
                            }, {
                                id: 0,
                                info: 1332,
                            },
                            {
                                id: 1,
                                info: 35452,
                            }, {
                                id: 0,
                                info: 1332,
                            },
                            {
                                id: 1,
                                info: 35452,
                            }, {
                                id: 0,
                                info: 1332,
                            },
                            {
                                id: 1,
                                info: 35452,
                            }, {
                                id: 0,
                                info: 1332,
                            },
                            {
                                id: 1,
                                info: 35452,
                            }, {
                                id: 4,
                                info: 1332,
                            },
                            {
                                id: 1,
                                info: 35452,
                            }]
                        },
                        {
                            id: 1,
                            loko: {
                                id: 3,
                                info: 4545
                            },
                            wagons: [{
                                id: 3,
                                info: 54,
                            },
                            {
                                id: 5,
                                info: 35452,
                            }]
                        }]
                    },
                    {
                        id: 1,
                        name: "Park 2",
                        ways: [{
                            id: 0,
                            loko: {
                                id: 0,
                                info: 332
                            },
                            wagons: [{
                                id: 0,
                                info: 135,
                            },
                            {
                                id: 1,
                                info: 3545,
                            }]
                        }]
                    }
                ]
            }];
        /*
=======
        objects = objects.filter(station => station.status !== 0);
        
>>>>>>> 454ff68ae56fefbc88296d83a243b7762c20139e
        //Сбор полной информации в бд
        for (let station of objects) {
            //запрос парков на станции
            paramObj.body = JSON.stringify({
                StationId: station.id
            });
            fetch("https://26.254.63.154:7226/station_parks", paramObj)
                .then(response => response.json())
                .then(data => {
                    station.parks = [];
                    data["parkIds"].forEach(element => {
                        station.parks.push({
                            id: element,
                            name: "",
                            paths: []
                        });
                    });
                });

                for (let park of station.parks) {
                    //запрос на добавление информации о park 
        
                    paramObj.body = JSON.stringify({
                        ParkId: park.id
                    });
        
                    fetch("https://26.254.63.154:7226/park", paramObj)
                        .then(response => response.json())
                        .then(data => {
                            park.name = data["name"];
                            data["paths"].forEach(element => {
                                park.paths.push({
                                    id: element,
                                    loco: [],
                                    wagons: []
                                });
                            });
                        });
        
                    for (let path of park) {
                        //запрос на добавление информации o path
        
                        paramObj.body = JSON.stringify({
                            PathId: path.id
                        });
        
                        fetch("https://26.254.63.154:7226/path_objects", paramObj)
                            .then(response => response.json())
                            .then(data => {
                                data["objects"].forEach(element => {
                                    if (element["type"] == 1)
                                        path.loco.push({
                                            id: element["id"],
                                            position: -1,
                                            driver: "",
                                            operation: ""
                                        });
                                    else
                                        path.wagons.push({
                                            id: element["id"],
                                            type: "",
                                            owner: "",
                                            isSick: true,
                                            isEmpty: true,
                                            position: -1,
                                            cargoType: "",
                                            cargoOperation: -1,
                                            operation: "",
                                            maxCapacity: -1,
                                            currentCargoAmount: -1
                                        });
                                });
                            });
        
                        for (let loco of path.loco) {
                            //запрос на добавление информации о локомотивах 
                            fetch("https://26.254.63.154:7226/locomotive", paramObj)
                            .then(response => response.json())
                            .then(data => {
                                loco.position = data["position"];
                                loco.driver = data["driver"];
                                loco.operation = data["operation"];
                            });
                        }
        
                        for (let wagon of path.wagons) {
                            //запрос на добавление информации о вагонах 
                            fetch("https://26.254.63.154:7226/wagons", paramObj)
                            .then(response => response.json())
                            .then(data => {
                                wagon.type = data["type"];
                                wagon.owner = data["owner"];
                                wagon.isSick = data["isSick"];
                                wagon.isEmpty = data["isEmpty"];
                                wagon.position = data["position"];
                                wagon.cargoType = data["cargoType"];
                                wagon.cargoOperation = data["cargoOperation"];
                                wagon.operation = data["operation"];
                                wagon.maxCapacity = data["maxCapacity"];
                                wagon.currentCargoAmount = data["currentCargoAmount"];
                            });
                        }
                    }
                }
        }
<<<<<<< HEAD
        */
        setExample(<div> {
            DATA.map((station) => (
                <div key={station.id} style={styles.station}>
                    <div style={styles.stationName}>
                        <div style={styles.stationHeader}>{station.name}</div>
                        <hr style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: .2,
                            width: '100%',
                            margin: 4,
                            marginTop: 12,
                            borderColor: '#000000'
                        }} />
=======
        
        setExample(
            <div>
                {objects.map((station) => (
                    <div key={station.id} style={styles.station}>
                        <div style={styles.stationName}>
                            <div style={styles.stationHeader}>{station.name}</div>
                            <hr style={{
                                color: '#000000',
                                backgroundColor: '#000000',
                                height: .2,
                                width: '100%',
                                margin: 4,
                                marginTop: 12,
                                borderColor: '#000000'
                            }} />
                        </div>
                        <div>{station.parks.map((park) => (
                            <div key={park.id} style={styles.park}>
                                <div style={styles.parkHeader}>{park.name}</div>
                                <div >{park.paths.map((path) => (
                                    <div key={path.id} style={styles.pathInfo}>
                                        <div style={styles.pathHeader}>Путь {path.id + 1}</div>
                                        <div style={styles.loko}>{path.loko.info}</div>
                                        <div>{
                                            path.wagons.map((wagon) => (
                                                <div key={wagon.id}
                                                    style={styles.wagon}>
                                                    {wagon.info}
                                                </div>
                                            ))}</div>
                                    </div>
                                ))}</div>
                            </div>
                        ))}</div>
>>>>>>> 454ff68ae56fefbc88296d83a243b7762c20139e
                    </div>
                    <div>{station.parks.map((park) => (
                        <div key={park.id} style={styles.park}>
                            <div style={styles.parkHeader}>{park.name}</div>
                            <div >{park.ways.map((way) => (
                                <div key={way.id} style={styles.wayInfo}>
                                    <div style={styles.wayHeader}>Путь {way.id + 1}</div>
                                    <div style={styles.triangle} />
                                    <div style={styles.loko}>{way.loko.id}</div>
                                    <div >{
                                        way.wagons.map((wagon) => (
                                            <div key={wagon.id}
                                                style={styles.wagon}>
                                                {wagon.id}
                                            </div>
                                        ))}</div>
                                </div>
                            ))}</div>
                        </div>
                    ))}</div>
                </div>
            ))
        }
        </div >
        );
    }, [window.location.search]);
    return (
        <div>
            <div className="wrapper" style={styles.container}>
                <div style={styles.exampleBox}>
                    {example}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#E5E4E2', // более светлый оттенок для фона
        minHeight: '100vh',
        padding: '20px',
        fontFamily: "'Roboto', sans-serif" // добавление шрифта для современного вида
    },
    exampleBox: {
        backgroundColor: '#fff',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', // более мягкое теневое размытие
        width: '80%', // уменьшение ширины для лучшего восприятия
        maxWidth: '1200px', // ограничение максимальной ширины
        margin: '20px', // добавление внешнего отступа для разделения
        padding: '20px', // внутреннее пространство вокруг контента
        overflow: 'hidden' // избегаем переполнения элементов
    },
    station: {
        border: '1px solid #CCC', // более тонкая и светлая рамка
        margin: '10px 0', // отступы сверху и снизу для каждой станции
        padding: '12px',
        backgroundColor: '#FAFAFA', // светлый фон для каждой станции
        transition: 'box-shadow 0.3s ease', // анимация при наведении
    },
    stationHeader: {
        fontWeight: '600', // жирнее, для привлечения внимания
        fontSize: '1.5rem', // увеличенный размер шрифта
        color: '#000', // более тёмный цвет текста для лучшей читаемости
    },
    park: {
        padding: '10px 8px', // дополнительные отступы для чёткости
        borderLeft: '7px solid #5CACEE', // изменение цвета и толщины линии
        backgroundColor: '#FFFFFF', // белый фон для секции парка
        margin: '8px 0',
        borderRadius: '4px', // закругление углов
        boxShadow: '0 2px 4px rgba(44, 62, 80, 0.15)', // добавление тени для парка
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    parkHeader: {
        width: 100,
        padding: '10px 5px',
        marginRight: '15px',
        borderRight: '1px solid #000',
        fontWeight: '500',
        color: '#5CACEE',
        letterSpacing: '0.5px', // немного увеличенный межбуквенный интервал
    },
    pathInfo: {
        display: 'flex',
        backgroundColor: '#E5E4E2',
        padding: '5px 15px',
        margin: '5px 0',
        borderRadius: 5,
        flexDirection: 'row',
    },
    pathHeader: {
        fontWeight: '600',
        color: '#444', // более темный для контраста
        padding: '6px 12px',
        background: '#fff', // светлый фон для визуального разделения
        marginRight: '16px' // увеличенный отступ справа для простора
    },
    loko: {
        backgroundColor: '#349EFF', // яркий красный для локомотива
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContet: 'center',
        borderRadius: 5,
        color: '#ffffff',
        minWidth: '80px', // минимальная ширина для единообразия
        boxSizing: 'border-box', // чтобы padding не влиял на общие размеры
    },
    wagon: {
        position: 'relative',
        display: 'flex',
        backgroundColor: '#349EFF', // синий цвет вагонов
        flexDirection: 'row',
        color: '#ffffff',
        padding: '10px',
        borderRadius: 5, // отсутствие закругления, чтобы вагоны выглядели как часть поезда
        marginLeft: '6px', // чтобы вагоны казались соединенными
        minWidth: '80px', // минимальная ширина для единообразия
        boxSizing: 'border-box', // чтобы padding не влиял на размеры

    },
    customTooltip: {
        position: 'absolute',
        bottom: '100%', // чтобы показывать над элементом
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '5px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        zIndex: '1000' // чтобы было над другими элементами
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 38,
        marginRight: '-2.7px',
        borderLeftWidth: 30,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#349EFF',
        borderLeftColor: 'transparent',
    },
}


export default MainPage;
