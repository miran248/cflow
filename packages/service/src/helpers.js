export const cancellable = (operation) => {
  let cancel = null;

  const cancellable = new Promise(
    (resolve) => cancel = resolve
  );

  return {
    cancel,
    cancellable,

    returnValue: operation(cancellable, cancel),
  };
};

export const wait = (delay) => new Promise(
  (resolve) => {
    let timeout = setTimeout(
      () => {
        if(!timeout)
          return;

        timeout = clearTimeout(timeout);

        resolve();
      },
      delay
    );
  }
);

export const waitWhile = (predicate, delay) => new Promise(
  (resolve) => {
    let interval = setInterval(
      () => {
        if(predicate())
          return;

        if(!interval)
          return;

        interval = clearInterval(interval);

        resolve();
      },
      delay
    );
  }
);

export const retry = (operation, delay = 1000, retries = 0) => new Promise(
  (resolve, reject) => operation()
    .then(resolve)
    .catch(
      (error) => {
        if(retries > 0) {
          return wait(delay)
            .then(retry.bind(null, operation, delay * 2, retries - 1))
            .then(resolve)
            .catch(reject);
        }

        return reject(error);
      }
    )
);

export const runSequence = (items, operation, state = {}) => items.reduce(
  (memo, item) => memo.then(
    (state) => operation(item, state)
  ),
  Promise.resolve(state)
);

export const runSequenceRight = (items, operation, state = {}) => items.reduceRight(
  (memo, item) => memo.then(
    (state) => operation(item, state)
  ),
  Promise.resolve(state)
);

export const buffered = (fn) => {
  const pending = [];

  let processing = false;

  console.log("helpers buffered");

  const run = async(...args) => {
    if(processing) {
      pending.push(args);

      return;
    }

    processing = true;

    const response = await fn(...args);

    processing = false;

    if(pending.length)
      await run(...pending.shift());

    return response;
  };

  return run;
};
