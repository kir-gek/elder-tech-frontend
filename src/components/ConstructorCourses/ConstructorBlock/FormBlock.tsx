import React, { useState } from "react";

interface FormBlockProps {
  onSubmit: (newBlock: Omit<Block, "id" | "course_id">) => void;
}

const FormBlock: React.FC<FormBlockProps> = ({ onSubmit }) => {
  const [newBlock, setNewBlock] = useState<Omit<Block, "id" | "course_id">>({
    number: 0,
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBlock({
      ...newBlock,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newBlock);
    setNewBlock({ number: 0, title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Номер блока
        </label>
        <input
          type="number"
          name="number"
          value={newBlock.number}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Название блока
        </label>
        <input
          type="text"
          name="title"
          value={newBlock.title}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Описание блока
        </label>
        <textarea
          name="description"
          value={newBlock.description}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Добавить
      </button>
    </form>
  );
};

export default FormBlock;
