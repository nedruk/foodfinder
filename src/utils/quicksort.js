const pivot = (arr, start, end) => {
  const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];

  let pivot = arr[start],
    pointer = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      pointer++;
      swap(arr, pointer, i);
    }
  }
  swap(arr, start, pointer);

  return pointer;
}

function quickSortHelper(arr, start, end) {
  let pivotIndex = pivot(arr, start, end);

  if (start >= end) return arr;
  quickSortHelper(arr, start, pivotIndex);
  quickSortHelper(arr, pivotIndex + 1, end - 1);
}


const quickSort = (arr) => {
  quickSortHelper(arr, 0, arr.length)

  return arr;
};

module.exports.quicksort = quickSort; 