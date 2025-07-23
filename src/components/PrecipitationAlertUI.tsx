import Alert from '@mui/material/Alert';


interface PrecipitationAlertProps {
    precipitation : number;
}

export default function PrecipitationAlertUI( prop :PrecipitationAlertProps ) {
    if (prop.precipitation > 0.1) {
        return (
            <Alert severity="warning" sx={{ width: "100%" }}>
                <strong>Alerta de Precipitación</strong>
            </Alert>
        );
    }
    else {
        return (
            <Alert variant="standard" sx={{ width: "100%" }}>
                <strong>No se prevee Precipitación</strong>
            </Alert>
        );
    }
}