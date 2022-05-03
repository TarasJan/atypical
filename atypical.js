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

  for (let i= 0; i < 100000; i++) {
    if(current === originalText) break;
    if (i % 7 === 0) {
      const randomIndex = Math.floor(Math.random() * originalText.length);
      yield current = current.substring(0, randomIndex) + originalText[randomIndex] + current.substring(randomIndex + 1);
    } else {
      yield current = mutate(originalText, current)
    }
  }
}

function mutate(original, current) {
  let randomIndex = Math.floor(Math.random() * original.length)

  if (original[randomIndex] !== current[randomIndex]) {
    current = current.substring(0, randomIndex) + randomChar().next().value + current.substring(randomIndex + 1);
  }

  return current
}

function randomWord(length) {
   return Array.from({length: length}, (_, i) => randomChar().next().value).join('')
}

export function* randomChar() {
  const alphabet = "@!#$%^&*();£+"

  yield alphabet[Math.floor(Math.random() * alphabet.length)]
}

// atypical(document.getElementById("target"), 7)


