const camelizeWords = (phrase) => {
  if (!phrase) return '';

  let camelizedWordList = [];

  phrase.split(' ').forEach((word, index) => {
    let modifiedWord = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    if (index && modifiedWord) modifiedWord = modifiedWord[0].toUpperCase().concat(modifiedWord.slice(1));
    camelizedWordList = [...camelizedWordList, modifiedWord];
  });

  return camelizedWordList.join('');
}

// This calculates for 50 mL/second, then turns it to milliseconds
const pourTime = (mL) => (mL / 50) * 1000;

const CommonUtils = Object.freeze({
  camelizeWords,
  pourTime
});



export default CommonUtils;