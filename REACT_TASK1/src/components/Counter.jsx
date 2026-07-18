import { useState } from "react";

function Counter(){
    const [count, setCount] = useState(0);

    const incr = () => {
        setCount(num => num + 1)
    }

    const decr = () => {
        setCount(num => {
            return num === 0 ? 0 : num - 1
        })
    }

    const resetCount = () => {
        setCount(0)
    }

    return (
        <>
            <div className="row_content">
                <button aria-label="Decrement Count" className="primary__button" onClick={decr}>-</button>
                <h3 className="width_4 height_2 text_center primary__border pad_5">{count}</h3>
                <button aria-label="Increment Count" className="primary__button" onClick={incr}>+</button>
            </div>
            <div><button aria-label="Reset Count" onClick={resetCount} className="primary__button">Reset</button></div>
        </>
    )
}

export default Counter;
