import { Button } from '@ui/Button';

import styles from './GeneratePage.module.css';

export const GeneratePage = () => {
    const handleGenerate = async () => {
        try {
            // TODO: Implement table generation
            console.log('Generating table...');
        } catch (error) {
            console.error('Error generating table:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Генерация таблицы</h1>
            <Button 
                variant="primary"
                className={styles.generateButton}
                onClick={handleGenerate}
            >
                Сгенерировать таблицу
            </Button>
        </div>
    );
}; 