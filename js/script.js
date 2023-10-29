$(document).ready(function() {
    $('#accordion1 .accordion-button').on('click', function() {
       $(this).closest('.accordion').find('.accordion-collapse.show').collapse('hide');
    });
 
    $('#accordion2 .accordion-button').on('click', function() {
       $(this).closest('.accordion').find('.accordion-collapse.show').collapse('hide');
    });
 });
 
 $(document).ready(function() {
    $('#myTab a').on('click', function (e) {
       e.preventDefault();
       $(this).tab('show');
    });
 });
 