function encodeNumber(num) {
  if (num <= 128) {
    return String.fromCharCode(num);
  }
  let firstChar = String.fromCharCode(Math.floor((num - 129) / 128) + 129);
  let secondChar = String.fromCharCode((num - 129) % 128);
  return firstChar + secondChar;
}

function decodeNumber(str, index) {
  let firstCharCode = str.charCodeAt(index);
  if (firstCharCode <= 128) {
    return [firstCharCode, 1];
  }
  let secondCharCode = str.charCodeAt(index + 1);
  return [(firstCharCode - 129) * 128 + secondCharCode + 129, 2];
}

function serialize(numbers) {
  return numbers.map(encodeNumber).join("");
}

function deserialize(str) {
  let numbers = [];
  for (let i = 0; i < str.length; ) {
    let [num, length] = decodeNumber(str, i);
    numbers.push(num);
    i += length;
  }
  return numbers;
}

// Tests
function testCompression(dataSet) {
  let originalString = JSON.stringify(dataSet);
  let compressedString = serialize(dataSet);
  let decompressedData = deserialize(compressedString);
  let compressionRatio = compressedString.length / originalString.length;

  console.log(`Original: ${originalString}`);
  console.log(`Compressed: ${compressedString}`);
  console.log(`Decompressed: ${JSON.stringify(decompressedData)}`);
  console.log(`Compression Ratio: ${compressionRatio}`);
}

let dataSets = [
  [1, 2, 3],
  Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 300 }, (_, i) => i + 1).flatMap((n) => [n, n, n]),
];

dataSets.forEach(testCompression);
