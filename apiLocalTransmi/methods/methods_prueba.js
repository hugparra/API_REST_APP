const conect =require('../conectionBD');

//GET ALL USERS
function getUsers(request,response){
  var id = request.params.id;
  var nombre = request.params.nombre;

  request.checkParams("id", "Enter a valid number.").isInt();
  var errors = request.validationErrors();
  if (errors) {
    response.send(errors);
    return;
  } else {
      conect.db.query('SELECT * FROM hola where id=?', [request.params.id], (err,rows) => {
        if(err) throw err;
          //console.log(rows[0].nombre);
        //  response.send({"user":rows[0].id, "ced":rows[0].nombre });
          response.end(JSON.stringify(rows));
      });
  }
}

module.exports={
  getUsers
};
