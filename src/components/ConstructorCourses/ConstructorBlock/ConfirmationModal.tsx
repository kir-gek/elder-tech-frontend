import React from "react";

interface ConfirmationModalProps {
  show: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onDelete,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <p className="mb-4">Вы действительно хотите удалить блок?</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              onClose();
            }}
            className="mr-4 bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded-lg"
          >
            Нет
          </button>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Да
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
