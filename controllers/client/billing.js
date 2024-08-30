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
      console.log(data);
      document.getElementById("account_phone").innerText  = "(+268) " + data.account_phone;
      document.getElementById("payment_phone").innerText  = "(+268) " + data.account_phone;
      document.getElementById("account_holder").innerText = data.account_holder;
      document.getElementById("payment_date").innerText   = data.payment_date;
      document.getElementById("plan_name").innerText      = data.plan_name;
      document.getElementById("plan_amount").innerText    = "E" + data.plan_price;
      });

    req.fail(function(jqXHR, textStatus, errorThrown){
        //if the call is not successful
        console.log(jqXHR);
        showErrorMsg("Error", textStatus.toString());
      });

    req.always(function(){
      
    });
}

export function SaveNewPhoneNumber() {
  const saveButton = document.getElementById('save_phone');
  saveButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      let phone = document.getElementById("new_phone").value;
      updatePhoneNumber(phone);
  });
}

function updatePhoneNumber(phone) {
  const raw = JSON.stringify({
    "billing-info-update": "1",
    "phone_number": USER_PHONE,
    "new_phone": phone,
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
      RequestBillingInfo();
      $("#new_phone_input").modal("hide");
    });

  req.fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      showErrorMsg("Error", textStatus.toString());
    });
}