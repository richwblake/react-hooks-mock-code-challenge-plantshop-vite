const PlantEditPriceForm = ({ patchPlant, plant }) => {

    // Extract both price and name properties' values using destructuring
    const { price, name } = plant;

    // This function is called by the onSubmit event. It prevents the default submission behavior,
    // and then constructs a new plant object with the value the user submitted in the form.
    // Then, we invoke the patchPlant callback prop from PlantPage, where the PATCH request takes place
    const handleSubmit = e => {
        e.preventDefault();

        const updatedPlant = {
            ...plant,
            price: parseFloat(e.target.price.value),
        };

        patchPlant(updatedPlant);
    };

    // Regular form with a input that only takes a numerical value
    return (
        <form onSubmit={handleSubmit}>
            <label>Editting {plant.name}</label>
            <label>
            Price:
                {" "}
                <input type="number" step="0.01" name="price" />
            </label>
            <input type="submit" value="Update price" />
        </form>
    );
};

export default PlantEditPriceForm;
