import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store.plantList);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'GET_PLANTS' })
    }, []);

    console.log("reduxState is", reduxState)

    return (
        <div>
            <h3>This is the plant list</h3>
            {reduxState.map((plant, index) => (
                <div key={index} className='plant-item'>
                    <p>{plant.name}</p>
                    <button>Delete</button>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default PlantList;
