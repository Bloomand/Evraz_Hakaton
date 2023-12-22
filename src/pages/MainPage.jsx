import React, { useState, useEffect } from 'react';
import NestedList from '../features/NestedList';

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
                    name: 'CD',
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
                }, {
                    id: 1,
                    name: 'QWE'
                }];
            setExample(
                <div>
                    {stations.map((station) => (
                        <div key={station.id}>
                            <div>{station.name}</div>
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
        <div className="wrapper">
            <span>Ha</span>
            <div>
                {example}
            </div>
        </div>
    );
}

export default MainPage;
