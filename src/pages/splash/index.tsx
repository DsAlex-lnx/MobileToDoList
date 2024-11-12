import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style } from './styles';
import Logo from '../../assets/logo.png';
import { storage } from '../../database/config';

export default function Splash() {
    const navigation = useNavigation();

    useEffect(() => {
        async function initApp() {
            await storage.initDatabase();
            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000);
        }
        initApp();
    }, []);

    return (
        <View style={style.container}>
            <Image 
                source={Logo} 
                style={style.logo} 
                resizeMode="contain"
            />
            <Text style={style.title}>TO-DO LIST</Text>
        </View>
    );
} 