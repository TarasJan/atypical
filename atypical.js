export async function atypical(node, speed = 1) {
  const originalText = node.textContent

  for (let frame of generateFrames(originalText)) {
    requestAnimationFrame(() => node.textContent = frame);
    await wait(speed + speed * (Math.random() - 0.5));
  }
}

async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

export function* generateFrames(originalText) {
  let current = randomWord(originalText.length)

  for (let i = 0; i < 8*originalText.length; i++) {
    if(current === originalText) break;

    let diffIndex = getRandomDiffIndex(originalText, current)
    let character = (i % 7 === 0) ? originalText[diffIndex] : randomChar().next().value 
    yield current = mutate(current, character, diffIndex)
  }
}

function mutate(current, character, index) {
  return current.substring(0, index) + character + current.substring(index + 1);
}

function randomWord(length) {
   return Array.from({length: length}, (_, i) => randomChar().next().value).join('')
}

export function* randomChar() {
  const alphabet = "@!#$%^&*();£+"

  yield alphabet[Math.floor(Math.random() * alphabet.length)]
}

function getRandomDiffIndex(w1, w2) {
  const wa2 = w2.split("")
  const differences = w1.split("").map((c, i) => Math.abs(c.charCodeAt() - wa2[i].charCodeAt()))
  const max = Math.max(...differences)
  return differences.indexOf(max)
}

// atypical(document.getElementById("target"), 7)


