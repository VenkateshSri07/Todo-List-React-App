const router = require("express").Router();
const TodoData = require("../Models/TodoData");

router.post("/savetodo", (req, res) => {
    try {
        const { Id, Task, IsComplete } = req.body;
        if (Task == null || Task == '' || Task == undefined) {
            return res.status(400).json({ errormessage: "Please enter the Task" });
        } else {
            const newToDoData = new TodoData({
                "Id": Id,
                "Task": Task,
                "IsComplete": IsComplete
            });

            newToDoData.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Todo Saved", result)
                    res.send("Todo added to DB")
                }
            })
        }
    } catch (err) {
        connsole.error(err),
            res.status(500).send();
        return res.status()
    }
});


router.post("/removetodo", (req, res) => {
    try {
        const { Id } = req.body;
        TodoData.deleteOne({ Id: Id }, function (err) {
            if (err) console.log(err);
            console.log("Todo deleted");
            res.send("Todo deleted")

        });

    } catch (err) {
        console.error(err),
            res.status(500).send();
        return res.status()
    }
});

router.post("/updatetodo", (req, res) => {
    try {
        const { Id,IsComplete } = req.body;
        TodoData.updateOne( { Id: Id },
            [
               { $set: { IsComplete: IsComplete} },
            ], function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                  res.send("ToDo list updated ");
                }
            });

    } catch (err) {
        console.error(err),
            res.status(500).send();
        return res.status()
    }
});

router.get("/displaytodo", (req, res) => {
    try {
        TodoData.find({}, function (err, todoList) {
            res.send(todoList);
        });

    } catch (err) {
        console.error(err),
            res.status(500).send();
        return res.status()
    }
});


module.exports = router;