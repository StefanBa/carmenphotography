let t0 = performance.now();
let submitBtn = document.querySelector(".submit");
let vorname = document.getElementById("vorname");
let nachname = document.getElementById("nachname");
let email = document.getElementById("email");
let querytype = document.getElementById("querytype");

submitBtn.addEventListener("click", submitForm, false);
function submitForm() {
  // seit dem Laden der Seite muss min 10s vergangen sein
  let selected_query = querytype.options[querytype.selectedIndex].value;
  if (selected_query == "" || performance.now() - t0 < 10000) {
    alert("Bitte die Art der Anfrage definieren");
  } else if (confirm("Bist du sicher, dass du die Anfrage senden möchtest?")) {
    document.getElementById("myform").submit();
  }
}

surname.addEventListener("keyup", function (e) {
  if (e.which == 13) this.blur();
});
lastname.addEventListener("keyup", function (e) {
  if (e.which == 13) this.blur();
});

email.addEventListener("keyup", function (e) {
  if (e.which == 13) this.blur();
});
