// // Initialize EmailJS with your public key
// (function(){
//    emailjs.init("zn15FicNMiQLVaUNk"); // replace with your EmailJS public key
// })();

// // Form submit handler
// document.getElementById("contact-form").addEventListener("submit", function(e) {
//    e.preventDefault();

//    let emailField = this.querySelector('input[name="user_email"]');
//    let emailError = document.getElementById("email-error");
//    let email = emailField.value.trim();

//    // Email validation
//    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//    if (!emailPattern.test(email)) {
//       emailError.textContent = "Please enter a valid email address.";
//       emailField.classList.add("error-border");
//       emailField.focus();
//       return; // stop submission
//    } else {
//       emailError.textContent = "";
//       emailField.classList.remove("error-border");
//    }

//    // 1️⃣ Send email to Admin
//    emailjs.sendForm("service_kr5r8kd", "template_hhihtqz", this)
//    .then(function(response) {
//        console.log("Admin email sent!", response.status, response.text);

//        // 2️⃣ Send confirmation to User
//        emailjs.sendForm("service_kr5r8kd", "template_3pna2ag", e.target)
//        .then(function(res) {
//            alert("✅ Message sent successfully! Confirmation email sent to you.");
//            console.log("User email sent!", res.status, res.text);
//            document.getElementById("contact-form").reset(); // Optional: reset form
//        }, function(err) {
//            console.error("Failed to send user email", err);
//        });

//    }, function(error) {
//        alert("❌ Failed to send message. Please try again.");
//        console.error("FAILED...", error);
//    });
// });






document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let emailField = this.querySelector('input[name="user_email"]');
    let emailError = document.getElementById("email-error");
    let email = emailField.value.trim();

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailField.classList.add("error-border");
        emailField.focus();
        return;
    } else {
        emailError.textContent = "";
        emailField.classList.remove("error-border");
    }

    const form = this; // save reference to form
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true; // disable button to prevent multiple clicks

    // Send both emails
    Promise.all([
        emailjs.sendForm("service_kr5r8kd", "template_hhihtqz", form), // admin
        emailjs.sendForm("service_kr5r8kd", "template_3pna2ag", form)  // user
    ])
    .then(function(results) {
        alert("✅ Message sent successfully! Confirmation email sent to you.");
        form.reset(); 
        submitBtn.disabled = false;
    })
    .catch(function(err) {
        alert("Sent.");
        console.error("EmailJS error:", err);
         form.reset(); 
        submitBtn.disabled = false;
    });
});
