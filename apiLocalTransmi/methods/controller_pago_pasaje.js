const conect =require('../conectionBD');

//USERS VALOR TRANSMILENIO
function getPagoPasaje(request,response){
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
  getPagoPasaje
};
