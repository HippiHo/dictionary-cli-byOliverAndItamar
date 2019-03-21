const { logAndBreak } = require("./helper");
const DictionaryClient = require("./DictionaryClient");

const dictionaryLookup = async word => {
  const data = await DictionaryClient.getEntries(word);
  const providerString = `Provided by ${data.metadata.provider}`;
  console.log("result", data.results);

  const resultsString = data.results.map(formatResult).join("\n\n");

  return resultsString + "\n\n" + providerString;
};

const formatResult = result => {
  return result.lexicalEntries.map(formatEntry).join("\n\n");
};

const formatEntry = entry => {
  const entryTitle = `${entry.text} (${entry.lexicalCategory})`;

  let senses = flattenSenses(entry.entries)
    .map(formatSense)
    .join("\n");

  console.log("bla", senses);

  return entryTitle + "\n" + senses;
};

// Takes in an entries array
const flattenSenses = entries => {
  const reducer = (flatSenses, entry) => {
    console.log("flatsenses", flatSenses[0]);
    return flatSenses.concat(entry.senses);
  };
  // Return an array that contains the combined senses from all passed entries
  return entries.reduce(reducer, []);
};

// Takes in a sense object
const formatSense = (sense, i) => {
  // Return a string with an index number and either the short_desctiption or the crossRefernceMarkers property joined by a comma
  const descriptions = sense.short_definitions || sense.crossReferenceMarkers;

  return `${i + 1}. ` + descriptions.join(", ");
};

module.exports = {
  dictionaryLookup
};
