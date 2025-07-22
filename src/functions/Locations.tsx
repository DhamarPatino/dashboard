export interface Location {
    lat: number;
    lon: number;
    name: string;
}

export const defaultLocations: Location[] = [
    // Ecuador
    { lat: -1.8312, lon: -78.1834, name: 'Ecuador' }, // país
    { lat: -2.170998, lon: -79.922359, name: 'Guayaquil, Ecuador' },
    { lat: -0.180653, lon: -78.467834, name: 'Quito, Ecuador' },
    { lat: -0.967653, lon: -80.708911, name: 'Manta, Ecuador' },
    { lat: -2.90055, lon: -79.00453, name: 'Cuenca, Ecuador' },
    { lat: -1.24908, lon: -78.61675, name: 'Riobamba, Ecuador' },
    { lat: -3.25861, lon: -79.95589, name: 'Machala, Ecuador' },
    { lat: -1.05462, lon: -80.45445, name: 'Portoviejo, Ecuador' },
    { lat: -2.19472, lon: -80.98889, name: 'Salinas, Ecuador' },
    { lat: -0.22985, lon: -78.52495, name: 'Cayambe, Ecuador' },
    { lat: -2.78333, lon: -78.16667, name: 'Azogues, Ecuador' },

    // América
    { lat: 37.0902, lon: -95.7129, name: 'USA' },
    { lat: 41.8781, lon: -87.6298, name: 'Chicago, USA' },
    { lat: 29.7604, lon: -95.3698, name: 'Houston, USA' },
    { lat: 40.7128, lon: -74.0060, name: 'New York, USA' },
    { lat: 34.0522, lon: -118.2437, name: 'Los Angeles, USA' },
    { lat: 25.7617, lon: -80.1918, name: 'Miami, USA' },
    { lat: 23.6345, lon: -102.5528, name: 'México' },
    { lat: 20.6597, lon: -103.3496, name: 'Guadalajara, México' },
    { lat: 25.6866, lon: -100.3161, name: 'Monterrey, México' },
    { lat: 19.4326, lon: -99.1332, name: 'Ciudad de México, México' },
    { lat: -14.2350, lon: -51.9253, name: 'Brasil' },
    { lat: -15.7942, lon: -47.8822, name: 'Brasilia, Brasil' },
    { lat: -23.5505, lon: -46.6333, name: 'São Paulo, Brasil' },
    { lat: -38.4161, lon: -63.6167, name: 'Argentina' },
    { lat: -32.9442, lon: -60.6505, name: 'Rosario, Argentina' },
    { lat: -34.6037, lon: -58.3816, name: 'Buenos Aires, Argentina' },
    { lat: -12.0464, lon: -77.0428, name: 'Lima, Perú' },
    { lat: -22.9068, lon: -43.1729, name: 'Río de Janeiro, Brasil' },
    { lat: 4.5709, lon: -74.2973, name: 'Colombia' },
    { lat: 10.3910, lon: -75.4794, name: 'Cartagena, Colombia' },
    { lat: 6.2442, lon: -75.5812, name: 'Medellín, Colombia' },
    { lat: 4.7110, lon: -74.0721, name: 'Bogotá, Colombia' },
    { lat: -33.4489, lon: -70.6693, name: 'Santiago, Chile' },

    // Europa
    { lat: 51.5074, lon: -0.1278, name: 'Londres, Reino Unido' },
    { lat: 48.8566, lon: 2.3522, name: 'París, Francia' },
    { lat: 41.9028, lon: 12.4964, name: 'Roma, Italia' },
    { lat: 52.5200, lon: 13.4050, name: 'Berlín, Alemania' },
    { lat: 40.4637, lon: -3.7492, name: 'España' },
    { lat: 41.3851, lon: 2.1734, name: 'Barcelona, España' },
    { lat: 37.3891, lon: -5.9845, name: 'Sevilla, España' },
    { lat: 40.4168, lon: -3.7038, name: 'Madrid, España' },
    { lat: 41.8719, lon: 12.5674, name: 'Italia' },
    { lat: 43.7696, lon: 11.2558, name: 'Florencia, Italia' },
    { lat: 45.4642, lon: 9.19, name: 'Milán, Italia' },
    { lat: 59.3293, lon: 18.0686, name: 'Estocolmo, Suecia' },
    { lat: 55.7558, lon: 37.6173, name: 'Moscú, Rusia' },

    // Asia
    { lat: 36.2048, lon: 138.2529, name: 'Japón' },
    { lat: 34.6937, lon: 135.5023, name: 'Osaka, Japón' },
    { lat: 35.0116, lon: 135.7681, name: 'Kioto, Japón' },
    { lat: 35.6895, lon: 139.6917, name: 'Tokio, Japón' },
    { lat: 35.8617, lon: 104.1954, name: 'China' },
    { lat: 23.1291, lon: 113.2644, name: 'Cantón, China' },
    { lat: 39.9042, lon: 116.4074, name: 'Pekín, China' },
    { lat: 20.5937, lon: 78.9629, name: 'India' },
    { lat: 19.0760, lon: 72.8777, name: 'Mumbai, India' },
    { lat: 13.0827, lon: 80.2707, name: 'Chennai, India' },
    { lat: 28.6139, lon: 77.2090, name: 'Delhi, India' },
    { lat: 13.7563, lon: 100.5018, name: 'Bangkok, Tailandia' },
    { lat: 1.3521, lon: 103.8198, name: 'Singapur, Singapur' },
    { lat: 31.2304, lon: 121.4737, name: 'Shanghái, China' },

    // Oceanía
    { lat: -25.2744, lon: 133.7751, name: 'Australia' },
    { lat: -33.8688, lon: 151.2093, name: 'Sídney, Australia' },
    { lat: -37.8136, lon: 144.9631, name: 'Melbourne, Australia' },
    { lat: -36.8485, lon: 174.7633, name: 'Auckland, Nueva Zelanda' },

    // África
    { lat: -1.2921, lon: 36.8219, name: 'Nairobi, Kenia' },
    { lat: -30.5595, lon: 22.9375, name: 'Sudáfrica' },
    { lat: -33.9249, lon: 18.4241, name: 'Ciudad del Cabo, Sudáfrica' },
    { lat: -26.2041, lon: 28.0473, name: 'Johannesburgo, Sudáfrica' },
    { lat: 26.8206, lon: 30.8025, name: 'Egipto' },
    { lat: 29.9668, lon: 32.5498, name: 'Suez, Egipto' },
    { lat: 30.0444, lon: 31.2357, name: 'El Cairo, Egipto' },
    { lat: 6.5244, lon: 3.3792, name: 'Lagos, Nigeria' },


];