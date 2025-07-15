export const quickSort = async (array, delayTime) => {
    const arr = [...array];
  
    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    };
  
    const quickSortHelper = async (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
      }
    };
  
    await quickSortHelper(arr, 0, arr.length - 1);
  
    return arr;
  };
  