import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search a song of your choice"
                className={styles.input}
            />
            <button className={styles.button}>
                <i className="fa fa-search"></i> {/* Use FontAwesome or similar for the search icon */}
            </button>
        </div>
    );
};

export default SearchBar;
