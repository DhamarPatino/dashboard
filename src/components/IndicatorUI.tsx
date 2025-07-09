import React from 'react';

interface IndicatorUIProps {
    title: string;
    description: string;
    background?: string; // Nueva prop opcional
    icon?: React.ReactNode; // Nueva prop para el ícono
}

const IndicatorUI: React.FC<IndicatorUIProps> = ({ title, description, background, icon }) => {
    return (
        <div
            style={{
                background: background || 'linear-gradient(90deg, #e0e7ef 0%, #f5f7fa 100%)',
                borderRadius: 12,
                padding: 20,
                color: 'white',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.7)',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
                <h3 style={{ fontWeight: 700, margin: 0 }}>{title}</h3>
                {icon && (
                    <div
                        style={{
                            border: '2px solid #fff',
                            background: 'rgba(255, 255, 255, 0.14)',
                            borderRadius: 8,
                            padding: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <span style={{ fontSize: 32, color: '#fff' }}>{icon}</span>
                    </div>
                )}
            </div>
            <span style={{ fontSize: 24 }}>{description}</span>
        </div>
    );
};

export default IndicatorUI;