var mongoose = require('mongoose'); 
var express = require('express'); 
var router = express.Router(); 
var TaskModel = require('./task_schema'); 
const env = require('node-env-file'); // .env file
env(__dirname + '/.env');

// Connecting to database 
    var query = 'mongodb+srv://'+process.env.DBMONGOUSER+':'+process.env.DBMONGOPASS+'@'+process.env.DBMONGOSERV+'/'+process.env.DBMONGO+'?retryWrites=true&w=majority';

    const db = (query);
    mongoose.Promise = global.Promise;
    
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (error) {
        if (error) {
            console.log("Error!" + error);
        } else {
            console.log("Conexion a base de datos exitosa");
        }
    });
    router.get('/test', function (req, res) {
        res.send("Testeando");
    });
    router.post('/save', function (req, res) {
        let task_id,name,deadline; // Tuve que declarar las variables así para que las tomara en todo el contexto. Lo otro en el body en mi local estaba tomando como indefinido y dejaba los valores vacios en mongo
        if(req.body.TaskId != undefined){
            task_id = req.body.TaskId;
            name = req.body.Name;
            deadline = req.body.Deadline;
        } else {
            task_id = req.query.TaskId
            name = req.query.Name;
            deadline = req.query.Deadline;
        }
        console.log(task_id);
        let task = {
            TaskId: task_id,
            Name: name,
            Deadline: deadline,
        }
        if(task_id == undefined && name == undefined && deadline == undefined)
        {
            console.log(task);
            res.send("Check Data parameters");
        } else {
            var newTask = new TaskModel(task);
            
            newTask.save(function (err, data) {
                if (err) {
                    console.log(error);
                    res.send("Error No Data inserted");
                }
                else {
                    res.send("Data inserted");
                }
            });
        }

    });

module.exports = router;
