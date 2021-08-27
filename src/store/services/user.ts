/**
 * @author: leroy
 * @date: 2021/8/23 16:11
 * @description：counter
 */
export async function fetchCount(amount = 1): Promise<{ data: number }> {
  const response = await Promise.resolve({ data: amount + 3 });
  return response;
}
