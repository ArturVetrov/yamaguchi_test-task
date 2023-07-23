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
let levitation = () => {
  const tlLevitation = gsap.timeline({ defaults: { duration: .7 }, repeat: -1, repetDelay: 0});
  tlLevitation.to(".block__voice--control--people", { x: -3});
  tlLevitation.to(".block__voice--control--people", { x: 3});
  tlLevitation.to(".block__voice--control--people", { x: 0});
  return tlLevitation;
}

const tl = gsap.timeline({ defaults: { duration: 3 }});
tl.to(".block__voice--control--hole", { scale: 1.5 });
tl.to(".block__voice--control--people", { y: -780, duration: 8});
tl.add(levitation);
tl.to(".block__voice--control--hole", { scale: 1.1 });