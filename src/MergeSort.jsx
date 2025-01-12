export const mergeSort = async (array, delayTime) => {
    const arr = [...array];
    const animations = [];
  
    const merge = (left, right) => {
      let result = [], i = 0, j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      return [...result, ...left.slice(i), ...right.slice(j)];
    };
  
    const mergeSortHelper = (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
      return merge(mergeSortHelper(left), mergeSortHelper(right));
    };
  
    const sortedArray = mergeSortHelper(arr);
  
    for (let i = 0; i < arr.length; i++) {
      animations.push([i, true]); // Mark as sorted
    }
    
    // Visualize the merge sort
    for (let [i, isSorted] of animations) {
      const bars = document.getElementsByClassName("array-bar");
      bars[i].style.height = `${sortedArray[i]}px`;
      bars[i].style.backgroundColor = 'green';
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }
  
    return sortedArray;
  };
  