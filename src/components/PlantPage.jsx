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

    // Use state variable to track the user's current search term. The search term will be a sequence of characters from the user, so we use String as the default type.
    // This state can't live in the Search component, as one of Search's siblings (PlantList) relies on the state. So we move it up one parent, from Search to this component.
    const [search, setSearch] = useState("");

    // This function uses our search term to create a copy of our plants array, with only those plants who partially match the search value. This works because of how React 
    // re-renders components when state changes. The search state variable's value changes when the user types, which causes this function to re-evaluate with the new search term.
    // We use the return value of this function as the value for the plants prop for the PlantList components, so PlantList always shows the right plants.
    // Both the search term and the plant's name are lower-cased during the filter, so our search is case-insensitive.
    const filterPlants = () => {
        return plants.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()));
    };

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
        const formattedPlant = { ...plant, price: parseFloat(plant.price) }; // Create config object to tell fetch how to make a POST request. The body of our request is our plant with the price property of type Float.
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

    // This function will operate simliarly to the one above, but instead,
    // this function makes a DELETE request. Notice that the parameter for 
    // the post is the entire plant object, but for this function it is only
    // a plant ID. This function is passed as a prop as follows:
    // PlantPage -> PlantList -> all PlantCards
    const deletePlant = plantId => {
        fetch(API + `/plants/${plantId}`, { method: "DELETE" })
            .then(_ => {
                console.log(`Plant with ID: ${plantId} successfully deleted. Don't forget to check the db.json file to make sure!`);
                // Inside of this .then function, we can be sure that the
                // delete request was successful. Only now do we want to
                // filter our plants state array to remove the plant that
                // was just clicked, based on its ID. We've updated the server,
                // now we need to update our state to match.
                setPlants(plants.filter(p => p.id !== plantId));
            });
    }

    return (
        <main>
            <NewPlantForm postPlant={postPlant} />
            <Search search={search} setSearch={setSearch} />
            <PlantList deletePlant={deletePlant} plants={filterPlants()} />
        </main>
    );
};

export default PlantPage;
