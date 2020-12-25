const skillDetails = document.querySelector('#skills-details');

let toggle = 1;

const canvasRevealBtn = document.querySelector('#reveal-canvas').addEventListener('click', () => {
  console.log(toggle);
  toggle *= -1;
  if (toggle === 1) {
    skillDetails.style.backgroundColor = '#0b45c2';
  } else if (toggle === -1) {
    skillDetails.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  }
  skillDetails.scrollIntoView();
});

