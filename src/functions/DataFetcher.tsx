import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const coordenadasCiudad: Record<string, { latitud: number; longitud: number }> = {
  guayaquil: { latitud: -2.1962, longitud: -79.8862 },
  quito: { latitud: -0.2298, longitud: -78.5245 },
  manta: { latitud: -0.9494, longitud: -80.7314 },
  cuenca: { latitud: -2.9005, longitud: -79.0045 },
};


export default function DataFetcher(ciudad: string) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!ciudad || !coordenadasCiudad[ciudad]) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        const {latitud, longitud} = coordenadasCiudad[ciudad]

        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`

        const fetchData = async () => {

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json();
                setData(result);

            } catch (err: any) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [ciudad]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}