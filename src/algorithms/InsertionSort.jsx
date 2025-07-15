export const insertionSort = async (array, delayTime) => {
  const arr = [...array];
  const n = arr.length;
  const animations = [];

  for (let i = 1; i < n; i++) {
    let currentVal = arr[i];
    let j = i - 1;

    // Log the current bar being picked for insertion
    animations.push([i, 'current']);

    while (j >= 0 && arr[j] > currentVal) {
      // Log the bar being compared
      animations.push([j, 'compare']);
      animations.push([j, j + 1, 'shift']); // Log the shift action
      arr[j + 1] = arr[j];
      j--;
      animations.push([j + 1, 'revert']); // Revert bar color
    }
    arr[j + 1] = currentVal;
    animations.push([j + 1, 'insert']); // Log the final insertion position
  }

  // Animate the sorting process
  const bars = document.getElementsByClassName("array-bar");
  for (let i = 0; i < animations.length; i++) {
    const [index1, action, index2] = animations[i];

    if (action === 'current') {
      bars[index1].style.backgroundColor = '#fbbc05'; // A bright yellow
    } else if (action === 'compare') {
      bars[index1].style.backgroundColor = '#ea4335'; // A bright red
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    } else if (action === 'shift') {
      bars[index2].style.height = `${bars[index1].offsetHeight}px`;
      bars[index2].style.backgroundColor = '#34a853'; // A bright green
    } else if (action === 'revert') {
      bars[index1].style.backgroundColor = '#4285f4'; // Reset color
    } else if (action === 'insert') {
      bars[index1].style.backgroundColor = '#4285f4'; // Reset color
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }
  }

  // After sorting is complete, set all bars to a final color
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = '#34a853'; // Green for sorted
  }
  
  return arr;
};