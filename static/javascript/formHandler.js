document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const submitButton =
      form.querySelector('button[type="submit"]') ||
      form.querySelector('input[type="submit"]');
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    // Disable submit button and show loading state if it exists
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent =
        submitButton.tagName === "INPUT" ? "Sending..." : "Sending...";
    }

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
        // Re-enable submit button and restore text if it exists
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent =
            submitButton.tagName === "INPUT" ? "Submit" : "Submit";
        }
      });
  });

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}
