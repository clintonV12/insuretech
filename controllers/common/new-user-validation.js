function validateName(name) {
    // Trim any whitespace at the beginning or end
    name = name.trim();

    // Check if the name is empty
    if (name.length === 0) {
        return "Name cannot be empty.";
    }

    // Check if the name length is within acceptable bounds
    if (name.length < 2 || name.length > 50) {
        return "Name must be between 2 and 50 characters.";
    }

    // Validate using a regex pattern to allow only letters, spaces, and hyphens
    if (!/^[a-zA-Z\s\-]+$/.test(name)) {
        return "Name can only contain letters, spaces, and hyphens.";
    }

    // If all checks pass, return true
    return true;
}

function validateFullName(name) {
    // Trim any whitespace at the beginning or end
    name = name.trim();

    // Check if the name is empty
    if (name.length === 0) {
        return "Name cannot be empty.";
    }

    // Check if the name length is within acceptable bounds
    if (name.length < 2 || name.length > 100) {
        return "Name must be between 2 and 100 characters.";
    }

    // Split the name by spaces or commas, allowing for both separators
    const nameParts = name.split(/[\s,]+/);

    // Ensure there are at least two parts (first and last name)
    if (nameParts.length < 2) {
        return "Please provide both first and last names.";
    }

    // Validate each part of the name
    for (let part of nameParts) {
        if (part.length < 2) {
            return "Each name part must be at least 2 characters long.";
        }
        if (!/^[a-zA-Z\-]+$/.test(part)) {
            return "Each name part can only contain letters and hyphens.";
        }
    }

    // If all checks pass, return true
    return true;
}

function validateIDNumber(idNumber) {
    // Check if the ID number is exactly 13 digits
    if (!/^\d{13}$/.test(idNumber)) {
        return "ID number must be exactly 13 digits.";
    }

    // Extract the 7th and 8th digits (6th and 7th indices in a zero-based index)
    const categoryCode = idNumber.substring(6, 8);
    const birthMonth   = idNumber.substring(2, 4);
    const birthDay     = idNumber.substring(4, 6);
    
    const validMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const validDays   = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

    // Define valid codes based on the conditions
    const validCodes = {
        swaziByBirth: ["11", "61", "21", "71"],
        swaziByRegistration: ["12", "62", "22", "72"],
        workPermitNonSwazi: ["10", "60"],
        refugee: ["14", "64"],
        swaziByKhonta: ["13", "63"]
    };

    // Check category code for validity
    if (
        !validMonths.includes(birthMonth) ||
        !validDays.includes(birthDay)
    ) {
        return "Invalid birth day.";
    }

    // Check category code for validity
    if (
        validCodes.swaziByBirth.includes(categoryCode) ||
        validCodes.swaziByRegistration.includes(categoryCode) ||
        validCodes.workPermitNonSwazi.includes(categoryCode) ||
        validCodes.refugee.includes(categoryCode) ||
        validCodes.swaziByKhonta.includes(categoryCode)
    ) {
        return true; // ID is valid
    } else {
        return "Invalid ID number.";
    }
}

function validateEmail(email) {
    // Trim any whitespace at the beginning or end
    email = email.trim();

    // Check if the email is empty
    if (email.length === 0) {
        return "Email cannot be empty.";
    }

    // Check if the email length is within acceptable bounds
    if (email.length < 5 || email.length > 100) {
        return "Email must be between 5 and 100 characters.";
    }

    // Validate using a regex pattern for a basic email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Invalid email format.";
    }

    // If all checks pass, return true
    return true;
}

function validatePhoneNumber(phoneNumber) {
    // Trim any whitespace at the beginning or end
    phoneNumber = phoneNumber.trim();

    // Check if the phone number is exactly 8 digits
    if (!/^\d{8}$/.test(phoneNumber)) {
        return "Phone number must be exactly 8 digits.";
    }

    // Check if the phone number starts with 76, 78, or 79
    if (!/^(76|78|79)/.test(phoneNumber)) {
        return "Phone number must start with 76, 78, or 79.";
    }

    // If all checks pass, return true
    return true;
}

