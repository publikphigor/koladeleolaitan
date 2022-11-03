window.onload = function () {
  const root = document.documentElement;
  const contactForm = document.querySelector("#contactform");
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const errMsg = document.querySelector(".error-msg");

  function clearForm() {
    contactForm.querySelector("#name").value = "";
    contactForm.querySelector("#email").value = "";
    contactForm.querySelector("#message").value = "";
  }

  contactForm.addEventListener("submit", completeSubmission);

  async function completeSubmission(e) {
    e.preventDefault();

    const inputName = document.querySelector("#name").value.trim();
    const inputEmail = document.querySelector("#email").value.trim();
    const inputMessage = document.querySelector("#message").value.trim();

    // Form validation
    if (
      emailRegex.test(inputEmail) &&
      inputName !== "" &&
      inputMessage !== ""
    ) {
      errMsg.classList.add("active");
      errMsg.classList.remove("error");
      errMsg.textContent = "Sending message...";

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

      billResponse.text().then((data) => {
        if (!data === "Sent") return;
        errMsg.textContent = "Your message has been sent successfully!";
        clearForm();
      });
    } else if (!emailRegex.test(inputEmail)) {
      errMsg.classList.add("active", "error");
      errMsg.textContent =
        "Enter a valid email address and fill in the appropriate fields.";
    }
  }
};
