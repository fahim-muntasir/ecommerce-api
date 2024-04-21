const pagination = ({ page = 1, limit = 10, totalItems = 0 }) => {
  const totalPage = Math.ceil(totalItems / limit);

  const pagination = {
    page,
    limit,
    totalPage,
    totalItems,
  };

  if (page < totalPage) {
    pagination.nextPage = page + 1;
  }

  if (page > 1) {
    pagination.prevPage = page - 1;
  }

  return { pagination, totalPage };
};

const generatePaginationLinks = ({
  path = "/",
  page = 1,
  totalPage = 1,
  limit = 10,
  sortType = "desc",
  sortBy = "createdAt",
  searchQuery = "",
  status = "",
}) => {
  const links = {
    self: `${path}?page=${page}&limit=${limit}&sortType=${sortType}&sortBy=${sortBy}&search=${searchQuery}&status=${status}`,
  };

  if (page < totalPage) {
    links.nextPage = `${path}?page=${
      page + 1
    }&limit=${limit}&sortType=${sortType}&sortBy=${sortBy}&search=${searchQuery}&status=${status}`;
  }

  if (page > 1) {
    links.prevPage = `${path}?page=${
      page - 1
    }&limit=${limit}&sortType=${sortType}&sortBy=${sortBy}&search=${searchQuery}&status=${status}`;
  }

  return links;
};

module.exports = {
  paginationGenerate: pagination,
  generatePaginationLinks,
};
