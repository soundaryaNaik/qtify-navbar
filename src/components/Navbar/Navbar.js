import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import FeedbackButton from './FeedbackButton';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Logo />
            <SearchBar />
            <FeedbackButton />
        </nav>
    );
};

export default Navbar;
