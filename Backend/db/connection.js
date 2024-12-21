import mongoose from 'mongoose'; 


export const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI).then((conn)=>{
        console.log(`connected to db ${conn.connection.host}`)
    }).catch((err)=>{
        console.log(err.message)
        process.exit(1)
    });
}
