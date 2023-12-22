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
            stations = [{ id: 0, name: 'CD' }, { id: 1, name: 'QWE' }];
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
            </div>
        </div>
    );
}

export default MainPage;
