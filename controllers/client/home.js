import { router } from '../../app.js';

export function RequestBillingInfo() {
  
    const raw = JSON.stringify({
      "billing-info": "1",
      "phone_number": USER_PHONE,
    });

    var req = $.ajax({
      "url": SERVER_URL + "client",
      "method": "POST",
      "data": raw,
      "headers": {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
        }
      });

    req.done(function(data){
        //if the call is successful
      document.getElementById("account_phone").innerText  = "(+268) " + data.account_phone;
      document.getElementById("payment_phone").innerText  = "(+268) " + data.account_phone;
      document.getElementById("account_holder").innerText = data.account_holder;
      document.getElementById("payment_date").innerText   = data.payment_date;
      document.getElementById("cover_value").innerText    = "E" + data.cover_value;
      document.getElementById("plan_amount").innerText    = "E" + data.plan_price + " p/m";
    });

    req.fail(function(jqXHR, textStatus, errorThrown){
        //if the call is not successful
        console.log(jqXHR);
        showErrorMsg("Error", textStatus.toString());
    });

    req.always(function(){
      RequestPaymentsInfo();
    });
}

export function PayNow() {
  const payButton = document.getElementById('pay');
  payButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      let phone  = document.getElementById("new_phone").value;
      let amount = document.getElementById("amount").value;
      requestPayment(phone, amount);
  });
}

function requestPayment(phone, amount) {
  const raw = JSON.stringify({
    "pay_now": "1",
    "phone_number": phone,
    "amount": amount,
  });

  var req = $.ajax({
    "url": SERVER_URL + "client",
    "method": "POST",
    "data": raw,
    "headers": {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
      }
    });

  req.done(function(data){
      showInfoMsg("Alert", data.message);
      $("#pay_now_input").modal("hide");
    });

  req.fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      showErrorMsg("Error", textStatus.toString());
    });
}

function RequestPaymentsInfo() {
  const raw = {
    "bills-info": 1,
    "phone_number": USER_PHONE,
  };

  var table = $('#bills_tbl').DataTable({
    processing: true,
    serverSide: false,
    pageLength: 5,
    responsive: true,
    bLengthChange: false,
    bFilter: false,
    ajax: {
      method: "POST",
      url: SERVER_URL + "client",
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
        title: "Amount",
        data: "amount"
      },
      {
        title: "Submited At",
        data: "created_at",
      }
    ]
  });

  $("#bills_tbl tbody").on("click", "tr", function() {
    var data = table.row(this).data();
    
  });

  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}