const formatSingleItem = (data) => {
  return { id: data.id, ...data.attributes };
};

export default formatSingleItem;
