const express=require ('express');
const cors=require ('cors');
const path=require ('path');
require('dotenv/config')

const app=express();

app.use(cors()); //enable cors
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use( express.static( path.join( __dirname1, 'client/dist' ) ) )

    app.get( '*', (request, response) => {
        response.sendFile( path.resolve( __dirname1, "client", "dist", "index.html" ) )
    } )
} else {
    app.get( "/", (request, response) => {
        response.json( {message: "Server is Up"} );
    } );
}

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/api/resume',require('./routes/create.route'));

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})