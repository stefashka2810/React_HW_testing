import { Navigation } from './Navigation';
import { Title } from './Title';

import styles from './Header.module.css';


export const Header = () => {
    return (
        <header className={styles.header}>
            <Title />
            <Navigation />
        </header>
    );
};
