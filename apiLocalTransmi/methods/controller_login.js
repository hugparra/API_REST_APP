const conect =require('../conectionBD');
//GET LOGIN
function getLogin(request,response){
  let email = request.params.email;
  let pass = request.params.password;
  request.checkParams("email", "Enter a valid email address.").isEmail().isLength({min: 8 , max: 30}).trim();
  request.checkParams("password", "Enter a valid password.").isInt().isLength({min: 4 , max: 10}).trim();
  let errors = request.validationErrors();
  if (errors) {
    response.send(errors);
    return;
  } else {
     conect.db.query('SELECT EMAIL, PASSWORD,ID_USUARIO FROM LOGIN WHERE EMAIL =? AND PASSWORD =?', [email,pass], (err,rows) => {
       if(err)
          return response.status(500).send({error:err.sqlMessage});
      // response.status(200).send({id:id});
        response.json({login:{"email":rows[0].EMAIL,"password": ""+rows[0].PASSWORD+"","cedula": ""+rows[0].ID_USUARIO+""}});
    });
  }
}

module.exports={
  getLogin
};
