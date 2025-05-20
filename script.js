document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const newsText = document.getElementById("newsText").value;

    if (!newsText.trim()) {
      resultDiv.textContent = "Please enter some news text.";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: newsText })
      });

      const data = await response.json();

      if (data.label) {
        resultDiv.textContent = `Prediction: ${data.label.toUpperCase()}`;
        resultDiv.style.color = data.label === "fake" ? "red" : "green";
      } else {
        resultDiv.textContent = "Could not determine if it's fake or real.";
      }
    } catch (error) {
      console.error("Error:", error);
      resultDiv.textContent = "Error contacting the prediction service.";
    }
  });
});
