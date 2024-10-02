import { router } from '../../app.js';

export function RequestAgentInfo() {
  
    const raw = JSON.stringify({
      "agent-profile": "1",
      "agent-id": AGENT_ID,
    });
console.log(AGENT_ID);

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
      document.getElementById("agent-name").innerText = data.first_name.toUpperCase() +" "+ data.last_name.toUpperCase();
      document.getElementById("fname").value = data.first_name.toUpperCase();
      document.getElementById("lname").value = data.last_name.toUpperCase();
      document.getElementById("phone").value = data.phone_number;
      document.getElementById("email").value = data.email; 
    });

    req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", textStatus.toString());
    });

    req.always(function(){
      
    });
}