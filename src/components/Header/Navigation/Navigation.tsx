import styles from './Navigation.module.css';
import { NavElement } from './NavElement';
import { Create } from '@components/icons/Create';
import { History } from '@components/icons/History';
import { Upload } from '@components/icons/Upload';

export const Navigation = () => {
    return (
        <nav className={styles.root}>
            <NavElement to="/" title="CSV Аналитик" icon={<Upload />} end />
            <NavElement
                to="/generate"
                title="CSV Генератор"
                icon={<Create />}
            />
            <NavElement to="/history" title="История" icon={<History />} />
        </nav>
    );
};
