import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `${styles.link} ${isActive ? styles.active : ''}`
                    }
                    end
                >
                    Главная
                </NavLink>
                <NavLink 
                    to="/generate" 
                    className={({ isActive }) => 
                        `${styles.link} ${isActive ? styles.active : ''}`
                    }
                >
                    Генерация
                </NavLink>
                <NavLink 
                    to="/history" 
                    className={({ isActive }) => 
                        `${styles.link} ${isActive ? styles.active : ''}`
                    }
                >
                    История
                </NavLink>
            </nav>
        </header>
    );
}; 