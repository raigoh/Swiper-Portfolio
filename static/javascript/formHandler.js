document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

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
        alert("Email sent successfully!");
        document.getElementById("contact-form").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error sending email. Please try again later.");
      });
  });
