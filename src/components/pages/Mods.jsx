import { useState } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { DataProvider } from '@/context/DataContext';

const Mods = () => {
    const { config } = useConfig();
    console.log(config);

    return (
        <></>
    );
}

const ModsContent = () => {
    return (
        <div>
            <h1>Mods</h1>
            <p>This is the Mods page.</p>
        </div>
    );
}

export default Mods;