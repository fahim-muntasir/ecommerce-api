const transfromData = ({ items = [], selection = [], path = "/" }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error("Invalid selection or Items");
  }

  if (selection.length === 0) {
    return items.map((item) => ({ ...item, links: `${path}/${item.id}` }));
  }

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.links = `${path}/${item.id}`;
    return result;
  });
};

const getTransfromSingleData = ({ item = {}, selection = [] }) => {

  if (selection.length === 0) {
    return item;
  }

  const result = {};

  selection.forEach((selectItem) => {
    result[selectItem] = item[selectItem];
  });

  return result;
};

module.exports = {
  transfromData,
  getTransfromSingleData,
};
