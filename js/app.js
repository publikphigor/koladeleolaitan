window.onload = function () {
  const contactForm = document.querySelector("#contactform");

  contactForm.addEventListener("submit", completeSubmission);

  async function completeSubmission(e) {
    e.preventDefault();
    const inputName = document.querySelector("#name").value;
    const inputEmail = document.querySelector("#email").value;
    const inputMessage = document.querySelector("#message").value;

    function clearForm() {
      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#message").value = "";
    }

    const sendDetails = `<h2> New Email From ${inputName}, ${inputEmail} </h2> <br> <p> Message : ${inputMessage} </p>`;
    const sendData = {
      siteName: "Koladele Olaitan",
      siteSend: sendDetails,
    };

    const billResponse = await fetch(
      "https://koladele.vickyabiodun.com/MailServer/mail_key.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      }
    );

    billResponse
      .text()
      .then((data) => data === "Sent" && alert("Your message has been sent!"));
    clearForm();
  }
};
