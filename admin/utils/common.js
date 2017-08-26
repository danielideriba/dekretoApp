module.exports = {
  //Acess Control
  ensureAuthenticated: function (req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      //req.flash('danger', 'Fazer o login');
      res.redirect('/admin/users/login');
    }
  }
}
