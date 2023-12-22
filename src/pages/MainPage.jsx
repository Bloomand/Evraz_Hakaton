import React, { useState, useEffect } from 'react';
import Header from './Header';

const MainPage = () => {
    const [example, setExample] = useState(null);
    const [tooltip, setTooltip] = useState({});
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
                                            <div>{
                                                way.wagons.map((wagon) => (
                                                    <div key={wagon.id}
                                                        onClick={() => handleWagonClick(wagon.id)}
                                                        style={styles.wagon}>
                                                        {wagon.info}
                                                        {tooltip[wagon.id] && <div style={styles.customTooltip}>ID вагона: {wagon.id}</div>}
                                                    </div>
                                                ))
                                            }</div>
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

    const handleWagonClick = (id) => {
        // изменяем состояние для показа/скрытия подсказки для конкретного вагона
        setTooltip(prevTooltip => ({
            ...prevTooltip,
            [id]: !prevTooltip[id]
        }));
    };

    return (
        <div>
            <Header />
            <div className="wrapper" style={styles.container}>
                <div style={styles.exampleBox}>
                    {example}
                </div>
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
        backgroundColor: '#F5F5F5', // более светлый оттенок для фона
        minHeight: '100vh',
        padding: '20px',
        fontFamily: "'Roboto', sans-serif" // добавление шрифта для современного вида
    },
    exampleBox: {
        backgroundColor: '#fff',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', // более мягкое теневое размытие
        borderRadius: '8px', // добавление закругления углов
        width: '80%', // уменьшение ширины для лучшего восприятия
        maxWidth: '1200px', // ограничение максимальной ширины
        margin: '20px', // добавление внешнего отступа для разделения
        padding: '20px', // внутреннее пространство вокруг контента
        overflow: 'hidden' // избегаем переполнения элементов
    },
    station: {
        border: '1px solid #CCC', // более тонкая и светлая рамка
        borderRadius: '4px', // закругление углов
        margin: '10px 0', // отступы сверху и снизу для каждой станции
        padding: '12px',
        backgroundColor: '#FAFAFA', // светлый фон для каждой станции
        transition: 'box-shadow 0.3s ease', // анимация при наведении
        ':hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // тень при наведении для акцента на станции
        }
    },
    stationHeader: {
        fontWeight: '600', // жирнее, для привлечения внимания
        fontSize: '1.5rem', // увеличенный размер шрифта
        color: '#333', // более тёмный цвет текста для лучшей читаемости
        paddingBottom: '10px',
    },
    park: {
        padding: '10px 16px', // дополнительные отступы для чёткости
        borderLeft: '4px solid #5CACEE', // изменение цвета и толщины линии
        backgroundColor: '#FFFFFF', // белый фон для секции парка
        margin: '8px 0',
        borderRadius: '4px', // закругление углов
        boxShadow: '0 2px 4px rgba(44, 62, 80, 0.15)' // добавление тени для парка
    },
    parkHeader: {
        fontWeight: '500',
        color: '#5CACEE',
        marginBottom: '6px', // добавление отступа снизу
        letterSpacing: '0.5px', // немного увеличенный межбуквенный интервал
    },
    wayInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '8px 0', // добавлены отступы для разделения
    },
    wayHeader: {
        fontWeight: '600',
        color: '#444', // более темный для контраста
        padding: '6px 12px',
        background: '#EEE', // светлый фон для визуального разделения
        borderRadius: '12px', // закругленные углы
        marginRight: '16px' // увеличенный отступ справа для простора
    },
    loko: {
        backgroundColor: '#FF4136', // яркий красный для локомотива
        padding: '10px',
        borderRadius: '12px 0 0 12px', // закругление только левых углов для локомотива
        display: 'inline-flex',
        alignItems: 'center',
        justifyContet: 'center',
        margin: '6px 0',
        fontWeight: 'bold',
        color: '#ffffff',
        minWidth: '80px', // минимальная ширина для единообразия
        boxSizing: 'border-box', // чтобы padding не влиял на общие размеры
    },
    wagon: {
        cursor: 'pointer', // Добавьте это для улучшенного взаимодействия
        position: 'relative',
        display: 'inline-block',
        backgroundColor: '#0074D9', // синий цвет вагонов
        color: '#ffffff',
        padding: '10px',
        borderRadius: '0', // отсутствие закругления, чтобы вагоны выглядели как часть поезда
        marginLeft: '-1px', // чтобы вагоны казались соединенными
        border: '1px solid #99ccf3', // более светлая граница для контраста
        fontWeight: 'bold',
        fontSize: '0.85rem',
        minWidth: '80px', // минимальная ширина для единообразия
        boxSizing: 'border-box', // чтобы padding не влиял на размеры
        ':last-child': {
            borderRadius: '0 12px 12px 0', // закругление правых углов последнего вагона
        }
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
}



export default MainPage;
