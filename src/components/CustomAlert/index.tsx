import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { style } from './styles';
import { themas } from '../../global/themes';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
    type?: 'success' | 'error';
}

export function CustomAlert({ visible, title, message, onClose, type = 'error' }: CustomAlertProps) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <View style={style.container}>
                <View style={style.content}>
                    <MaterialIcons 
                        name={type === 'success' ? 'check-circle' : 'error'}
                        size={50}
                        color={type === 'success' ? themas.colors.primary : themas.colors.accent}
                    />
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.message}>{message}</Text>
                    <TouchableOpacity 
                        style={style.button}
                        onPress={onClose}
                    >
                        <Text style={style.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
} 