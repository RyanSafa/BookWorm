const createUrl = (form) => {
  const formData = new FormData(form);
  const search = new URLSearchParams(formData);
  const queryString = search.toString(search);
  return (url = `${form.action}?${queryString}'`);
};
document.body.addEventListener("submit", async (e) => {
  e.preventDefault();
  const myForm = e.target;
  const url = createUrl(myForm);
  const response = await fetch(url, {
    method: myForm.method,
    mode: "cors",
    cache: "no-cache",
    creditenials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const bookArray = await response.json();
  console.log(bookArray);
});
