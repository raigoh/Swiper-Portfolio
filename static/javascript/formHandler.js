document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      alert("Please fill in all fields.");
      return;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    fetch("/.netlify/functions/send-email", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        showNotification("Email sent successfully!", "success");
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        showNotification(
          "Error sending email. Please try again later.",
          "error"
        );
      })
      .finally(() => {
        // Re-enable submit button and restore text
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      });
  });

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}
