import React, { useState, useEffect } from 'react';

const MainPage = () => {
    const [example, setExample] = useState(null);
    let stations;
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let userInfo = {};

        for (let param of params.entries()) {
            let [key, value] = param;
            value = decodeURIComponent(value);
            userInfo[key] = value;
        }

        console.log(userInfo);

        if (userInfo.role === '0') {
            stations = [
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
            setExample(
                <div>
                    {stations.map((station) => (
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
                                    <div >{park.ways.map((way) => (
                                        <div key={way.id} style={styles.wayInfo}>
                                            <div style={styles.wayHeader}>Путь {way.id + 1}</div>
                                            <div style={styles.loko}>{way.loko.info}</div>
                                            <div>{way.wagons.map((wagon) => (
                                                <div key={wagon.id} style={styles.wagon}>{wagon.info}</div>
                                            ))}</div>
                                        </div>
                                    ))}</div>
                                </div>
                            ))}</div>
                        </div>
                    ))}
                </div>

            );
            console.log(stations);
        } else {
            userInfo = { id: 0, name: 'CD' };
        }
    }, [window.location.search]);

    return (
        <div className="wrapper" style={styles.container}>
            <div style={styles.exampleBox}>
                {example}
            </div>
        </div>
    );
}

// Допустим, у нас есть базовые стили, как вы упомянули выше. Теперь давайте их расширим
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E4E2',
        minHeight: '100vh',
        padding: '20px'
    },
    exampleBox: {
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
    },
    stationName: {
        display: 'flex'
    },
    // Стили для каждой станции
    station: {
        border: '2px solid #000',
        padding: '12px',
    },
    // Стили для названия станции
    stationHeader: {
        fontWeight: 'bold',
        fontSize: '24px',
        color: '#000',
        paddingBottom: '6px',
        marginBottom: '6px'
    },
    // Стили для парка
    park: {
        paddingLeft: '16px', // отступы чтобы показать вложенность
        borderLeft: '3px solid #349EFF', // левая граница чтобы выделить содержимое парка
    },
    // Стили для названия парка
    parkHeader: {
        fontWeight: 'bold',
        color: '#349EFF'
    },
    wayInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    wayHeader: {
        fontWeight: '500',
        color: '#555',
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 20,
        borderRight: '1px solid #000'
    },

    // Стили для информации о локомотиве
    loko: {
        backgroundColor: '#e7e7e7',
        padding: '5px 10px',
        borderRadius: '8px',
        display: 'inline-block', // чтобы элемент не растягивался на всю ширину
        margin: '3px'
    },
    // Стили для каждого вагона
    wagon: {
        padding: '5px 10px',
        borderRadius: '8px',
        display: 'inline-block', // аналогично
        backgroundColor: '#349EFF',
        color: '#fff',
        border: '1px solid #bee5eb',
        margin: '3px'
    }
}


export default MainPage;
