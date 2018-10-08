const userController=require('../methods/controller_user');
const pagoPasajeController=require('../methods/controller_pago_pasaje');
const pruebaController=require('../methods/methods_prueba');
const loginController=require('../methods/controller_login');

const express=require('express');
const router = express.Router();

router.get('/User/:id',userController.getUsers);
router.get('/prueba/:id/:cedula',pruebaController.getUsers);
router.post('/User/:id',userController.saveUser);
router.put('/User/:id',userController.updateUser);
router.delete('/User/:id',userController.deleteUser);
router.get('/User/Cuenta/ValorPasaje/:idUsuario',pagoPasajeController.getPagoPasaje);
router.get('/email/:email/password/:password',loginController.getLogin);

module.exports=router;
