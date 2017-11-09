import * as getType from 'jest-get-type'


declare global {
  namespace jest {
    interface Matchers<R> {
      toThrowWithCallback(callback: Function): R;
    }
  }
}

function toThrowWithCallback (this: jest.MatcherUtils, received: Function, callback: (err: any) => jasmine.CustomMatcherResult) {
  let error
  if (typeof received !== 'function') {
    throw new Error(
      this.utils.matcherHint('toThrowWithCallback',
      'function',
      getType(received) + 
      '\n\n' + 
      'Received value must be a function, but instead ' +
      `"${getType(received)}" was found`)
    )
  }

  try {
    received()
  } catch (e) {
    error = e
  }

  if (!error) {
    return {
      pass: false,
      message: () => this.utils.matcherHint('toThrowWithCallback', 'function', 'type') +
        '\n\n' +
        'Expected the function to throw an error but it did not throw anything'
    }
  } else {
    callback(error)
    return {
      pass: true,
      message: () => ''
    }
  }
}

expect.extend({
  toThrowWithCallback
})

// // Custom matchers
// expect.extend({
//   toThrowWithCallback(received: Function, callback: (err: any) => {}) {
//     if (typeof received !== 'function') {
//       throw new Error(
//         matcherHint('toThrowWithCallback',
//         'function',
//         getType(received) + 
//         '\n\n' + 
//         'Received value must be a function, but instead ' +
//         `"${getType(received)}" was found`)
//       )
//     }
//     return {
//       message: () => (`Todo implement`),
//       pass: false,
//     }
//   }
// })
