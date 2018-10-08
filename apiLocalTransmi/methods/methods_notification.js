const conect =require('../conectionBD');

//GET ALL USERS
function getNotificationPush(request,response){
  return response.status(200).set('text/csv').send('{"estado":"ddd"}');
}

module.exports={
  getNotificationPush
};
