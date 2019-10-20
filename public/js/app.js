const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value.toLowerCase();
  search.value = "";

  if (location === "nw9 6rx" || location === "nw96rx") {
    messageOne.textContent = "Home of a queen...";
  } else {
    messageOne.textContent = "Fetching...";
  }
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(res => {
    res.json().then(data => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
});