function validateDateOfBirth(dob) {
    // Parse the date of birth into a Date object
    const birthDate = new Date(dob);

    // Check if the date is valid
    if (isNaN(birthDate.getTime())) {
        return "Invalid date of birth.";
    }

    // Get the current date
    const today = new Date();

    // Calculate the date exactly 18 years ago from today
    const minimumDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    // Check if birth date is before or equal to the minimum date
    if (birthDate > minimumDate) {
        return "Must be at least 18 years old.";
    }

    // If all checks pass, return true
    return true;
}

function getAgeFromIDNumber(idNumber) {
    let year    = parseInt(idNumber.substring(0, 2));
    const month = parseInt(idNumber.substring(2, 4)) - 1; //Months are 0 indexed
    const day   = parseInt(idNumber.substring(4, 6));

    const currentYear = new Date().getFullYear();
    const century = Math.floor(currentYear/100) * 100;
    year += (year + century) <= currentYear ? century : century - 100;

    const birthDate = new Date(year, month, day);
    const today = new Date();

    //calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function getDetailsFromIDNumber(idNumber) {
    const categoryCode = idNumber.substring(6, 8);

    switch(categoryCode){
        case "11":
            return {Nationality: "Swazi by birth", Gender: "Female", Born:"Before 2020"}
            break;
        case "21":
            return {Nationality: "Swazi by birth", Gender: "Female", Born:"After 2020"}
            break;
        case "61":
            return {Nationality: "Swazi by birth", Gender: "Male", Born:"Before 2020"}
            break;
        case "71":
            return {Nationality: "Swazi by birth", Gender: "Male", Born:"After 2020"}
            break;
        case "12":
            return {Nationality: "Swazi by registration", Gender: "Female", Born:"Before 2020"}
            break;
        case "22":
            return {Nationality: "Swazi by registration", Gender: "Female", Born:"After 2020"}
            break;
        case "62":
            return {Nationality: "Swazi by registration", Gender: "Male", Born:"Before 2020"}
            break;
        case "72":
            return {Nationality: "Swazi by registration", Gender: "Male", Born:"After 2020"}
            break;
        case "10":
            return {Nationality: "Work permits or non Swazi", Gender: "Female", Born:""}
            break;
        case "60":
            return {Nationality: "Work permits or non Swazi", Gender: "Male", Born:""}
            break;
        case "14":
            return {Nationality: "Refugee status", Gender: "Female", Born:""}
            break;
        case "64":
            return {Nationality: "Refugee status", Gender: "Male", Born:""}
            break;
        case "13":
            return {Nationality: "Swazi by Khonta (Not in issue anymore)", Gender: "Female", Born:""}
            break;
        case "63":
            return {Nationality: "Swazi by Khonta (Not in issue anymore)", Gender: "Male", Born:""}
            break;
    }
}

function newUserForm1Validator() {
  let errorElement  = document.getElementById("errorMsg1");
  let errorMessages = [];

  let firstName = document.getElementById("new-user-fn").value;
  let lastName  = document.getElementById("new-user-ln").value;
  let email     = document.getElementById("new-user-email").value;
  let idNumber  = document.getElementById("new-user-nid").value;

  // Validate each field
  let firstNameValidation = validateName(firstName);
  let lastNameValidation = validateName(lastName);
  let emailValidation = validateEmail(email); // Assuming validateEmail is correct
  let idNumberValidation = validateIDNumber(idNumber);

  // Check validation results and gather error messages
  if (firstNameValidation !== true) {
    errorMessages.push("First Name: " + firstNameValidation);
  }
  if (lastNameValidation !== true) {
    errorMessages.push("Last Name: " + lastNameValidation);
  }
  if (emailValidation !== true) {
    errorMessages.push("Email: " + emailValidation);
  }
  if (idNumberValidation !== true) {
    errorMessages.push("ID Number: " + idNumberValidation);
  }

  let ageRestriction = isWithinValidAgeRestriction("Scheme_Member", idNumber);
  if (!ageRestriction) {
    errorMessages.push("Age: " + "You do not meet our age restrictions.\n You must be 18 years and older but not older than 70 years at entry.");
  }

  // Display error message or proceed if no errors
  if (errorMessages.length > 0) {
    errorElement.innerText = "Please correct the following errors:\n" + errorMessages.join("\n");
    return false;
  } else {
    errorElement.innerText = ""; // Clear any previous errors
    return true;
  }
}