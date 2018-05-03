var mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

//schema.plugin(AutoIncrement, {inc_field: 'id'});
var schema= new Schema({
    "School_Id" : {type:String},
    "Teacher_Id":{type:String},
    "First_Name": {type:String},
    "Last_Name": {type:String},
    "Date_of_birth": {type:String},
    "Age": {type:String},
    "Qualification": {type:String},
    "Expreience": {type:String},
    "Package": {type:String},
     "Address":{type:String},
    "Phone_Number":  {type:String},

})


module.exports=mongoose.model('teacher_details',schema);

/*autoIncrement.getNextSequence(Teacher, teacher_details, function (err, autoIndex) {

var  = Teacher.collection(teacher_details);*/
