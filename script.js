const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylNh5jqtftvhEiuavrtEByII3QllSB8FHH7VsQExqrJ_6P4GaTXejGM7yZqDeYhmpvhg/exec";

// Form Handling
const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusMsg.innerText = "Sending Proposal Request...";
    statusMsg.style.color = "#ccd6f6";

    // Convert Form Data to URLSearchParams (Better for Google Apps Script)
    const formData = new FormData(contactForm);
    const data = new URLSearchParams();
    for (const pair of formData) {
        data.append(pair[0], pair[1]);
    }

    console.log("🚀 Debug - Sending Data String:", data.toString()); // Check if this is empty!

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        });

        // With no-cors, we get an opaque response (status 0), so we can't check response.ok.
        // We assume success if the network call didn't fail.

        statusMsg.innerText = "Request sent successfully! We will contact you soon.";
        statusMsg.style.color = "#64ffda";
        contactForm.reset();

    } catch (e) {
        console.error("Error sending document: ", e);
        statusMsg.innerText = "Error sending message. Please try again or email us directly.";
        statusMsg.style.color = "#ff6b6b";
    }
});
