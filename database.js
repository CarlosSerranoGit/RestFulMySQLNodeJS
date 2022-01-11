const sql = require('mysql');
const pool = sql.createPool({
    host:'localhost',
    user:'root',
    database:'notea'
});
const table = 'notes';

const getAllNotes = (request,response)=>{
    console.log("Leyendo todas las notas");
    const q=`SELECT * FROM ${table}`;
    pool.query(q,(error,result)=>{
        if(error){
            console.log(error);
            response.status(403).json("Error en la consulta");
        }else{
            response.status(200).json(result);  //result.rows
        }
    });
}

const getNoteById = (request, response)=>{
    console.log("Leyendo una nota: "+request.params.id);
    //const id=sql.escape(request.params.id);
    const q=`SELECT * FROM ${table} WHERE id=?`;
    
    pool.query(q,[request.params.id],(error,result)=>{
        if(error){
            console.log(error);
            response.status(403).json("Error en la consulta");
        }else{
            response.status(200).json(result);  //result.rows
        }
    });
}

const createNote= (request,response)=>{
    let q=`INSERT INTO ${table} (title,description) VALUES (?,?)`;
    pool.query(q,[request.body.title,request.body.description],
            (error,result)=>{
                if(error){
                    console.log(error);
                    response.status(403).json("Error en la consulta");
                }else{
                    response.status(200).json(result.insertId);
                    //result[1].rows.id
                }
            })
}

const updateNote= (request,response)=>{
    let q=`UPDATE ${table} SET title=?,description=? WHERE id=?`;
    pool.query(q,[request.body.title,request.body.description,request.params.id],
            (error,result)=>{
                if(error){
                    console.log(error);
                    response.status(403).json("Error en la consulta");
                }else{
                    response.status(200).json("Nota actualizada");
                    //result[1].rows.id
                }
            })
}

module.exports={
    getAllNotes,
    getNoteById,
    createNote,
    updateNote
}