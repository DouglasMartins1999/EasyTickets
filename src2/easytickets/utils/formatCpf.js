const formatCpf = value => {
  const formattedCpf = value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3$4 - $5");
  return formattedCpf;
};

export default formatCpf;
