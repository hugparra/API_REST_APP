const  mysql     = require ( 'mysql' ) ;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'userTransmi',
  password: '12345678',
  database: 'transmidb',
  insecureAuth : true
});

db.connect((err) => {
  if(err){
     console.log('Error connecting to Db');
	//console.error('Error connecting to Db');
      process.env ['msg']='conexion errada '+ err;
      return;
  }else{
    process.env ['msg']='conexion correcta '+ process.env.RDS_HOSTNAME;
  }
    //return;
  console.log('Connection established');

});
exports.db=db;
