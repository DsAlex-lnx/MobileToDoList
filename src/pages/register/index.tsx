import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/logo.png"
import { MaterialIcons } from "@expo/vector-icons"
import { themas } from "../../global/themes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { userRepository } from '../../database/userRepository';
import { CustomAlert } from "../../components/CustomAlert";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Register() {
    const navigation = useNavigation<NavigationProps>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('error');

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setAlertMessage('Por favor, preencha todos os campos');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlertMessage('Por favor, insira um email válido (exemplo@email.com)');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        if (password.length < 8) {
            setAlertMessage('A senha deve ter no mínimo 8 caracteres');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        try {
            const success = await userRepository.createUser({
                name,
                email,
                password
            });

            if (success) {
                setAlertMessage('Conta criada com sucesso!');
                setAlertType('success');
                setAlertVisible(true);
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 2000);
            }
        } catch (error) {
            setAlertMessage('Este email já está em uso. Tente outro!');
            setAlertType('error');
            setAlertVisible(true);
        }
    };

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image 
                    source={Logo} 
                    style={style.logo} 
                    resizeMode="contain"
                    onError={(error) => console.log('Erro ao carregar imagem:', error)}
                />
                <Text style={style.title}>CRIAR CONTA</Text>
            </View>

            <View style={style.boxMid}>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.inputField}
                        placeholder="Nome"
                        placeholderTextColor={themas.colors.gray}
                        value={name}
                        onChangeText={setName}
                    />
                    <MaterialIcons 
                        name="person"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.inputField}
                        placeholder="Email"
                        placeholderTextColor={themas.colors.gray}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <MaterialIcons 
                        name="email"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>
                <View style={style.boxInput}>
                    <TextInput
                        style={style.inputField}
                        placeholder="Senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={themas.colors.gray}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialIcons 
                            name={showPassword ? 'visibility-off' : 'visibility'}
                            size={20}
                            color={themas.colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={handleRegister}> 
                    <Text style={style.textButton}>Cadastrar</Text>
                </TouchableOpacity>    
            </View>
                        
            <Text style={style.footer}> 
                Já tem conta? <Text 
                    style={style.textFooter}
                    onPress={() => navigation.navigate('Login')}
                > 
                    Faça login! 
                </Text>
            </Text>
            <CustomAlert 
                visible={alertVisible}
                title={alertType === 'success' ? 'Sucesso!' : 'Atenção'}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
                type={alertType}
            />
        </View>
    )
} 