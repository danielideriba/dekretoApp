$(document).ready(function(){
  $('.delete-user').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/admin/users/'+id,
      success: function(response){
        console.log('Deletado o id '+id);
        window.location.href='/admin/users/list?action=del'+id
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
