import { LoadIcon } from '../atoms/Svg';

const Loader = () => {
  return (
    <div className="absolute  w-full h-[calc(100vh-82px)] bg-white flex items-center justify-center">
      <LoadIcon />
    </div>
  );
};

export default Loader;
