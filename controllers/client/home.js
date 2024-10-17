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

      if (data.invoices != false) {
        
        for (var i = 0; i < data.invoices.length; i++) {
          const tbl = document.getElementById("invoice_tbl");
          let row = `
            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark font-weight-bold text-sm">E ${Number(data.invoices[i].amount).toFixed(2)}</h6>
              </div>
              <div class="d-flex align-items-center text-sm">
                <span class="text-sm text-dark">${data.invoices[i].created_at}</span>
              </div>
            </li>
          `;

          tbl.insertAdjacentHTML('beforeend', row);
        }
      }
    });

    req.fail(function(jqXHR, textStatus, errorThrown){
        //if the call is not successful
        console.log(jqXHR);
        showErrorMsg("Error", textStatus.toString());
    });

    req.always(function(){
      
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
