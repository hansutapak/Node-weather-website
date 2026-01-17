const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("Testing");
  const full_address = search.value;

  messageOne.textContent = "Loading...";

  messageTwo.textContent = "";

  fetch("/weather?address=" + full_address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.geoMessage;
        messageTwo.textContent = data.subMessage;
      }
    });
  });
});
