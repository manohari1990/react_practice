import React from 'react'
function DummyPhotos({photos, setSearch, search}){
    console.log("DummyPhotos!")
    return (
        <>
            <input name="search" id="searchtitle" type="search" onChange={(e)=>setSearch(e.target.value)} value={search}/>
            {
                photos.length > 0 && photos.map((item)=>{
                    return <PhotoItem key={item.id} item={item}/>
                })
            }
        </>
    )
}
export default DummyPhotos



const PhotoItem = React.memo(({item}) => {
    console.log(item.id);
    return <h1 key={item.id}>{item.title}</h1>
})