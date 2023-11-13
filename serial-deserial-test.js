function encodeNumber(num) {
  if (num <= 128) {
    return String.fromCharCode(num);
  }
  const firstChar = String.fromCharCode(Math.floor((num - 129) / 128) + 129);
  const secondChar = String.fromCharCode((num - 129) % 128);
  return firstChar + secondChar;
}

function decodeNumber(str, index) {
  const firstCharCode = str.charCodeAt(index);
  if (firstCharCode <= 128) {
    return [firstCharCode, 1];
  }
  const secondCharCode = str.charCodeAt(index + 1);
  return [(firstCharCode - 129) * 128 + secondCharCode + 129, 2];
}

function serialize(numbers) {
  return numbers.map(encodeNumber).join("");
}

function deserialize(str) {
  const numbers = [];
  for (let i = 0; i < str.length; ) {
    const [num, length] = decodeNumber(str, i);
    numbers.push(num);
    i += length;
  }
  return numbers;
}

// Tests
function testCompression(dataSet) {
  const originalString = JSON.stringify(dataSet);
  const compressedString = serialize(dataSet);
  const decompressedData = deserialize(compressedString);
  const compressionRatio = compressedString.length / originalString.length;

  console.log(`Original: ${originalString}`);
  console.log(`Compressed: ${compressedString}`);
  console.log(`Decompressed: ${JSON.stringify(decompressedData)}`);
  console.log(`Compression Ratio: ${compressionRatio}`);
}

let dataSets = [
  Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 300 }, (_, i) => i + 1).flatMap((n) => [n, n, n]),
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  Array.from({ length: 90 }, (_, i) => i + 10),
  Array.from({ length: 900 }, (_, i) => i + 100),
];

dataSets.forEach(testCompression);
