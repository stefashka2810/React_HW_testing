export interface HistoryItem {
    id: string;
    timestamp: number;
    fileName: string;
    highlights: string[];
}

const STORAGE_KEY = 'tableHistory';

export const getHistory = (): HistoryItem[] => {
    try {
        const history = localStorage.getItem(STORAGE_KEY);
        return history ? JSON.parse(history) : [];
    } catch {
        return [];
    }
};

export const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    try {
        const history = getHistory();
        const newItem: HistoryItem = {
            ...item,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
        };
        
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([newItem, ...history])
        );
        
        return newItem;
    } catch (error) {
        console.error('Failed to add item to history:', error);
        throw error;
    }
};

export const removeFromHistory = (id: string) => {
    try {
        const history = getHistory();
        const newHistory = history.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
        console.error('Failed to remove item from history:', error);
        throw error;
    }
};

export const clearHistory = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear history:', error);
        throw error;
    }
}; 