import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    setItem: async (key: string, value: any) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    },

    getItem: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Erro ao recuperar dados:', error);
            return null;
        }
    },

    initDatabase: async () => {
        try {
            const users = await AsyncStorage.getItem('users');
            const tasks = await AsyncStorage.getItem('tasks');

            if (!users) {
                await AsyncStorage.setItem('users', JSON.stringify([]));
            }
            if (!tasks) {
                await AsyncStorage.setItem('tasks', JSON.stringify([]));
            }
            return true;
        } catch (error) {
            console.error('Erro ao inicializar banco de dados:', error);
            return false;
        }
    }
}; 