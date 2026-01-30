const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const withRetry = async (
  fn,
  {
    retries = 3,
    baseDelay = 500, // ms
    factor = 2,
    retryOn = [429],
  } = {}
) => {
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;

      const status = err.status || err.code;
      const shouldRetry =
        attempt <= retries && retryOn.includes(status);

      if (!shouldRetry) {
        throw err;
      }

      const delay = baseDelay * Math.pow(factor, attempt - 1);
      console.warn(
        `Retrying after ${delay}ms (attempt ${attempt}/${retries})`
      );

      await sleep(delay);
    }
  }
};

module.exports = { withRetry };
