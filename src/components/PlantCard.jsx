import { useState } from 'react';
import PlantEditPriceForm from './PlantEditPriceForm';

const PlantCard = ({ patchPlant, deletePlant, plant }) => {

    // Destructure plant prop object using object destructure syntax. This assigns 3 variables; name, image, and price, and assigns their value to the plant object's corresponding property's value.
    const { name, image, price } = plant;

    // Use a state variable to track whether this PlantCard is in stock or not. Since a plant can only be in stock or out of stock, default value is a boolean.
    const [isInStock, setIsInStock] = useState(true);

    // Use a state variable to determine if the user is currently editting the price field.
    // If true, we'll display the PlantEditPriceForm, otherwise we'll hide the form.
    const [isEditting, setIsEditting] = useState(false);

    // This function reassigns our state variable equal to the opposite of its current value. If isInStock is true, calling this function will set it to false.
    const toggleIsInStock = () => {
        setIsInStock(!isInStock);
    };

    // Performs the same task as the function above, but toggles a different state variable.
    // These two functions are so similar, could you think of a way to combine them into one?
    const toggleIsEditting = () => {
        setIsEditting(!isEditting);
    };
    return (
        // Note that both of the buttons below call toggleIsInStock when clicked.
        <li className="card">
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>Price: {price}</p>
            {isInStock ? (
                // If isInStock === true, only this button is rendered.
                <button onClick={toggleIsInStock} className="primary">In Stock</button>
            ) : (
                // If isInStock === false, only this button is rendered.
                <button onClick={toggleIsInStock}>Out of Stock</button>
            )}
            {/* Adding our new button that will send a DELETE request for 
            the clicked plant. This function calls a callback function prop 
            when clicked, and the DELETE request is handled in the parent
            component. For styling, please see the button.delete rule in the
            index.css file in src folder. */}
            <button onClick={_ => deletePlant(plant.id)} className="delete">Remove Plant</button>
            {/* This button changes our isEditting variable to its reciprocal when clicked. This affects the ternary
                condition below it, which determines whether to show the change price form to the user or not. */}
            <button onClick={toggleIsEditting}>{!isEditting ? "Change Price" : "Hide Form"}</button>
            {/* If isEditting is true, we want to show the component where our edit form lives, PlantEditPriceForm.
            otherwise, we don't want to display the form at all, as isEditting is false. */}
            {isEditting ? (
                // We pass the form both the plant we are editting, and the callback prop patchPlant, which
                // gets called when the user submits the edit form.
                <PlantEditPriceForm patchPlant={patchPlant} plant={plant} />
            ) : (
                null
            )}
        </li>
    );

};

export default PlantCard;
