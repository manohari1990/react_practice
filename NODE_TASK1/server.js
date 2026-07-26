import app from './src/app.js'

const PORT = 5000;

// Start the server and listen to defined PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})