interface Props {
  title: string;
}

export const CardProduct = ({ title }) => {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};
