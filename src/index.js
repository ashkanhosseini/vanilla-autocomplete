import "./styles.css";
import debounce from "./debounce";

const showDropdown = debounce(async (input, list) => {
  console.log("deboundced");
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  ).then((j) => j.json());

  const filteredTodos = data
    .filter(({ title }) => title.includes(input.value))
    .map(({ title, id }) => {
      return `<li tabindex="0" data-todo-id="${id}">${title}</li>`;
    })
    .join("");
  console.log("fetched");
  console.log({ list, filteredTodos });
  list.innerHtml = filteredTodos;
}, 1000);

window.document.addEventListener("keydown", (event) => {
  if (
    !event.target.classList.contains("ac-input__input") ||
    !event.target.value
  ) {
    console.log("yuouo", event.target.classList.contains("ac-input__input"));
    return;
  }
  // const listEl = event.target.parentElement.
  event.target.nextElementSibling.innerHtml = "<div>ads</div>";
  return;
  console.log("before deboundce");

  showDropdown(event.target, event.target.nextElementSibling);
});
