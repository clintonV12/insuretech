import { router } from '../../app.js';

export function RequestMyClientInfo() {
  RequestClientsInfo();
}

function RequestClientsInfo() {
  const raw = {
    "my-clients": "1",
    "username": AGENT_USERNAME,
  };

  var table = $('#client_tbl').DataTable({
    processing: true,
    serverSide: false,
    pageLength: 5,
    responsive: true,
    bLengthChange: false,
    bFilter: true,
    layout: {
      bottomStart: {
        buttons: ['copyHtml5','csvHtml5', 'print']
      }
    },
    ajax: {
      method: "POST",
      url: SERVER_URL + "agent",
      data: function(d) {
        return JSON.stringify(raw);
      },
      dataSrc: "",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      error: function(xhr, error, code) {
        console.error("AJAX Error: ", error, code);
        console.log(xhr);
      }
    },

    columns: [
      {
        title: "Phone Number",
        data: "phone_number"
      },
      {
        title: "First Name",
        data: "first_name"
      },
      {
        title: "Last Name",
        data: "last_name"
      },
      {
        title: "Email",
        data: "email"
      }
    ]

  });

  $("#client_tbl tbody").on("click", "tr", function() {
      var data = table.row(this).data();
    });

  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}