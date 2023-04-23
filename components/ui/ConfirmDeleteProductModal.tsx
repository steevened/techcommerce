import { ProductToDelete } from '@/lib/interfaces/products.interface';
import { Button } from '@material-tailwind/react';
import { FC } from 'react';

interface Props {
  isDialogDeleteOpen: boolean;
  setIsDialogDeleteOpen: (value: boolean) => void;
  setProductToDelete: (value: null) => void;
  productToDelete: ProductToDelete | null;
  handleDeleteProduct: () => void;
}

const ConfirmDeleteProductModal: FC<Props> = ({
  isDialogDeleteOpen,
  setIsDialogDeleteOpen,
  setProductToDelete,
  productToDelete,
  handleDeleteProduct,
}) => {
  return (
    <>
      <div
        onClick={() => {
          setProductToDelete(null);
          setIsDialogDeleteOpen(false);
        }}
        className={`fixed inset-0 h-screen bg-black/80 backdrop-blur-3xl z-50 duration-200 flex items-center justify-center ${
          isDialogDeleteOpen ? '' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white rounded-md shadow-lg p-4 w-96 mx-4"
        >
          <h2 className="text-xl font-semibold pb-2">Are you sure?</h2>

          <p className="text-blue-gray-500 shadow-app-top pt-2">
            Do you really want to delete this product? This process cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setProductToDelete(null);
                setIsDialogDeleteOpen(false);
              }}
              variant="text"
              className="border border-blue-300"
            >
              Cancel
            </Button>

            <Button
              variant="filled"
              onClick={() => {
                handleDeleteProduct();
                setProductToDelete(null);
                setIsDialogDeleteOpen(false);
              }}
              color="red"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteProductModal;
