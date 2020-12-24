const skillDetails = document.querySelector('#skills-details');

const canvasRevealBtn = document.querySelector('#reveal-canvas').addEventListener('click', () => {
  skillDetails.classList.toggle('hide');
  skillDetails.scrollIntoView();
});

