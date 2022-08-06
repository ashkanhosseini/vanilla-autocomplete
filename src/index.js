import './styles.css';
import debounce from './debounce';

const showDropdown = debounce(async (input, list) => {
  list.innerHTML = '...loading';
  const data = await fetch('https://jsonplaceholder.typicode.com/todos').then(
    (j) => j.json()
  );

  const filteredTodos = data
    .filter(({ title }) => title.includes(input.value))
    .map(({ title, id }) => {
      return `<li tabindex="0" class="ac-input__item" data-todo-id="${id}">${title}</li>`;
    });

  list.innerHTML = filteredTodos.length
    ? filteredTodos.join('')
    : '<li>No result. Try again</li>';
}, 100);

const isMyInput = (el) => {
  return el.classList.contains('ac-input__input');
};

const handleClick = (event) => {
  const item = event.target;
  console.log('clicked');
  if (!item.classList.contains('ac-input__item')) {
    return;
  }
  const list = item.parentElement;
  list.previousElementSibling.value = item.innerText;
};

document.body.onclick = handleClick;
document.onkeydown = (event) => {
  if (event.key == 'Enter' || event.key == ' ') {
    handleClick(event);
  }
};

document.body.addEventListener('focusin', (event) => {
  if (isMyInput(event.target)) {
    return event.target.nextElementSibling.classList.add('show');
  }
  if (document.activeElement?.classList.contains('ac-input__item')) {
    return;
  }

  console.log({ act: document.activeElement });
  const dropDowns = document.querySelectorAll('.ac-input__dropdown');
  console.log({ dropDowns });
  dropDowns.forEach((el) => el.classList.remove('show'));
});

// document.body.addEventListener('focusout', (event) => {
//   console.log({
//     aci: document.activeElement,
//     isMy: document.activeElement?.classList.contains('ac-input__item'),
//   });
//   if (
//     !isMyInput(event.target) ||
//     document.activeElement?.classList.contains('ac-input__item')
//   ) {
//     return;
//   }
//   // setTimeout(() => {
//   //   event.target.nextElementSibling.classList.remove('show');
//   // }, 100);
// });

window.document.addEventListener('input', (event) => {
  if (!isMyInput(event.target) || !event.target.value) {
    return;
  }
  showDropdown(event.target, event.target.nextElementSibling);
});
