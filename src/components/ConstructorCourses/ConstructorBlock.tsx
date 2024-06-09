import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "api/axiosConfig";
import { CourseModel } from "types/Course";
import { MyStudentsOnCourse } from "./MyStudentsOnCourse";

interface Block {
  id: number;
  course_id: number;
  number: number;
  title: string;
  description: string;
}

interface BlocksResponse {
  blocks: Block[];
}

export const ConstructorBlock: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>(""); // Состояние для хранения названия курса
  const [newBlock, setNewBlock] = useState<Omit<Block, "id" | "course_id">>({
    number: 0,
    title: "",
    description: "",
  });
  const [deleteBlockId, setDeleteBlockId] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
const [showStudentsModal, setShowStudentsModal] = useState<boolean>(false);


  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        // Получаем информацию о курсе
        const courseResponse = await axiosInstance.get<CourseModel>(`/courses/${id}`);
        setCourseTitle(courseResponse.data.title); // Устанавливаем название курса

        // Получаем блоки курса
        const response = await axiosInstance.get<BlocksResponse>(
          `/courses/${id}/blocks`
        );
        setBlocks(response.data.blocks);
        setLoading(false);
      } catch (error) {
        setError("Ошибка при загрузке блоков курса");
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBlock({
      ...newBlock,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/courses/${id}/blocks`, {
        ...newBlock,
        number: Number(newBlock.number), // Приведение к типу number
      });
      setBlocks([...blocks, response.data]);
      setShowForm(false);
      setNewBlock({ number: 0, title: "", description: "" });
    } catch (error) {
      setError("Ошибка при добавлении блока");
      console.error(error);
    }
  };

  const handleDeleteClick = (blockId: number) => {
    setDeleteBlockId(blockId);
    setShowConfirmationModal(true);
  };

  const handleDeleteBlock = async () => {
    if (deleteBlockId) {
      try {
        await axiosInstance.delete(`/courses/blocks/${deleteBlockId}`);
        setBlocks(blocks.filter((block) => block.id !== deleteBlockId));
        setShowConfirmationModal(false);
      } catch (error) {
        setError("Ошибка при удалении блока");
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Блоки курса "{courseTitle}"</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mb-6"
      >
        {showForm ? "Закрыть форму" : "Добавить блок"}
      </button>
      
      <button
        onClick={() => setShowStudentsModal(true)}
        className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200 mb-6 ml-4"
      >
        Посмотреть моих учеников
      </button>

      {showForm && (
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
      )}
      
      {blocks.length === 0 ? (
        <p>Блоки курса еще не добавлены</p>
      ) : (
        <div className="space-y-6">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="bg-white shadow-md rounded-lg p-6 relative"
            >
              <button
                onClick={() => handleDeleteClick(block.id)}
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full"
              >
                Удалить
              </button>
              <h2 className="text-2xl font-bold mb-2">{block.title}</h2>
              <p className="text-gray-700 mb-4">{block.description}</p>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Номер блока:</span>{" "}
                  {block.number}
                </p>
                <p>
                  <span className="font-medium">ID курса:</span>{" "}
                  {block.course_id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="mb-4">Вы действительно хотите удалить блок?</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowConfirmationModal(false);
                  setDeleteBlockId(null);
                }}
                className="mr-4 bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded-lg"
              >
                Нет
              </button>
              <button
                onClick={handleDeleteBlock}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Да
              </button>
            </div>
          </div>
        </div>
      )}
      {showStudentsModal && (
        <MyStudentsOnCourse
          courseId={id}
          onClose={() => setShowStudentsModal(false)}
        />
      )}
    </div>
  );
};
