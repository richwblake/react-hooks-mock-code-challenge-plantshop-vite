import { useState } from 'react';

const PlantCard = ({ deletePlant, plant }) => {

    // Destructure plant prop object using object destructure syntax. This assigns 3 variables; name, image, and price, and assigns their value to the plant object's corresponding property's value.
    const { name, image, price } = plant;

    // Use a state variable to track whether this PlantCard is in stock or not. Since a plant can only be in stock or out of stock, default value is a boolean.
    const [isInStock, setIsInStock] = useState(true);

    // This function reassigns our state variable equal to the opposite of its current value. If isInStock is true, calling this function will set it to false.
    const toggleIsInStock = () => {
        setIsInStock(!isInStock);
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
        </li>
    );

};

export default PlantCard;
