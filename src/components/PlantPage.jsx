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

    // We pass this function down to NewPlantForm as a prop, so that NewPlantForm can in turn 
    // give us access to the plant object created by the user. This function sends a POST request with this plant object
    const postPlant = plant => {
        // The 'price' property of our plant argument is of data type String. We need to change it to a float, per the examples in the README.
        // We'll create a new object by copying our old one using the spread operator, and then only changing the price property to its Float representation. 
        // Then, we'll post the newly formatted copy of our plant object to the server via a POST request
        const formattedPlant = { ...plant, price: parseFloat(plant.price) };

        // Create config object to tell fetch how to make a POST request. The body of our request is our plant with the price property of type Float.
        const config = {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(formattedPlant),
        };

        // On line 41, we create a copy of the plants state array using the spread operator, and add our newPlant to the end of the array.
        fetch(API + '/plants', config)
            .then(res => res.json())
            .then(newPlant => setPlants([...plants, newPlant]));
    };

    return (
        <main>
            <NewPlantForm postPlant={postPlant} />
            <Search />
            <PlantList plants={plants} />
        </main>
    );
};

export default PlantPage;
