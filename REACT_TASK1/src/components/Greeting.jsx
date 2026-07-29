import React from "react"

function Greeting(){
    console.log("Greeting Render")

    return (<h1>Grreting Manohari!</h1>)
}

export default React.memo(Greeting)