export async function atypical(node, speed = 1, style='noise') {
  const originalText = node.textContent
  const charGenerator = randomChar(alphabets[style])

  for (let frame of generateFrames(originalText, charGenerator)) {
    requestAnimationFrame(() => node.textContent = frame);
    await wait(speed + speed * (Math.random() - 0.5));
  }
}

async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

export function* generateFrames(originalText, charGenerator, stepGap = 7) {
  let current = randomWord(originalText.length, charGenerator)

  for (let i = 0; i < stepGap*originalText.length; i++) {
    if(current === originalText) break;

    let diffIndex = getRandomDiffIndex(originalText, current)
    let character = (i % stepGap === 0) ? originalText[diffIndex] : charGenerator.next().value 
    yield current = mutate(current, character, diffIndex)
  }
}

function mutate(current, character, index) {
  return current.substring(0, index) + character + current.substring(index + 1);
}

function randomWord(length, charGenerator) {
   return Array.from({length: length}, (_, i) => charGenerator.next().value).join('')
}

const alphabets = {
  noise: "@!#$%^&*();£+",
  flips: " ▮▮▮",
  creepy: "q̶͙͍͇͍͇͈̼͓̇̏w̸̧̹̦̫̙̺͉̥͋̉ͅĕ̷̙͖͈̔̂̈́͑̚ͅr̵̢̳̰͚̻̰͑͛̃̑͗͋̚͜͝͠ţ̵̡̛͕̼̮̜̜̙̣͙̠͉̙̈́̆̾̈́̄̽͛̅̐̌̔͗ͅͅy̵̢̖̦̹͔͇̐͒̈́͋͘̕͝u̴͈͓̞̲̠̳̯͓̭̗͓̒̈́̍̕͠ì̸͎̻͎̭͓͎̲͖̈́͐̅͐̐̾̀̆͐̂̊̊̕͜ǒ̸̥͔̘̰͉̙̘̖̥̗̰̲͔̃̑͐͗̈͒̈́̔͘͜p̷̡̞̙̼̠̦̆̅̚l̷̡̧̫̗͕̥̱͍̜͓̀͆̀̀͛̆̐̽̈́͜͜k̵̭͚͝j̵̧̨̻̟̲̰̜̥̺̓͊̐̅̑̽̏́̍͜ͅh̸̦̹̻͖͒ͅğ̴̣͚͉͔́͊̍̈́̓͐͊̀̚͠f̴̨̧̧̹̦̟̰̤̖̞͈̰͓̣̺͐̚͘ḍ̷̡͍̩̭̼̭̺̤͙̥̜̱͇͑̎͐̄̋̒̽̏̉́̎̋͗͘ͅs̴̢̛̩͌̈́̀́̒͛a̸͎̻̞̹̙̎̎m̷̨͔̺̹͔͎̳̦̖̰̘͚͑́͌͂͠͝n̶̡̧͚̮̪̼̦̤̭̖̣̪̮̺̥̈̐͑̂̔̈́̍̐̍̎͠b̴͙̱̣͖͈͔̲͙̜͈̀́̌̈́v̷͉̰̙̼̱͓͖̰̭͕̹̻̮̿͜ç̷͓̳͓̘̿̅̆̅͌̆̆͘ͅx̶̛̺̪͒̀͋̄̿̈́̌̿̓ͅz̷͕͙̪̯͌̔̅͠"
}

export function* randomChar(alphabet) {
  for(;;) { yield alphabet[Math.floor(Math.random() * alphabet.length)] }
}

function getRandomDiffIndex(w1, w2) {
  const wa2 = w2.split("")
  const differences = w1.split("").map((c, i) => Math.abs(c.charCodeAt() - wa2[i].charCodeAt()))
  const max = Math.max(...differences)
  return differences.indexOf(max)
}


