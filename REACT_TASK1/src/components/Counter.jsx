import { useState } from "react";

// function Counter({count, resetCount, incr, decr}){
function Counter(){
    
    // below code is belongs to App.jsx    
    const [count, setCount] = useState(0);
    const [photos, setPhotos] = useState([])
    const [search, setSearch] = useState('')
    let newObject = {
        "albumId": 20,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    }
    const loadPhotos = async() =>{
        const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        if(!response.ok){
        console.error("Erro!")
        }
        const photos = await response.json()
        setPhotos(photos)
    }
    useEffect(()=>{
        loadPhotos()
    },[])

    const incr = () => {
        setCount(num => num + 1)
        newObject = {
        ...newObject,
        'title': newObject.title + (count+1),
        'id': parseInt(photos.length)+1
        }
        setPhotos((prev)=> [newObject, ...prev] )
    }

    const updatedPhotos = useMemo(()=>{
        return photos.filter((item)=> item.title.toLowerCase().includes(search.toLowerCase()) )
    },[photos, search])

    const decr = () => {
        setCount(num => {
        return num === 0 ? 0 : num - 1
        })
        newObject = {
        ...newObject,
        'title': newObject.title + (count+1),
        'id': parseInt(photos.length)+1
        }
        setPhotos((prev)=> [newObject, ...prev] )
    }

    const resetCount = () => {
        setCount(0)
        newObject = {
        ...newObject,
        'title': newObject.title + (count+1),
        'id': parseInt(photos.length)+1
        }
        setPhotos((prev)=> [newObject, ...prev] )
    }

    return (
        <>
            <div className="flex item-start gap-2">
                <button aria-label="Decrement Count" className="rounded-lg px-4 py-2 bg-gray-900 text-gray-100" onClick={decr}>-</button>
                <h3 className="rounded-lg border border-gray-300 text-heading text-sm px-3 py-2.5">{count}</h3>
                <button aria-label="Increment Count" className="rounded-lg px-4 py-2 bg-gray-900 text-gray-100" onClick={incr}>+</button>
                <div className=""><button aria-label="Reset Count" onClick={resetCount} className="rounded-lg px-4 py-2 bg-gray-900 text-gray-100">Reset</button></div>
            </div>
            
        </>
    )
}

export default Counter;
