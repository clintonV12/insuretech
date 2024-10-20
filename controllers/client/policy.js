import { router } from '../../app.js';

function datePostFix(date) {
  date = Number(date);
  switch (date){
    case 1:
      return "st";
      break;
    case 2:
      return "nd";
      break;
    case 3:
      return "rd";
      break;
    default:
      return "th";
  }
}

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
      document.getElementById("policy_id").innerText     = "#"+data.uuid;
      document.getElementById("purchase_date").innerText = data.reg_date;
      document.getElementById("comm_date").innerText     = data.comm_date;
      document.getElementById("comm_date2").innerText    = data.comm_date;
      document.getElementById("comm_date3").innerText    = data.comm_date;
      document.getElementById("comm_date4").innerText    = data.comm_date;
      document.getElementById("monthly_fee").innerText   = "E" + Number(data.monthly_cost).toFixed(2);
      document.getElementById("monthly_fee2").innerText  = "E" + Number(data.monthly_cost).toFixed(2);
      document.getElementById("monthly_fee2").innerText  = "E" + Number(data.monthly_cost).toFixed(2);
      document.getElementById("monthly_fee3").innerText  = "E" + Number(data.monthly_cost).toFixed(2);
      document.getElementById("policy_holder").innerText = data.account_holder;
      document.getElementById("policy_hold2").innerText  = data.account_holder;
      document.getElementById("holder_dob").innerText    = data.holder_dob;
      document.getElementById("holder_pin").innerText    = data.holder_pin;
      document.getElementById("holder_gender").innerText = data.holder_gender;
      document.getElementById("holder_phone").innerText  = data.holder_phone;
      document.getElementById("debit_day").innerText     = data.payment_date + datePostFix(data.payment_date) +" of Each Month";
      document.getElementById("debit_day2").innerText    = data.payment_date + datePostFix(data.payment_date);
      document.getElementById("debit_day3").innerText    = data.payment_date + datePostFix(data.payment_date);
      document.getElementById("cover_value").innerText   = "E" + Number(data.cover_value).toFixed(2);

      for (var i = data.beneficiaries.length - 1; i >= 0; i--) {
        const tbl = document.getElementById("ben_tbl");
        let row = `
          <tr>
            <td>
              <p class="text-sm font-weight-bold mb-0" id="ben_name">${data.beneficiaries[i].full_name} (${data.beneficiaries[i].percentage}%)</p>
              </td>
              <td>
              <p class="text-sm mb-0">${data.beneficiaries[i].national_id}</p>
              </td>
              <td>
              <p class="text-sm mb-0">${data.beneficiaries[i].relationship}</p>
              </td>
          </tr>
        `;

        tbl.insertAdjacentHTML('beforeend', row);
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