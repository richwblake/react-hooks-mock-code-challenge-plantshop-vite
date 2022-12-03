import PlantCard from './PlantCard';

const PlantList = ({ plants }) => {

    // Function createPlantCards returns a new array of PlantCard componenets, created from the plants array prop. 
    const createPlantCards = () => {
        // Make sure to include a 'key' prop any time you create components in a loop like this!
        return plants.map(plant => <PlantCard key={plant.id} plant={plant} />);
    };

    return (
        //Invoke createPlantCards to render an array of PlantCard components
        <div className="cards">{createPlantCards()}</div>
    );
};

export default PlantList;
