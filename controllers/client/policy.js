import { router } from '../../app.js';

function datePostFix(date) {
  date = Number(date);

  // Handle special cases for 11, 12, and 13
  if (date % 100 >= 11 && date % 100 <= 13) {
      return "th";
  }

  // Handle other cases based on the last digit
  switch (date % 10) {
      case 1:
          return "st";
      case 2:
          return "nd";
      case 3:
          return "rd";
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

      document.getElementById("comm_date4").innerText    = data.comm_date;
      document.getElementById("monthly_fee").innerText   = "E" + Number(data.monthly_cost).toFixed(2);
      
      document.getElementById("policy_holder").innerText = data.account_holder;
      document.getElementById("policy_hold2").innerText  = data.account_holder;
      document.getElementById("holder_dob").innerText    = data.holder_dob;
      document.getElementById("holder_pin").innerText    = data.holder_pin;
      document.getElementById("holder_gender").innerText = getDetailsFromIDNumber(data.holder_pin).Gender;
      document.getElementById("holder_phone").innerText  = data.holder_phone;
      document.getElementById("momo_number").innerText   = "(+268) "+data.holder_phone;
      document.getElementById("debit_day").innerText     = data.payment_date + datePostFix(data.payment_date) +" of Each Month";
      document.getElementById("debit_day2").innerText    = data.payment_date + datePostFix(data.payment_date);
      document.getElementById("debit_day3").innerText    = data.payment_date + datePostFix(data.payment_date);
    
      const tbl = document.getElementById("covered_tbl");
      for (var i = 0; i < data.covered_people.length; i++) {
        let row = `
          <tr>
            <td>
              <p class="text-xs font-weight-bold mb-0">
                ${data.covered_people[i].full_name} <br>
                ${data.covered_people[i].relationship}<br>
                ${getBirthDayFromIDNumber(data.covered_people[i].national_id)}
              </p>
              </td>
              <td>
              <p class="text-sm mb-0">${data.comm_date}</p>
              </td>
              <td>
              <p class="text-sm mb-0">E ${Number(data.covered_people[i].benefit_amount).toFixed(2)}</p>
              </td>
              <td>
              <p class="text-sm mb-0">E ${Number(data.covered_people[i].monthly_premium).toFixed(2)}</p>
              </td>
          </tr>
        `;

        tbl.insertAdjacentHTML('beforeend', row);
      }

      let row = `
      <tr>
        <td><p class="text-md font-weight-bold mb-0">Total Premium</p></td>
        <td></td><td></td>
        <td><p class="text-md font-weight-bold mb-0">E ${Number(data.monthly_cost).toFixed(2)}</p></td>
      </tr>`;
      tbl.insertAdjacentHTML('beforeend', row);

      for (var i = data.beneficiaries.length - 1; i >= 0; i--) {
        const tbl = document.getElementById("ben_tbl");
        let row = `
          <tr>
            <td>
              <p class="text-sm font-weight-bold mb-0" id="ben_name">${data.beneficiaries[i].full_name}</p>
              </td>
              <td>
              <p class="text-sm mb-0">(+268) ${data.beneficiaries[i].phone_number}</p>
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