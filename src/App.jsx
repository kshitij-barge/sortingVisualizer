import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { bubbleSort } from './algorithms/BubbleSort';
import { selectionSort } from './algorithms/SelectionSort';
import { mergeSort } from './algorithms/MergeSort';
import { quickSort } from './algorithms/QuickSort';
import { insertionSort } from './algorithms/InsertionSort';

const algorithmDetails = {
  bubble: {
    name: "Bubble Sort",
    timeComplexity: "$O(n^2)$",
    spaceComplexity: "$O(1)$",
    explanation:
      "Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed.",
    pseudocode: `
      for i from 0 to n-1:
        for j from 0 to n-i-1:
          if arr[j] > arr[j+1]:
            swap arr[j] and arr[j+1]
    `,
  },
  selection: {
    name: "Selection Sort",
    timeComplexity: "$O(n^2)$",
    spaceComplexity: "$O(1)$",
    explanation:
      "Selection Sort repeatedly selects the smallest element from the unsorted portion of the array and places it at the beginning.",
    pseudocode: `
      for i from 0 to n-1:
        minIndex = i
        for j from i+1 to n:
          if arr[j] < arr[minIndex]:
            minIndex = j
        swap arr[i] and arr[minIndex]
    `,
  },
  merge: {
    name: "Merge Sort",
    timeComplexity: "$O(n log n)$",
    spaceComplexity: "$O(n)$",
    explanation:
      "Merge Sort is a divide-and-conquer algorithm. It divides the array into halves, recursively sorts them, and then merges the sorted halves.",
    pseudocode: `
      mergeSort(arr):
        if size of arr > 1:
          mid = size / 2
          left = arr[0:mid]
          right = arr[mid:size]
          mergeSort(left)
          mergeSort(right)
          merge left and right into arr
    `,
  },
  quick: {
    name: "Quick Sort",
    timeComplexity: "$O(n log n)$",
    spaceComplexity: "$O(log n)$",
    explanation:
      "Quick Sort selects a pivot and partitions the array into elements less than the pivot and elements greater than the pivot. It then recursively sorts the partitions.",
    pseudocode: `
      quickSort(arr, low, high):
        if low < high:
          pi = partition(arr, low, high)
          quickSort(arr, low, pi-1)
          quickSort(arr, pi+1, high)
    `,
  },
  insertion: {
    name: "Insertion Sort",
    timeComplexity: "$O(n^2)$",
    spaceComplexity: "$O(1)$",
    explanation:
      "Insertion Sort builds the final sorted array one item at a time. It iterates through the input array and removes one element, finds the location it belongs within the sorted part of the array, and inserts it there.",
    pseudocode: `
      for i from 1 to n-1:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
          arr[j+1] = arr[j]
          j = j - 1
        arr[j+1] = key
    `,
  },
};

const App = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [delayTime, setDelayTime] = useState(100);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");

  const generateNewArray = (size) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 500) + 10);
    }
    return arr;
  };

  const handleSort = async () => {
    if (sorting) return;
    setSorting(true);
    let sortedArray;

    const currentArray = document.getElementsByClassName("array-bar");
    for (const bar of currentArray) {
        bar.style.backgroundColor = "blue";
    }

    if (algorithm === "bubble") {
      sortedArray = await bubbleSort(array, delayTime);
    } else if (algorithm === "selection") {
      sortedArray = await selectionSort(array, delayTime);
    } else if (algorithm === "merge") {
      sortedArray = await mergeSort(array, delayTime);
    } else if (algorithm === "quick") {
      sortedArray = await quickSort(array, delayTime);
    } else if (algorithm === "insertion") {
      sortedArray = await insertionSort(array, delayTime);
    }

    setArray(sortedArray);
    setSorting(false);
  };

  useEffect(() => {
    setArray(generateNewArray(size));
  }, [size]);

  const { name, timeComplexity, spaceComplexity, explanation, pseudocode } =
    algorithmDetails[algorithm];

  return (
    <div className="App">
      <div className="controls">
        <button onClick={() => setArray(generateNewArray(size))}>
          Generate New Array
        </button>
        <select
          onChange={(e) => setAlgorithm(e.target.value)}
          value={algorithm}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="insertion">Insertion Sort</option>
        </select>
        <input
          type="range"
          min="5"
          max="100"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
        <span>Array Size: {size}</span>
        <input
          type="range"
          min="10"
          max="200"
          value={delayTime}
          onChange={(e) => setDelayTime(Number(e.target.value))}
        />
        <span>Delay: {delayTime}ms</span>
        <button onClick={handleSort} disabled={sorting}>
          Sort
        </button>
      </div>
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className="array-bar"
            style={{
              height: `${value}px`,
              width: `${500 / size}px`,
            }}
          >
          </div>
        ))}
      </div>
      <div className="algorithm-info">
        <h2>{name}</h2>
        <p>
          <strong>Time Complexity:</strong> {timeComplexity}
        </p>
        <p>
          <strong>Space Complexity:</strong> {spaceComplexity}
        </p>
        <p>{explanation}</p>
        <pre className="pseudocode">{pseudocode}</pre>
      </div>
    </div>
  );
};

export default App;