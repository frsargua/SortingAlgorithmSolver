export class Algorithms {
  static bibleSort(arr: number[], setter: any) {
    let sorted = false;
    let start = 0;
    let end = arr.length - 1;

    const stepDelay = 2000; // Delay between each step in milliseconds

    const performStep = () => {
      if (!sorted) {
        sorted = true;

        // Pass from start to end
        for (let i = start; i < end; i++) {
          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            sorted = false;
            setter(arr);
          }
        }
        end--;

        // Check if the array is already sorted
        if (sorted) return doneSorting();

        setTimeout(performStep, stepDelay);
      }
    };

    const doneSorting = () => {
      console.log("Sorting completed:", arr);
    };

    setTimeout(performStep, stepDelay);

    return arr;
  }
}
