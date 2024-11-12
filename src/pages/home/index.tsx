import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { taskRepository } from "../../database/taskRepository";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface RouteParams {
    userId: number;
}

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params as RouteParams;
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editingTaskText, setEditingTaskText] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const userTasks = await taskRepository.getUserTasks(userId);
        setTasks(userTasks);
    };

    const addTask = async () => {
        if (newTask.trim()) {
            const success = await taskRepository.createTask(userId, newTask);
            if (success) {
                await loadTasks();
                setNewTask('');
            }
        }
    };

    const toggleTask = async (taskId: number) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            const success = await taskRepository.updateTask(taskId, !task.completed);
            if (success) {
                await loadTasks();
            }
        }
    };

    const deleteTask = async (taskId: number) => {
        const success = await taskRepository.deleteTask(taskId);
        if (success) {
            await loadTasks();
        }
    };

    const updateTask = async (taskId: number, newTitle: string) => {
        if (newTitle.trim()) {
            const success = await taskRepository.updateTaskTitle(taskId, newTitle);
            if (success) {
                await loadTasks();
                setEditingTaskId(null);
                setEditingTaskText('');
            }
        }
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>Minhas Tarefas</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <MaterialIcons 
                        name="logout" 
                        size={24} 
                        color={themas.colors.primary}
                    />
                </TouchableOpacity>
            </View>

            <View style={style.inputContainer}>
                <TextInput 
                    style={style.input}
                    placeholder="Nova tarefa"
                    value={newTask}
                    onChangeText={setNewTask}
                    placeholderTextColor={themas.colors.gray}
                />
                <TouchableOpacity style={style.addButton} onPress={addTask}>
                    <MaterialIcons 
                        name="add" 
                        size={24} 
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>

            <FlatList 
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={style.taskItem}>
                        <TouchableOpacity 
                            style={style.checkbox}
                            onPress={() => toggleTask(item.id)}
                        >
                            <MaterialIcons 
                                name={item.completed ? "check-box" : "check-box-outline-blank"}
                                size={24}
                                color={themas.colors.primary}
                            />
                        </TouchableOpacity>
                        
                        {editingTaskId === item.id ? (
                            <TextInput
                                style={style.taskEditInput}
                                value={editingTaskText}
                                onChangeText={setEditingTaskText}
                                onBlur={() => updateTask(item.id, editingTaskText)}
                                autoFocus
                            />
                        ) : (
                            <Text style={[
                                style.taskText,
                                item.completed && style.taskCompleted
                            ]}>
                                {item.title}
                            </Text>
                        )}
                        
                        <View style={style.iconContainer}>
                            <TouchableOpacity 
                                onPress={() => {
                                    setEditingTaskId(item.id);
                                    setEditingTaskText(item.title);
                                }}
                                style={style.iconButton}
                            >
                                <MaterialIcons 
                                    name="edit" 
                                    size={24} 
                                    color={themas.colors.primary}
                                />
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => deleteTask(item.id)}
                                style={style.iconButton}
                            >
                                <MaterialIcons 
                                    name="delete" 
                                    size={24} 
                                    color={themas.colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
} 