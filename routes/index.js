var express = require('express');
var router = express.Router();
var Teacher= require('../models/teacher');
/*var autoIncrement = require('mongoose-auto-increment');


Teacher.plugin(autoIncrement.plugin, {
    model: 'teacher',
    field: 'Teacher_Id',
    startAt: 100,
    incrementBy: 1
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get all records*/
router.get('/fetch', function(req, res, next) {
  console.log("info");
  Teacher.find({},function(err,data){
      if(err)
      res.send(err);
      else {
        res.json(data);
      }
  });
});

/* Get teachers details of a particular school */
router.get('/getteachers/:School_Id',function(req,res,next){
  Teacher.find({School_Id: req.params.School_Id},function(err,data){
    if(err)
    res.send(err);
    else {
      res.json(data);
    }
  })
})

/*Get particular teacher details using school and teacher Id */
router.get('/getteacher/:School_Id/:Teacher_Id',function(req,res,next){
  Teacher.find({School_Id: req.params.School_Id,Teacher_Id:req.params.Teacher_Id},function(err,data){
    if(err)
    res.send(err);
    else {
      res.json(data);
    }
  })
})

/* Delete  a particular teacher details */
router.get('/delete/:School_Id/:Teacher_Id',function(req,res,next){
  Teacher.remove({School_Id: req.params.School_Id,Teacher_Id:req.params.Teacher_Id},function(err,data){
    console.log('deleted');
    res.json(data);
  })
})

/*router.get('/del/:School_Id', function(req,res,next){
  var query = {School_Id: req.params.School_Id,
               Teacher_Id:req.params.Teacher_Id};
  Teacher.remove(query,function(err){
    res.send("deleted")
  })
})
*/

/* Add teachers */
router.post('/add',function(req,res,next){
  var t=new Teacher({
    School_Id:req.body.School_Id,
    Teacher_Id:1,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Date_of_birth:req.body.Date_of_birth,
    Age: req.body.Age,
    Qualification:  req.body.Qualification,
    Expreience: req.body.Experience,
    Package: req.body.Package,
    Address:req.body.Address,
    Phone_Number:  req.body.Phone_Number,
  })
  t.save(function(err,suc){
    if(err)
    res.send(err)
    else {

      Teacher.count({}, function( err, count){

        var sc="T"+count++
        Teacher.findOneAndUpdate({_id:suc.id}, {Teacher_Id:sc}, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});

})
    //  res.send(suc)
    }
    function getNextSequenceValue(sequenceName){

      var sequenceDocument = db.counters.findOneAndUpdate(
        { "_id" : sequenceName },
         { $inc : { sequence_value : 1 } },
         { new : true }
       );
   return sequenceDocument.sequence_value;
 }
  /*  t.nextCount(function(err, count) {

             // count === 1 -> true

         }); */
  })

})



/* Update particular teacher details */
router.put('/update/:School_Id/:Teacher_Id', function(req,res,next){
var query={School_Id: req.params.School_Id,
             Teacher_Id:req.params.Teacher_Id};
      Teacher.update(query, req.body, function(err,data){
                   if(err) res.json(err);
                   else {
                     res.json(data)
                   }

  })
})



/*router.put('/update1/:School_Id/:Teacher_Id', function(req,res,next){
 var query = {School_Id: req.params.School_Id,
               Teacher_Id:req.params.Teacher_Id};
      var update={
        School_Id:req.body.School_Id,
        Teacher_Id:req.body.Teacher_Id,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Date_of_birth:req.body.Date_of_birth,
        Age: req.body.Age,
        Qualification:  req.body.Qualification,
        Expreience: req.body.Experience,
        Package: req.body.Package,
        Address:req.body.Address,
        Phone_Number:  req.body.Phone_Number,
      }

      Teacher.findOneAndUpdate(query,update,function(err,data){
       if(err) res.json(err);
       else {
         res.json("data")
       }
)
})
*/

  /*
  Teacher.save(function(err,value){
    "School_Id" : {type:String},
    "Teacher_Id":{type:String},
    "First Name":
    "Last Name":
    "Date of birth":
    "Age":
    "Qualification":
    "Expreience":
    "Package":
     "Address":
    "Phone Number":

    if(value)
  res.send("saved")
  else {
    res.send(err);
  }
*/






module.exports = router;
