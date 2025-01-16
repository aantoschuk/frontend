self.onmessage = function (event) {
  const { data } = event;

  // calculate total age of all persons in the passed data
  const result = data.reduce((acc, val) => acc + val.age, 0);
  setTimeout(() => {
    self.postMessage(result);
  }, 1000);
};
