$(document).ready(function () {
  let originalData; 

  $.ajax({
    url: 'batman.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      originalData = data; 

      function populateTable(characters) {
        const tableBody = $('#characterTable tbody');
        tableBody.empty();
        characters.forEach(function (character) {
          const row = $('<tr>');
          row.append($('<td>').text(character.firstName));
          row.append($('<td>').text(character.lastName));
          row.append($('<td>').text(character.age));
          row.append($('<td>').text(character.occupation));
          row.append($('<td>').text(character.description));
          tableBody.append(row);
        });
      }

      populateTable(data);

      $('#searchInput').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();
        $('#characterTable tbody tr').each(function () {
          const firstNameCell = $(this).find('td:first');
          const firstName = firstNameCell.text().toLowerCase();
          if (searchTerm === '') {
            firstNameCell.removeClass('highlight');
          } else if (firstName.includes(searchTerm)) {
            firstNameCell.addClass('highlight');
          } else {
            firstNameCell.removeClass('highlight');
          }
        });
      });

      $('#filterAM').on('click', function () {
        const count = filterAndShow('a', 'm');
        $(this).text(`A - M (${count})`);
        resetFilterButtons();
      });

      $('#filterNZ').on('click', function () {
        const count = filterAndShow('n', 'z');
        $(this).text(`N - Z (${count})`);
        resetFilterButtons();
      });

      $('#refresh').on('click', function () {
        populateTable(originalData);
        resetFilterButtons();
      });
    },
    error: function () {
      console.log('Error loading character data.');
    },
  });

  function filterAndShow(startChar, endChar) {
    const count = $('#characterTable tbody tr:visible').filter(function () {
      const lastName = $(this).find('td:eq(1)').text();
      return lastName.charAt(0).toLowerCase() >= startChar && lastName.charAt(0).toLowerCase() <= endChar;
    }).length;
    $('#characterTable tbody tr').hide();
    $('#characterTable tbody tr').filter(function () {
      const lastName = $(this).find('td:eq(1)').text();
      return lastName.charAt(0).toLowerCase() >= startChar && lastName.charAt(0).toLowerCase() <= endChar;
    }).show();
    return count;
  }

  function resetFilterButtons() {
    $('#filterAM').text('A - M (0)');
    $('#filterNZ').text('N - Z (0)');
  }
});
