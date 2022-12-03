import { useState } from 'react';

const NewPlantForm = ({ postPlant }) => {

    // Use state variable to control our form. Default value is an object, as we have several input fields to keep track of.
    const [formData, setFormData] = useState({});

    // This function takes the event as an argument, and uses the event to figure out which input field sent the event.
    // It dynamically assigns to the state object above by targeting the name attribute from the event object
    const handleInputChange = e => {
        // This variable stores the name of which input field was just changed
        const propertyName = e.target.name;
        // This variable holds the associated value of that property (ie. what the user typed into the input field)
        const propertyValue = e.target.value;

        // This line updates formData with the corresponding properties new value. It copies the remaining properties already existing in formData with the spread operator.
        setFormData({ ...formData, [propertyName]: propertyValue }); 
    };

    // This function's job is to prevent the default form submission behavior, and to pass our formData object back to PlantPage via the postPlant function prop.
    const handleSubmit = e => {
        e.preventDefault();
        postPlant(formData);
    };

    return (
        <div className="new-plant-form">
            <h2>New Plant</h2>
            <form onSubmit={handleSubmit} >
                <input onChange={handleInputChange} type="text" name="name" placeholder="Plant name" />
                <input onChange={handleInputChange} type="text" name="image" placeholder="Image URL" />
                <input onChange={handleInputChange} type="number" name="price" step="0.01" placeholder="Price" />
                <button type="submit">Add Plant</button>
            </form>
        </div>
    );
};

export default NewPlantForm;
