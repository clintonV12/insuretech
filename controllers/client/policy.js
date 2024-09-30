import { router } from '../../app.js';

export function RequestPolicyInfo() {
  
    const raw = JSON.stringify({
      "policy-info": "1",
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
      document.getElementById("policy_holder").innerText = data.account_holder;
      document.getElementById("policy_id").innerText     = "#"+data.uuid;
      document.getElementById("reg_date").innerText      = data.reg_date;
      document.getElementById("b-name").innerText        = data.beneficiary_phone;
      document.getElementById("b-id").innerText          = data.beneficiary_national_id;
      document.getElementById("b-phone").innerText       = data.beneficiary_phone;
      document.getElementById("cover_value").innerText   = "E" + Number(data.cover_value).toFixed(2);
      });

    req.fail(function(jqXHR, textStatus, errorThrown){
        //if the call is not successful
        console.log(jqXHR);
        showErrorMsg("Error", textStatus.toString());
      });

    req.always(function(){
      
    });
}