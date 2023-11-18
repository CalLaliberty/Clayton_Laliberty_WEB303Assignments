$(document).ready(function () {
  let originalData;
  let sortCounts = {};

  $.ajax({
    url: 'batman.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      originalData = data;

      
      const searchDiv = $('<div>').attr('id', 'search').addClass('text-center m-3');
      searchDiv.append('<label for="searchInput">Search by First Name:</label>');
      searchDiv.append('<input type="text" id="searchInput" class="form-control" placeholder="Enter first name">');

      const table = $('<table>').attr('id', 'characterTable');
      const thead = $('<thead>').append('<tr><th><a href="#" data-column="firstName">First Name</a></th><th><a href="#" data-column="lastName">Last Name</a></th><th><a href="#" data-column="age">Age</a></th><th><a href="#" data-column="dateOfBirth">Date of Birth</a></th><th><a href="#" data-column="occupation">Occupation</a></th><th><a href="#" data-column="description">Description</a></th></tr>');
      const tbody = $('<tbody>');

      const filtersDiv = $('<div>').attr('id', 'filters').addClass('buttons');
      filtersDiv.append('<button id="filterAM" class="btn btn-dark">A - M (0)</button>');
      filtersDiv.append('<button id="filterNZ" class="btn btn-dark">N - Z (0)</button>');
      filtersDiv.append('<button id="refresh" class="btn btn-dark">Refresh</button>');

      table.append(thead);
      table.append(tbody);

      
      $('#content-container').append(searchDiv);
      $('#content-container').append(table);
      $('#content-container').append(filtersDiv);

      
      function populateTable(characters) {
        const tableBody = $('#characterTable tbody');
        tableBody.empty();
        characters.forEach(function (character) {
          const row = $('<tr>');
          row.append($('<td>').text(character.firstName));
          row.append($('<td>').text(character.lastName));
          row.append($('<td>').text(character.age));
          row.append($('<td>').text(character.dateOfBirth));
          row.append($('<td>').text(character.occupation));
          row.append($('<td>').text(character.description));
          tableBody.append(row);
        });
      }

      populateTable(data);

      
      $('th').on('click', function () {
        const column = $(this).index();
        const isAscending = $(this).data('asc');
        sortCounts[column] = (sortCounts[column] || 0) + 1;

        if (sortCounts[column] % 3 === 0) {
          sortCounts[column] = 0;
          populateTable(originalData);
          resetFilterButtons();
          $('th').find('.chevron').remove();
          $(this).css('color', ''); 
          return;
        }

        const sortedData = data.slice();
        sortedData.sort(function (a, b) {
          const aValue = a[Object.keys(a)[column]];
          const bValue = b[Object.keys(b)[column]];

          if (sortCounts[column] % 2 === 1) {
            return aValue > bValue ? 1 : -1; 
          } else {
            return aValue < bValue ? 1 : -1; 
          }
        });

        $(this).data('asc', !isAscending);
        populateTable(sortedData);
        $('th').find('.chevron').remove();

        if (isAscending) {
          $(this).append('<span class="chevron">&#x25B2;</span>&nbsp;');
          $(this).css('color', 'green'); 
        } else {
          $(this).append('<span class="chevron">&#x25BC;</span>&nbsp;');
          $(this).css('color', 'red'); 
        }

        resetFilterButtons();
      });

      
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
