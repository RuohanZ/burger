var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

router.get("/",function(req,res){
    burger.selectAll(function(data){
        res.render("index",{burgers:data})
    });
});

router.post("/api/burgers", function(req,res){
    burger.insertOne("burger_name",req.body.burger_name,function(data){
        res.json(data);
    }
)
});

router.put("/api/burgers/:id",function(req,res){
    var condition= "id = "+ req.params.id;
    burger.updateOne("devoured ="+req.body.devoured,condition,function(data){
        if (data.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    })
});

router.delete("/api/burgers/:id",function(req,res){
    var condition= "id = " + req.params.id;
    burger.deleteOne(condition,function(data){
        if (data.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    })
})



module.exports = router;