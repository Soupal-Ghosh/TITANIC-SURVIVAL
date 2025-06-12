// Set default values on page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("age").value = "0";
  document.getElementById("sibsp").value = "0";
  document.getElementById("fare").value = "0";
});

// Predict button click handler
/*
document.getElementById("predict-btn").addEventListener("click", async () => {
  const data = {
    pclass: document.getElementById("pclass").value,
    sex: document.getElementById("sex").value,
    age: document.getElementById("age").value,
    sibsp: document.getElementById("sibsp").value,
    fare: document.getElementById("fare").value,
  };

  try {
    const response = await fetch("http://localhost:3000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const result = await response.json();
    console.log("Prediction result:", result);

    const resultEl = document.getElementById("prediction-result");
    const survived = result.result.survived;

    resultEl.textContent = "Prediction: " + (survived === 1 ? "Survived" : "Did not survive");
    resultEl.style.display = "block";
    resultEl.classList.remove("hidden");

  } catch (error) {
    console.error("Error:", error);
    const resultEl = document.getElementById("prediction-result");
    resultEl.textContent = "Error getting prediction. Check server.";
    resultEl.style.display = "block";
    resultEl.classList.remove("hidden");
  }
});*/
const inputIds = ["pclass", "sex", "age", "sibsp", "fare"];

async function makePrediction() {
    const data = {
        pclass: document.getElementById("pclass").value,
        sex: document.getElementById("sex").value,
        age: document.getElementById("age").value,
        sibsp: document.getElementById("sibsp").value,
        fare: document.getElementById("fare").value,
    };

    try {
        const response = await fetch("http://localhost:3000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const result = await response.json();
        const resultEl = document.getElementById("prediction-result");
        const survived = result.result.survived;

        resultEl.textContent = "Prediction: " + (survived === 1 ? "Survived" : "Did not survive");
        resultEl.style.display = "block";
        resultEl.classList.remove("hidden");
    } catch (error) {
        const resultEl = document.getElementById("prediction-result");
        resultEl.textContent = "Error getting prediction. Check server.";
        resultEl.style.display = "block";
        resultEl.classList.remove("hidden");
    }
}

// Add event listeners to all input fields
inputIds.forEach(id => {
    document.getElementById(id).addEventListener("input", makePrediction);
});