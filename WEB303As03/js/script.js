// Clay Laliberty
// Assignment 3


function fetchTeamDataUsingGetJSON() {
    $.getJSON('team.json', function(data) {
        insertTeamData(data.members);
    });
}


function fetchTeamDataUsingAjax() {
    $('#team').text('Loading...');
    
    
    setTimeout(function() {
        $.ajax({
            type: 'GET',
            url: 'team.json',
            dataType: 'json',
            success: function(data) {
                
                insertTeamData(data.members);
            },
            error: function() {
                
                $('#team').text('Error: Content could not be retrieved.');
            }
        });
    }, 3000); 
}

function insertTeamData(members) {
    var teamDiv = $('#team');
    
    
    teamDiv.empty();
  
    
    $.each(members, function(index, member) {
        
        var nameElement = $('<h2>').text(member.name);
        var positionElement = $('<h5>').text(member.position);
        var bioElement = $('<p>').text(member.bio);
        
        
        teamDiv.append(nameElement, positionElement, bioElement);
    });
}


$(document).ready(function() {
    fetchTeamDataUsingAjax();               // 1
    // fetchTeamDataUsingGetJSON();         // 2    
});


