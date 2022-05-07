import test from 'tape';

import {
  generateFrames
} from '../atypical.js'

test('generateFrames', t => {
  const mockGenerator  = (function* () { for(;;) {yield "x"} })() 
  console.log(typeof(mockGenerator))
  t.deepEqual([...generateFrames('dog', mockGenerator)].at(-1), 'dog', "Sequence should end in the original word")

  t.end()
}) 
