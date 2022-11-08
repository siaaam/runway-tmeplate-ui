const formatCategories = (data) => {
  return data.map((item) => ({ id: item.id, ...item.attributes }));
};

export default formatCategories;
