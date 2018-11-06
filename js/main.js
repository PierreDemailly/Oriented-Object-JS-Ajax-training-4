/**
 * Class representing a client
 */
class Client {
  constructor() {
    this.clients = [];
  }

  /**
   * Push client to the object
   * @param {any[]} client
   */
  addClient(client) {
    this.clients.push(client);
  }
}

/**
 * Class representing a table
 */
class Table {
  /**
   * Send clients array to the object
   * @param {any[]} Clients
   */
  constructor(Clients) {
    this.clients = Clients;
  }

  /**
   * Transform clients array into HTML Table
   */
  construct() {
    let table = '<table>';
    table += '<tr>';
    Object.keys(this.clients[0]).forEach(function (e) {
      table += '<td>' + e +'</td>'
    });
    table += '</tr>';
    for (let i = 0; i < this.clients.length; i++) {
      table += '<tr>';
      Object.values(this.clients[i]).forEach(function (e) {
        table += '<td>' + e + '</td>';
      });
      table += '</tr>';
    }
    table += '</table >';
    $('#clients').html(table);
  }

  /**
   * Sort clients by ID
   */
  sortById() {
    this.clients.sort(function (a, b) {
      return a.id > b.id;
    });
    this.construct();
  }

  /**
   * Sort clients by Name
   */
  sortByName() {
    this.clients.sort(function (a, b) {
      return a.name > b.name;
    });
    this.construct();
  }

  /**
   * Sort clients by Age
   */
  sortByAge() {
    this.clients.sort(function (a, b) {
      return a.age > b.age;
    });
    this.construct();
  }

  /**
   * Sort clients by City
   */
  sortByCity() {
    this.clients.sort(function (a, b) {
      return a.city > b.city;
    });
    this.construct();
  }

}

$(document).ready(function () {
  var client = new Client();

  $.ajax({
      type: 'GET',
      url: 'clients.json',
    async: false,
      data: '*',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        client.addClient(data[i]);
      }
    },
    error: function (request, error) {
      console.log(arguments);
      alert(" Can't do because: " + error);
    }
  });

  table = new Table(client.clients);
  table.construct();

  $('#select-key').on('change', function () {
    switch ($(this).val()) {
      case "id":
        table.sortById();
        break;
      case "name":
        table.sortByName();
        break;
      case "age":
        table.sortByAge();
        break;
      case "city":
        table.sortByCity();
        break;
      default:
        break;
    }
  })
});
