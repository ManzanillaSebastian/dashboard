import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface CohereResponse{
    contenido : string;
}

export default function CohereTipsUI(respuestaCohere : CohereResponse) {

    const recomendaciones = respuestaCohere.contenido.slice(2).replace(/\*/g, "").split(";").map( (recomendacion) => {
        const recomendacionDividida = recomendacion.split(":").map((elemento) => elemento.trim());

        return (
            <Grid size={{ xs: 12, md: 6}} alignItems={"center"}>

                <Alert sx={{textAlign: "left", height: "100%", display: "flex", alignItems: "center"}} severity="info">

                    <AlertTitle sx={{fontWeight: "bold"}}>
                        {recomendacionDividida[0]}
                    </AlertTitle>

                    {recomendacionDividida[1]}

                </Alert>

            </Grid>
        )
    } );

    return <>{recomendaciones}</>
}