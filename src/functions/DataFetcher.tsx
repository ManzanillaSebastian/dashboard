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

        console.log(`USE EFFECT!`);

        if (!ciudad || !coordenadasCiudad[ciudad]) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        //Validando el tiempo transcurrido desde la última petición sobre la misma ciudad
        let tiempoTranscurrido : number = parseInt(localStorage.getItem(`fecha_${ciudad}`) ?? `0`);
        console.log(tiempoTranscurrido)

        if (Date.now() - tiempoTranscurrido <= 1800000) { // 30 min en milisegundos
            console.log(`Leyendo de datos locales...`);

            let dataLocal = JSON.parse(localStorage.getItem(`data_${ciudad}`)!);
            setData(dataLocal);
            setLoading(false);
            setError(null);
        }

        else{        

            console.log(`Obteniendo datos de la API...`);

            const {latitud, longitud} = coordenadasCiudad[ciudad]

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`

            const fetchData = async () => {

                try {

                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                    }

                    const result: OpenMeteoResponse = await response.json();

                    console.log(`Datos obtenidos:`, result);

                    setData(result);

                    localStorage.setItem(`data_${ciudad}`, JSON.stringify(result));
                    localStorage.setItem(`fecha_${ciudad}`, Date.now().toString());

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
        }

    }, [ciudad]);

    return { data, loading, error };

}