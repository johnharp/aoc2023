export function sumArray(nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);

    return sum;
}

export function sumArrayN(nums, n) {
    const sum = sumArray(nums.slice(0, n));

    return sum;
}