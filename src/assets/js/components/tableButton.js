const upBtn = document.querySelector('.block__table--button-up');
const downBtn = document.querySelector('.block__table--button-down');
const tableUp = document.querySelector('.block__table--top');
let height = 0;
let heightMax = -60;
let heightMin = 100;


upBtn.addEventListener('mousedown', () => {
  const screenWidth = window.screen.width
  if (screenWidth < 860) {
    heightMax = -20;
  }
  if (!downBtn.querySelector('#disable')) {
    downBtn.removeAttribute('id');
  }
  if (height === heightMax) {
    upBtn.id = 'disable';
    return;
  }
  height -= 20;
  tableUp.style.top = height + 'px';
  console.log(height);
})

downBtn.addEventListener('mousedown', () => {
  const screenWidth = window.screen.width
  if (screenWidth < 860) {
    heightMin = 40;
  } 
  if (!upBtn.querySelector('#disable')) {
    upBtn.removeAttribute('id');
  }
  if (height === heightMin) {
    downBtn.id = 'disable';
    return;
  }
  height += 20;
  tableUp.style.top = height + 'px';
})