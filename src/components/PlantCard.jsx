const PlantCard = ({ plant }) => {

    // Destructure plant prop object using object destructure syntax. This assigns 3 variables; name, image, and price, and assigns their value to the plant object's corresponding property's value.
    const { name, image, price } = plant;
        
    return (
        <li className="card">
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>Price: {price}</p>
            {true ? (
                <button className="primary">In Stock</button>
            ) : (
                <button>Out of Stock</button>
            )}
        </li>
    );

};

export default PlantCard;
