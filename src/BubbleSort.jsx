export const bubbleSort = async (array, delayTime) => {
    const arr = [...array];
    const animations = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        const swap = arr[j] > arr[j + 1];
        animations.push([j, j + 1, swap ? 'swap' : 'compare']); // Compare or swap action
        if (swap) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
        }
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
  