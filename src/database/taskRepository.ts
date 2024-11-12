import { storage } from './config';

interface Task {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    createdAt: string;
}

export const taskRepository = {
    createTask: async (userId: number, title: string): Promise<boolean> => {
        try {
            const tasks = await storage.getItem('tasks') || [];
            const newTask = {
                id: Date.now(),
                userId,
                title,
                completed: false,
                createdAt: new Date().toISOString()
            };

            tasks.push(newTask);
            return await storage.setItem('tasks', tasks);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            return false;
        }
    },

    getUserTasks: async (userId: number): Promise<Task[]> => {
        try {
            const tasks = await storage.getItem('tasks') || [];
            return tasks.filter((task: Task) => task.userId === userId);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            return [];
        }
    },

    updateTask: async (taskId: number, completed: boolean): Promise<boolean> => {
        try {
            const tasks = await storage.getItem('tasks') || [];
            const updatedTasks = tasks.map((task: Task) =>
                task.id === taskId ? { ...task, completed } : task
            );
            return await storage.setItem('tasks', updatedTasks);
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            return false;
        }
    },

    deleteTask: async (taskId: number): Promise<boolean> => {
        try {
            const tasks = await storage.getItem('tasks') || [];
            const filteredTasks = tasks.filter((task: Task) => task.id !== taskId);
            return await storage.setItem('tasks', filteredTasks);
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            return false;
        }
    },

    async updateTaskTitle(taskId: number, newTitle: string): Promise<boolean> {
        try {
            const tasks = await storage.getItem('tasks') || [];
            const updatedTasks = tasks.map((task: Task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
            );
            return await storage.setItem('tasks', updatedTasks);
        } catch (error) {
            console.error('Erro ao atualizar título da tarefa:', error);
            return false;
        }
    }
}; 