export function flushPromises(timemoutMs = 0): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, timemoutMs);
  });
}
