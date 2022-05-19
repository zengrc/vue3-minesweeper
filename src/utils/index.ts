export function knuthShuffle(arr: Array<number>) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const temp = arr[i];
    const switchIndex = Math.floor(Math.random() * i);
    arr[i] = arr[switchIndex];
    arr[switchIndex] = temp;
  }
  return arr;
}

export function generateLayout (colLen: number, rowLen: number, mineCount: number) {
  const offsetMap = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const mineArr = Array.apply(null, new Array(mineCount)).map(() => 9);
  const safeArr = Array.apply(null, new Array(colLen * rowLen - mineCount)).map(() => 0);
  const plainLayoutArr = mineArr.concat(safeArr);
  knuthShuffle(plainLayoutArr);
  const layoutArr: { tips: number, isFlip: boolean }[][] = [];
  for (let i = 0; i < plainLayoutArr.length; i += 1) {
    const rowIndex =  Math.floor(i / colLen);
    const colIndex = i % colLen;
    if (plainLayoutArr[i] !== 9) {
      let nearMineCount = 0;
      offsetMap.forEach((offset) => {
        if (colIndex + offset[0] < 0 || colIndex + offset[0] >= colLen) return;
        if (rowIndex + offset[1] < 0 || rowIndex + offset[1] >= rowLen) return;
        const offsetIndex = i + offset[1] * colLen + offset[0];
        if (plainLayoutArr[offsetIndex] === 9) nearMineCount += 1;
      });
      plainLayoutArr[i] = nearMineCount;
    }
    if (!layoutArr[rowIndex]) layoutArr[rowIndex] = [];
    layoutArr[rowIndex].push({ tips: plainLayoutArr[i], isFlip: false });
  }
  return layoutArr;
};