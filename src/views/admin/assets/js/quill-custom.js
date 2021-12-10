// let placeholder = document
//   .querySelector("[data-quill-placeholder]")
//   .getAttribute("data-quill-placeholder");

// // Init editor
// let quillTest = new Quill("#quill-test", {
//   placeholder: placeholder,
//   theme: "snow",
// });
// // $this.get(
// //   0
// // ).innerHTML = `<input id="quill-test" value="" name="quill-data" style="display: none;"/>`;

// quillTest.setContents([
//   { insert: "Hello " },
//   { insert: "World!", attributes: { bold: true } },
//   { insert: "\n" },
// ]);

// quillTest.on("text-change", function (delta, oldDelta, source) {
//   let dataQuill = quill.getContents();
//   document.getElementById("quill-test").value = JSON.stringify(dataQuill);
//   console.log(document.getElementById("quill-test").value);

//   // if (source == "api") {
//   //   console.log("An API call triggered this change.");
//   // } else if (source == "user") {
//   //   console.log("A user action triggered this change.");
//   // }
// });
