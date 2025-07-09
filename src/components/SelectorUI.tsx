import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface SelectorUIProps {
  cityInput: string;
  onCityChange: (city: string) => void;
}


export default function SelectorUI(props: SelectorUIProps) {


    const handleChange = (event: SelectChangeEvent<string>) => {
        props.onCityChange(event.target.value)
    };

    return (
    <FormControl fullWidth>
        <InputLabel id="city-select-label">Ciudad</InputLabel>
        <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            onChange={handleChange} 
            value={props.cityInput}>

            <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
            <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"quito"}>Quito</MenuItem>
            <MenuItem value={"manta"}>Manta</MenuItem>
            <MenuItem value={"cuenca"}>Cuenca</MenuItem>

        </Select>
        
        {props.cityInput && (
        <p>
            Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{props.cityInput}</span>
        </p>
        )}

    </FormControl>
   )
}