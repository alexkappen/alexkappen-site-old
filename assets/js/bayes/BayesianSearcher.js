// Courtesy of Ry- from stackoverflow: 
// https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array/11301464
function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}


// Bayesian Searcher
// Alex Kappen
// Based on material from Psych 4KK3: Bayesian Inference at McMaster University

class BayesianSearcher {
  constructor(priors, easeOfDetection) {
    this.priors = priors;
    this.easeOfDetection = easeOfDetection;
    this.start = this.startingSquare(this.priors, this.easeOfDetection);
    this.searchHistoryArray = [locations[this.start]];
    this.idx = this.start
  }

  searchSequence() {
    return this.searchHistoryArray;
  }

  drawUtilityGrid(rows, columns) {
    const cellWidth = width / (columns);
    const cellHeight = height / (rows);

    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * cellWidth;
        const y = r * cellHeight;

        let index = r * columns + c;

        if (index === this.idx) {
          fill(120);
          rect(x, y, cellWidth, cellHeight);
          fill(255);
        } else {
          fill(220);
          rect(x, y, cellWidth, cellHeight);
          fill(0);
        }

        text(`${locations[index]}`, x, y - cellHeight / 4, cellWidth, cellHeight);
        text("EU=" + round(this.priors[index] * this.easeOfDetection[index], 4), x, y, cellWidth, cellHeight);
        textSize(10);
        text(`P(${locations[index]} | D) = ${round(this.priors[index], 4)}`, x, y + cellHeight / 4, cellWidth, cellHeight);
        textSize(16);
      }
    }
  }

  search() {
    let likelihoods;
    let posteriors;
    let utilities;

    likelihoods = this.calcLikelihoods(this.idx, this.priors, this.easeOfDetection)
    posteriors = this.calcPosteriors(this.priors, likelihoods);
    utilities = this.calcUtility(this.easeOfDetection, posteriors);

    // Update idx of square with max utility
    this.idx = indexOfMax(utilities);
    // Record searched square
    this.searchHistoryArray.push(locations[this.idx]);
    // Update priors
    this.priors = posteriors;

    return this.searchHistoryArray;
  }

  startingSquare() {
    let max = this.priors[0] * this.easeOfDetection[0];
    let maxIndex = 0;
    for (let i = 0; i < this.priors.length; i++) {
      if (this.priors[i] * this.easeOfDetection[i] > max) {
        maxIndex = i;
        max = this.priors[i] * this.easeOfDetection[i];
      }
    }
    return maxIndex
  }

  calcLikelihoods(idx, priors, easeOfDetection) {
    let likelihoodArray = [];

    // Likelihood is 1 for unchecked squares, and ease of detection otherwise
    for (let i = 0; i < priors.length; i++) {
      if (i === idx) {
        likelihoodArray.push((1 - easeOfDetection[idx]));
      } else {
        likelihoodArray.push(1);
      }
    }

    return likelihoodArray;
  }

  calcPosteriors(priors, likelihoods) {
    // Calculate bayes denominator
    let bayesDenom = 0;
    for (let i = 0; i < priors.length; i++) {
      bayesDenom += priors[i] * likelihoods[i];
    }

    // Calculate posteriors
    let posteriorsArray = [];
    for (let j = 0; j < priors.length; j++) {
      posteriorsArray.push((priors[j] * likelihoods[j]) / bayesDenom);
    }

    return posteriorsArray;
  }

  calcUtility(easeOfDetection, posteriors) {
    let utilityArray = [];

    for (let i = 0; i < posteriors.length; i++) {
      utilityArray.push(easeOfDetection[i] * posteriors[i])
    }

    return utilityArray;
  }
}