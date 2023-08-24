import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({ id: 4, name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: '' });

    const handleNameChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({ ...newPlant, name: event.target.value })
    }
    const handleKingdomChange = (event) => {
        setPlant({ ...newPlant, kingdom: event.target.value })
    }
    const handleCladeChange = (event) => {
        setPlant({ ...newPlant, clade: event.target.value })
    }
    const handleOrderChange = (event) => {
        setPlant({ ...newPlant, order: event.target.value })
    }
    const handleFamilyChange = (event) => {
        setPlant({ ...newPlant, family: event.target.value })
    }
    const handleSubfamilyChange = (event) => {
        setPlant({ ...newPlant, subfamily: event.target.value })
    }
    const handleGenusChange = (event) => {
        setPlant({ ...newPlant, genus: event.target.value })
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'NEW_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({ id: newPlant.id + 1, name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: '' });
    }

    // newPlant.name,
    // newPlant.kingdom,
    // newPlant.clade,
    // newPlant.order,
    // newPlant.family,
    // newPlant.subfamily,
    // newPlant.genus,

    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input type='text' value={newPlant.name} onChange={handleNameChange} placeholder='Name' />
                <input type='text' value={newPlant.kingdom} onChange={handleKingdomChange} placeholder='Kingdom' />
                <input type='text' value={newPlant.clade} onChange={handleCladeChange} placeholder='Clade' />
                <input type='text' value={newPlant.order} onChange={handleOrderChange} placeholder='Order' />
                <input type='text' value={newPlant.family} onChange={handleFamilyChange} placeholder='Family' />
                <input type='text' value={newPlant.subfamily} onChange={handleSubfamilyChange} placeholder='Subfamily' />
                <input type='text' value={newPlant.genus} onChange={handleGenusChange} placeholder='Genus' />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;
