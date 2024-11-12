import { storage } from './config';

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const userRepository = {
    createUser: async (userData: Omit<User, 'id'>): Promise<boolean> => {
        try {
            const users = await storage.getItem('users') || [];
            const existingUser = users.find((user: User) => user.email === userData.email);
            
            if (existingUser) {
                throw new Error('Email já cadastrado');
            }

            const newUser = {
                ...userData,
                id: Date.now()
            };

            users.push(newUser);
            return await storage.setItem('users', users);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },

    login: async (email: string, password: string): Promise<User | null> => {
        try {
            const users = await storage.getItem('users') || [];
            const user = users.find((u: User) => 
                u.email === email && u.password === password
            );
            return user || null;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return null;
        }
    }
}; 