// This component should receive everything through props
// label value onChange
// Do not use useState inside ComponentInput

function ComponentInput ({label, value, onChange, switchUnit, unitMap}){

    return(
        <div>
            <input placeholder="Enter value" className="primary__input text_center" onChange={(event)=>onChange(event.target.value)} />
            <select name="label" id="unit_label" value={label} onChange={switchUnit}>
                <option value="">Select Unit</option>
                {
                    unitMap.length > 0 && unitMap.map((unit)=>{
                        return (
                            <option key={unit.value} value={unit.value}>{unit.label}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}

export default ComponentInput