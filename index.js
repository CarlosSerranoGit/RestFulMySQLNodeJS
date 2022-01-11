console.log("Hello World From NodeJS");
const express = require('express');
const bodyParser = require('body-parser');
let db = require("./database");

const app=express();

app.use(bodyParser.urlencoded({limit:'5mb',extended:true}));
app.use(bodyParser.json({limit:'5mb',extended:true}));
//falta los cors <----
const port = 3000;

const router=express.Router();
// Configuramos endpoints
router.get('/notes',db.getAllNotes);
router.get('/notes/:id',db.getNoteById);

router.post('/notes',db.createNote);
router.put('/notes/:id',db.updateNote);

//fin de configuración endpoints
app.use(router);
app.listen(process.env.PORT || port,()=>{
    console.log("App ready to listen");
})


