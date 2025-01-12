export const selectionSort = async (array, delayTime) => {
    const arr = [...array];
    const animations = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        animations.push([i, j, 'compare']); // Compare action
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        animations.push([i, minIndex, 'swap']); // Swap action
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
  
    // Visualize the sorting process
    for (let [i, j, action] of animations) {
      const bars = document.getElementsByClassName("array-bar");
      if (action === 'compare') {
        bars[i].style.backgroundColor = 'orange';
        bars[j].style.backgroundColor = 'orange';
      } else if (action === 'swap') {
        bars[i].style.backgroundColor = 'red';
        bars[j].style.backgroundColor = 'red';
        await new Promise((resolve) => setTimeout(resolve, delayTime));
        bars[i].style.height = `${arr[i]}px`;
        bars[j].style.height = `${arr[j]}px`;
      }
      await new Promise((resolve) => setTimeout(resolve, delayTime));
      bars[i].style.backgroundColor = 'skyblue';
      bars[j].style.backgroundColor = 'skyblue';
    }
  
    return arr;
  };
  