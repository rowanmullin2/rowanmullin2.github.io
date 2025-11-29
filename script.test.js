document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("donation-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    // Collect form values
    const charity = document.getElementById("charity").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const comment = document.getElementById("comment").value.trim();
