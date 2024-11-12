import React, { useEffect } from 'react';
import Routes from './src/routes';
import { storage } from './src/database/config';

export default function App() {
    useEffect(() => {
        const initApp = async () => {
            await storage.initDatabase();
        };
        initApp();
    }, []);

    return <Routes />;
}

