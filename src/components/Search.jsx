import { useState } from 'react';

const Search = ({ search, setSearch }) => {
   
    // This function takes the user input data from the event, and uses it to set our search term state. We're controlling the input field with our state
    const handleInput = e => {
        setSearch(e.target.value);
    };

    return (
        <div className="searchbar">
            <label htmlFor="search">Search Plants:</label>
            <input
                // We set the value of the input element equal to our state. Both line 20 and line 10 are required for our search state to control this input element.
                value={search}
                type="text"
                id="search"
                placeholder="Type a name to search..."
                onChange={handleInput}
            />
        </div>
    );

};

export default Search;
