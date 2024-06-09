import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "api/axiosConfig";
import { CourseModel } from "types/Course";
import FormBlock from "./FormBlock";
import BlockList from "./BlockList";
import ConfirmationModal from "./ConfirmationModal";
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
  const { id } = useParams<{ id: string  }>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>(""); 
  const [deleteBlockId, setDeleteBlockId] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showStudentsModal, setShowStudentsModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const courseResponse = await axiosInstance.get<CourseModel>(`/courses/${id}`);
        setCourseTitle(courseResponse.data.title); 

        const response = await axiosInstance.get<BlocksResponse>(
          `/courses/${id}/blocks`
        );
        setBlocks(response.data.blocks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [id]);

  const handleAddBlock = async (newBlock: Omit<Block, "id" | "course_id">) => {
    try {
      const response = await axiosInstance.post(`/courses/${id}/blocks`, {
        ...newBlock,
        number: Number(newBlock.number), 
      });
      setBlocks([...blocks, response.data]);
      setShowForm(false);
    } catch (error) {
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

      {showForm && <FormBlock onSubmit={handleAddBlock} />}

      {blocks.length === 0 ? (
        <p>Блоки курса еще не добавлены</p>
      ) : (
        <BlockList blocks={blocks} onDeleteClick={handleDeleteClick} />
      )}

      <ConfirmationModal
        show={showConfirmationModal}
        onDelete={handleDeleteBlock}
        onClose={() => {
          setShowConfirmationModal(false);
          setDeleteBlockId(null);
        }}
      />

      {showStudentsModal && (
        <MyStudentsOnCourse
          courseId={id ? parseInt(id) : 0}
          onClose={() => setShowStudentsModal(false)}
        />
      )}
    </div>
  );
};

