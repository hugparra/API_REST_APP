const conect =require('../conectionBD');

//GET USERS ID
function getUsers(request,response){
  let id = request.params.id;
  request.checkParams("id", "Enter a valid number.").isInt();
  let errors = request.validationErrors();
  if (errors) {
    response.send(errors);
    return;
  } else {
     conect.db.query('SELECT * FROM USUARIOS where cedula=?', [request.params.id], (err,rows) => {
       if(err)
          return response.status(500).send({error:err.sqlMessage});
      // response.status(200).send({id:id});
        response.end(JSON.stringify(rows));
    });
  }
}

//POST USERS
function saveUser(request,response){
    console.log('llega');

  let postdata =request.body;

  let id = request.body.id;
  let cedula = request.body.cedula;
  let nombre = request.body.nombre;
  let apellido = request.body.apellido;
  let sexo = request.body.sexo;
  let telefono = request.body.telefono;
  let edad = request.body.edad;
  let email = request.body.email;
console.log(postdata);
    conect.db.query('INSERT INTO USUARIOS SET ?', postdata, (err,rows) => {
      if (err)
        return response.status(500).send({error:err.sqlMessage});
      response.status(200).send({cedula:cedula});
    });
}

//UPDATE USERS
function updateUser(request,response){
  console.log('llega');
  request.checkBody("apellido", "Enter a valid name max or min number characters.").isLength({min: 5 , max: 30}).trim();
  request.checkBody("email", "Enter a valid email address.").isEmail().isLength({min: 8 , max: 30}).trim();
  request.checkBody("telefono", "Enter a valid number or max min number characters.").isInt().isLength({min: 10 , max: 10}).trim();

  let errors = request.validationErrors();
  if (errors) {
    response.send(404,errors);
    return;
  } else {
    let id = request.params.id;
    let apellido = request.body.apellido;
    let sexo = request.body.sexo;
    let telefono = request.body.telefono;
    let email = request.body.email;
    conect.db.query('UPDATE USUARIOS SET apellido=?, sexo=?, telefono=?,email=? where id=?',
    [apellido, sexo, telefono,email,id], (err,rows) => {
      if (err)
        return response.status(500).send({error:err.sqlMessage});
      response.status(200).send({id:id});
    });
  }
}

//DELETE USER
function deleteUser(request,response){
  console.log('llega');
  let id = request.params.id;
   console.log(id);
    conect.db.query('DELETE FROM USUARIOS WHERE ID =?',id, (err,rows) => {
      if (err)
        return response.status(500).send({error:err.sqlMessage});
      response.status(200).send({id:id});
    });
}

//USERS VALOR TRANSMILENIO
function getValorPasaje(request,response){
  let cedeula = request.params.idUsuario;
  request.checkParams("idUsuario", "Enter a valid number.").isInt();
  let errors = request.validationErrors();
  if (errors) {
    response.send(errors);
    return;
  } else {
    conect.db.query('SELECT COUNT(*)AS IDUSER FROM USUARIO WHERE ID_USUARIO =?',[cedeula], (err,rows) => {
      if(err)
         return response.status(500).send({error:err.sqlMessage});
      let existUser= rows[0].IDUSER;
      if (existUser==1) {
          conect.db.query('SELECT SALDO FROM TARJETA WHERE ID_USUARIO =?',[cedeula], (err,rows) => {
            if(err)
               return response.status(500).send({error:err.sqlMessage});
            let saldoCliente= rows[0].SALDO;
            conect.db.query('SELECT VALOR FROM VALORPASAJE', (err,rows) => {
                if(err)
                   return response.status(500).send({error:err.sqlMessage});
                let valorTransmi= rows[0].VALOR;
                if (saldoCliente>=valorTransmi) {
                    let valor=saldoCliente-valorTransmi;
                    conect.db.query('UPDATE TARJETA SET SALDO= ? WHERE ID_USUARIO = ?',
                    [valor,cedeula], (err,rows) => {
                      if (err)
                        return response.status(500).send({error:err.sqlMessage});
                      return response.status(200).set('text/csv').send('{"estado":"2"}'+'\n{"saldoActual":"'+valor+'"}');
                      //response.status(200).send({"estado:2}{saldoual":valor});
                    });
                }else{
                  response.status(200).send({estado:"1"}); //saldo insuficiente
                  return;
                }
             });
          });
      }else{
        response.status(200).send({estado:"0"});// usuario no existe
        return;
      }
    });
  }
}

module.exports={
  getUsers,saveUser,updateUser,deleteUser,getValorPasaje
};
