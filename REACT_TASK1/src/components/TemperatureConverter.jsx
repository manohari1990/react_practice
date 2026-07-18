// This component owns the state.
// Celsius → Fahrenheit = F = (C × 9/5) + 32
// Fahrenheit → Celsius = C = (F - 32) × 5/9
// Result => 25°C = 77°F OR 100°F = 37.8°C

import { useState } from "react";
import ComponentInput from './ComponentInput'

const TemperatureUnits = [
    {
        'label': 'Fahrenheit',
        'value': 'F'
    },
    {
        'label': 'Celcius',
        'value': 'C'
    }
] 

function TemperatureConverter () {
    const [unit, setUnit] = useState('C')
    const [toggleButton, setToggleButton] = useState('F')
    const [inputValue, setInputValue] = useState('')
    const [convertedValue, setConvertedValue] = useState(null)
    let result = 0

    const convertTemperature = (value) =>{
        if (isNaN(value)) {
            setConvertedValue("Invalid input!") 
            return false;
        }
        setInputValue(value)
        result = (unit == 'F') ? (Number(value) - 32) * 5/9 : (Number(value) * 9/5) + 32
        setConvertedValue(result+toggleButton)
    }

    const switchButton = (event) =>{
        let currentUnit = event.target.value
        setUnit(currentUnit)
        let toggledUnit = (currentUnit == 'F') ? 'F' : 'C'
        setToggleButton(toggledUnit)
    }

    return (
        <div className="row_container">
            <ComponentInput 
                label={unit}
                value={inputValue}
                onChange={convertTemperature}
                switchUnit={switchButton}
                unitMap={TemperatureUnits}
            />
            <div className="pad_5"><h3>{convertedValue}{result}</h3></div>
        </div>
    )
}

export default TemperatureConverter