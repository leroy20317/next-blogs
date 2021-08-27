/**
 * @author: leroy
 * @date: 2021/8/23 16:11
 * @description：counter
 */
export async function fetchCount(amount = 1): Promise<{ data: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: amount + 3 });
    }, 2000);
  });
}
