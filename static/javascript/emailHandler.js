(function () {
  // Initialize EmailJS with your public key
  emailjs.init("wtR6jNBHrjmaBAUgs");

  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();

    const form = event.target;

    // Display a loading message or disable the submit button
    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Send the email using EmailJS
    emailjs
      .sendForm("service_mwkz7ct", "template_axod17s", form)
      .then(
        () => {
          console.log("SUCCESS!");
          submitButton.textContent = "Success"; // Update the button text to "Success"
          submitButton.classList.add("success"); // Optional: Add a success class for styling
        },
        (error) => {
          console.error("FAILED...", error);
          submitButton.textContent = "Failed. Try Again"; // Update the button text on failure
          submitButton.classList.add("failure"); // Optional: Add a failure class for styling
        }
      )
      .finally(() => {
        // Re-enable the submit button after a short delay (if needed)
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message"; // Reset the button text for the next submission
          submitButton.classList.remove("success", "failure"); // Remove any added classes
          form.reset(); // Reset the form fields
        }, 3000); // Adjust the delay as needed (in milliseconds)
      });
  }

  // Attach the event listener when the window loads
  window.onload = function () {
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", handleFormSubmission);
    }
  };
})();
