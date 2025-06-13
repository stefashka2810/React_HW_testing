import { Text } from '@components/common/Text';

import { Logo } from './Logo';
import styles from './Title.module.css';

export const Title = () => {
    return (
        <div className={styles.root}>
            <Logo />
            <Text className={styles.title} weight="medium" as="h1">
                Межгалактическая аналитика
            </Text>
        </div>
    );
};
