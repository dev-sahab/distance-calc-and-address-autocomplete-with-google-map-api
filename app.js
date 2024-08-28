// init elements
const originInput = document.getElementById("origin");
const destinationInput = document.getElementById("destination");
const distanceCalcForm = document.getElementById("distance-calc");
const errorMsg = document.querySelectorAll(".error-msg");
const mileOutput = document.getElementById("mile-output");

function initialize() {
  const originAutocomplete = new google.maps.places.Autocomplete(originInput);
  const destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput
  );
}

// Directly call initialize since the script is at the end of the body.
function distancCalc() {
  const origin = originInput.value; // Starting point
  const destinationValu = destination.value; // Ending point

  const service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destinationValu],
      travelMode: "DRIVING", // Mode of travel: DRIVING, WALKING, BICYCLING, TRANSIT
      unitSystem: google.maps.UnitSystem.METRIC, // Use IMPERIAL for miles, METRIC for kilometers
    },
    callback
  );
}

function callback(response, status) {
  if (status === "OK") {
    const distance = response.rows[0].elements[0].distance.text;
    const km = distance.split(" ")[0]; // init only kilometers
    mileOutput.textContent = `${km} kilo meters`; // preview price change
    console.log();
  } else {
    console.error("Error:", status);
  }
}
// destination calculator end

// hide error message when focus on field
destinationInput.onfocus = () => {
  !errorMsg[1].style.display ? "" : (errorMsg[1].style.display = "none");
};
originInput.onfocus = () => {
  !errorMsg[0].style.display ? "" : (errorMsg[0].style.display = "none");
};

// form submit action
distanceCalcForm.onsubmit = (e) => {
  e.preventDefault();

  if (!destinationInput.value && !originInput.value) {
    errorMsg.forEach((msg) => {
      return (msg.style.display = "block");
    });
  }
  if (!destinationInput.value) {
    return (errorMsg[1].style.display = "block");
  }
  if (!originInput.value) {
    return (errorMsg[0].style.display = "block");
  }

  refreshBtn.style.display = "block"; // show when submit form
  setTimeout(() => {
    refreshBtn.style.transform = "rotate(360deg)";
  }, 50);
  distancCalc();
};

// refresh btn
const refreshBtn = document.querySelector(".refresh-btn");
refreshBtn.onclick = () => {
  refreshBtn.style.transform = "rotate(0)";
  setTimeout(() => {
    originInput.value = "";
    destinationInput.value = "";
    mileOutput.textContent = "";
  }, 350);
  setTimeout(() => {
    refreshBtn.style.display = "none";
  }, 500);
};

initialize();
