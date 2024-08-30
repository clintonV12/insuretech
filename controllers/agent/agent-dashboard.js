import { router } from '../../app.js';

export function RequestMyClientInfo() {
  
    const raw = JSON.stringify({
      "my-clients": "1",
      "username": AGENT_USERNAME,
    });

    var req = $.ajax({
      "url": SERVER_URL + "agent",
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

      if (data.num_clients != null){
        displayClintsTable(data.num_clients, data.clients);  
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

function displayClintsTable(countC, clientList) {
  countC = Number(countC);

  if (countC > 0) {
    let tbl = document.getElementById("client-tbl");
    tbl.innerHTML = ``;

    for (var i = countC - 1; i >= 0; i--) {
      tbl.innerHTML = `
        <tr>
          <td class="align-middle text-center">
            <div class="d-flex px-2 py-1">
              <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">${clientList[i]['phone_number']}</h6>
              </div>
            </div>
          </td>
          <td>
            <span class="badge badge-dot me-4">
              <i class="bg-danger"></i>
              <span class="text-dark text-xs">
                ${clientList[i]['first_name']}
              </span>
            </span>
          </td>
          <td class="align-middle text-center text-sm">
            <p class="text-secondary mb-0 text-sm">
              ${clientList[i]['last_name']}
            </p>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">Active</span>
          </td>
        </tr>
      `;
    }
  }
}