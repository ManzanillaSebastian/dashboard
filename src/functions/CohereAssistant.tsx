import { CohereClientV2 } from 'cohere-ai';
import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from "../types/DashboardTypes"

const clienteCohere = new CohereClientV2({token: import.meta.env.VITE_COHERE_TOKEN});

export default function getCohereResponse(ciudad: string, dataFetcherOutput: OpenMeteoResponse){
  
    const [respuesta, setRespuesta] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {

        console.log(`USE EFFECT COHERE!`);

        const prompt = dataFetcherOutput !== null? `Escribe 6 recomendaciones no numeradas útiles para tener en cuenta considerando el clima de ${ciudad}, Ecuador donde la temperatura es de ${dataFetcherOutput!.current.temperature_2m} ${dataFetcherOutput!.current_units.temperature_2m}, la sensación térmica de ${dataFetcherOutput!.current.apparent_temperature} ${dataFetcherOutput!.current_units.apparent_temperature}, la velocidad del viento de ${dataFetcherOutput!.current.wind_speed_10m} ${dataFetcherOutput!.current_units.wind_speed_10m} y la humedad relativa de ${dataFetcherOutput!.current.relative_humidity_2m} ${dataFetcherOutput!.current_units.relative_humidity_2m}. Escribe exclusivamente la lista de recomendaciones. De cada recomendación, serpara porfa el título y la descripción con dos puntos (:). Separa porfa las recomendaciones usando el punto y coma (;).Empieza siempre las descripciones con mayúscula y no menciones las estadísticas del clima que mencioné porfa. Finalmente, porfa evita usar viñetas como el guión (-)`: "";
        
        const getResponse = async () => {

            try{

                if(prompt === ""){
                    setRespuesta("");
                }

                else if(!localStorage.getItem(`recomendaciones_${ciudad}`)){

                    console.log(`Obteniendo recomendaciones de Cohere...`);

                    setLoading(true)
                    const response = await clienteCohere.chat({
                        model: 'command-a-03-2025',
                        messages: [
                            {
                                role: 'user',
                                content: prompt,
                            },
                        ],
                    });

                    console.log(`Respuesta de Cohere:`, response);

                    localStorage.setItem(`recomendaciones_${ciudad}`, response!.message?.content?.[0].text || "");
                    setRespuesta(response!.message?.content?.[0].text || "");                
                }

                else{
                    console.log(`Leyendo recomendaciones de localStorage...`);
                    const recomendaciones = localStorage.getItem(`recomendaciones_${ciudad}`)!;
                    setRespuesta(recomendaciones);
                }

                setError(null);
            }

            catch(err){
                if (err instanceof Error) {
                    setError(err.message);
                } 

                else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }

                setRespuesta("");
            }

            finally{
                setLoading(false);
            }

        };
        getResponse();
    }, [dataFetcherOutput]);

    return { respuesta, loading, error };

};