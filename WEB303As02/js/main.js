// WEB303 Assignment 2
// Clay Laliberty
// 0673373


$(document).ready(function() {

    function loadContent(page) {
      $('#content').slideUp(500, function() {
        $.ajax({
          url: page + '.html',
          dataType: 'html',
          success: function(data) {
            
            $('#content').html(data).slideDown(500);
          },
          error: function() {
            $('#content').html('Error loading content.');
          }
        });
      });
    }

    $('#prospect').click(function(e) {
      e.preventDefault();
      loadContent('prospect');
    });
  
    $('#convert').click(function(e) {
      e.preventDefault();
      loadContent('convert');
    });
  
    $('#retain').click(function(e) {
      e.preventDefault();
      loadContent('retain');
    });
  });
  