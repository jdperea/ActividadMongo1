var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var TaskModel = require('./task_schema');

// Connecting to database 
var query = 'mongodb+srv://<db_user>:<pass>@cluster0.hjufz.mongodb.net/<db_name>?retryWrites=true&w=majority'

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

router.post('/save', function (req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }

    var newTask = new TaskModel(task);

    newTask.save(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});

module.exports = router;
