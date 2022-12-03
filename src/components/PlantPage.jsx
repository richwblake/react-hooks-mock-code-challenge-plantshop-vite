import { useState, useEffect } from 'react';
import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import Search from './Search';

const PlantPage = () => {

    // API endpoint constant
    const API = 'http://localhost:6001';

    // Plant state belongs here, as none of the siblings (Header) of the current component (PlantPage) need access to this state
    // Default value is an empty array, as this state will store an array of plant objects from the json-server
    const [plants, setPlants] = useState([]);

    // useEffect is used here with an empty dependecy array. This tells useEffect to run the callback function only ONCE, when the app loads.
    useEffect(() => {
        // Make a GET request to the /plants endpoint, the response contains an array of objects. Pass the JSON to our setPlants function to update our state.
        fetch(API + '/plants')
            .then(res => res.json())
            .then(plantJSON => setPlants(plantJSON));
    }, []);

    return (
        <main>
            <NewPlantForm />
            <Search />
            <PlantList plants={plants} />
        </main>
    );
};

export default PlantPage;
