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
    Home: { userId: number };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
    const navigation = useNavigation<NavigationProps>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleLogin = async () => {
        // Validação de campos vazios
        if (!email || !password) {
            setAlertMessage('Por favor, preencha todos os campos');
            setAlertVisible(true);
            return;
        }

        // Validação do formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlertMessage('Por favor, insira um email válido');
            setAlertVisible(true);
            return;
        }

        try {
            const user = await userRepository.login(email, password);
            if (user) {
                navigation.navigate('Home', { userId: user.id });
            } else {
                setAlertMessage('Email ou senha incorretos!');
                setAlertVisible(true);
            }
        } catch (error) {
            setAlertMessage('Não foi possível fazer login. Tente novamente!');
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
                <Text style={style.title}> TO-DO LIST</Text>
            </View>

            <View style={style.boxMid}>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.inputField}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={themas.colors.gray}
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
                <TouchableOpacity style={style.button} onPress={handleLogin}> 
                    <Text style={style.textButton}>Login</Text>
                </TouchableOpacity>    
            </View>
                        
            <Text style={style.footer}> 
                Não tem conta? <Text 
                    style={style.textFooter}
                    onPress={() => navigation.navigate('Register')}
                > 
                    Crie agora! 
                </Text>
            </Text>
            <CustomAlert 
                visible={alertVisible}
                title="Atenção"
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
                type="error"
            />
        </View>
    )
}
