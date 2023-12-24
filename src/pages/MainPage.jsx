import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Header from './Header';
import DATA from '../Data';

const MainPage = () => {

    const [example, setExample] = useState();
    const [activeModalWagonId, setActiveModalWagonId] = useState(-1);
    const location = useLocation();
    let { objects } = location.state;


    const handleWagonClick = (wagonId) => {
        setActiveModalWagonId(wagonId); // Устанавливаем ID вагона, для которого показываем модальное окно
    }

    const closeModal = (event) => {
        event.stopPropagation(); // Останавливаем всплытие события.
        setActiveModalWagonId(-1);
    }

    useEffect(() => {
        objects = objects.filter(station => station.status !== 0)
        //Сбор полной информации в бд
        let stationList = [];
        for (let i of DATA.stations) {
            for (let k of objects) {
                if (i.id == k.id) {
                    stationList.push(i)
                }
            }
        }
        setExample(
            <div>{stationList.map((station) => (
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
                            <div >
                                {park.ways.map((path) => (
                                    <>
                                        <div key={path.id} style={styles.wayInfo}>
                                            <div style={styles.wayHeader}>Путь {path.num}</div>
                                            <div style={styles.loko}>{path.loko.id}</div>
                                            <div>{path.wagons.map((wagon) => (
                                                <div key={wagon.id}
                                                    style={styles.wagon}
                                                    onClick={() => handleWagonClick(wagon.id)}>
                                                    {wagon.id}
                                                    {activeModalWagonId === wagon.id && (
                                                        <div>
                                                            <div>Пустой вагон. Операция отсутствует</div>
                                                            <div>Тип: ВКтУ</div>
                                                            <div style={{
                                                                backgroundColor: "#000",
                                                                width: 100,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                padding: '5px 20px',
                                                                paddingLeft: 40,
                                                            }} onClick={closeModal}>Закрыть</div>
                                                        </div>
                                                    )}
                                                </div>

                                            ))} </div>
                                        </div>
                                    </>
                                ))}</div>
                        </div>
                    ))}</div>
                </div>
            ))}</div>)

    }, [activeModalWagonId, location.search]);

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
        marginRight: 15,
        borderRight: '1px solid #000',
        fontWeight: 500,
        color: '#5CACEE',
        letterSpacing: '0.5px', // немного увеличенный межбуквенный интервал
    },
    wayInfo: {
        display: 'flex',
        maxWidth: '1000px',
        backgroundColor: '#E5E4E2',
        padding: '5px 10px',
        margin: '5px 0',
        borderRadius: '5px',
        flexDirection: 'row',
    },
    wayHeader: {
        fontWeight: '600',
        borderRadius: '5px',
        minWidth: '60px',
        maxWidth: '60px',
        color: '#444', // более темный для контраста
        padding: '12px 12px',
        background: '#fff', // светлый фон для визуального разделения
        marginRight: '16px' // увеличенный отступ справа для простора
    },
    loko: {
        backgroundColor: '#223764',
        padding: '10px',
        display: 'flex',
        borderRadius: 5,
        margin: '2px',
        color: '#ffffff',
        minWidth: '80px', // минимальная ширина для единообразия
        boxSizing: 'border-box', // чтобы padding не влиял на общие размеры
    },
    wagon: {
        position: 'relative',
        display: 'inline-block',
        backgroundColor: '#349EFF', // синий цвет вагонов
        flexDirection: 'row',
        color: '#ffffff',
        padding: '10px',
        borderRadius: 5, // отсутствие закругления, чтобы вагоны выглядели как часть поезда
        marginLeft: '6px', // чтобы вагоны казались соединенными
        minWidth: '80px', // минимальная ширина для единообразия
        boxSizing: 'border-box', // чтобы padding не влиял на размеры
        margin: '2px',
    },
    customTooltip: {
        position: 'absolute',
        bottom: '100%', // чтобы показывать над элементом
        left: '50%',
        transform: 'translateX(-50%)',
        border: '2px',
        padding: '10px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        zIndex: '1000' // чтобы было над другими элементами
    },
}
export default MainPage;
