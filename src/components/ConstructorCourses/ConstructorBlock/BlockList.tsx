import React from "react";
import { useNavigate } from "react-router-dom";


interface Block {
    id: number;
    course_id: number;
    number: number;
    title: string;
    description: string;
  }
  
interface BlockListProps {
  blocks: Block[];
  onDeleteClick: (blockId: number) => void;
}

const BlockList: React.FC<BlockListProps> = ({ blocks, onDeleteClick }) => {
  const navigate = useNavigate();

  const handleNavigateToBlock = (blockId: number) => {
    navigate(`/constructor/courses/blocks/${blockId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blocks.map((block) => (
        <div key={block.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{block.title}</h2>
            <p className="text-gray-700 mb-4">{block.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                <span className="font-medium">Номер блока:</span> {block.number}
              </p>
              <button
                onClick={() => onDeleteClick(block.id)}
                className="text-red-500 hover:text-red-600"
              >
                Удалить
              </button>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3">
            <button
              onClick={() => handleNavigateToBlock(block.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
            >
              Перейти внутрь блока
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockList;
