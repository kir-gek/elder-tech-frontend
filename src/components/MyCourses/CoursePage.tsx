import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "api/axiosConfig";
import { CourseModel } from "types/Course";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, CheckCircleIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid";

interface CourseBlock {
  id: number;
  course_id: number;
  number: number;
  title: string;
  description: string;
}

export const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseModel | null>(null);
  const [blocks, setBlocks] = useState<CourseBlock[]>([]);
  const [completedBlocks, setCompletedBlocks] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке курса:", error);
      }
    };

    const fetchCourseBlocks = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${id}/blocks`);
        setBlocks(response.data.blocks);
      } catch (error) {
        console.error("Ошибка при загрузке блоков курса:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
    fetchCourseBlocks();
  }, [id]);

  const handleUnsubscribe = async () => {
    try {
      await axiosInstance.post(`/courses/${id}/leave`);
      navigate("/courses");
    } catch (error) {
      console.error("Ошибка при отписке от курса:", error);
    }
  };

  const toggleBlockCompletion = (blockId: number) => {
    setCompletedBlocks((prevCompletedBlocks) => {
      const newCompletedBlocks = new Set(prevCompletedBlocks);
      if (newCompletedBlocks.has(blockId)) {
        newCompletedBlocks.delete(blockId);
      } else {
        newCompletedBlocks.add(blockId);
      }
      return newCompletedBlocks;
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">Курс: {course?.title}</h1>
      <p className="text-gray-700 mb-4">Описание курса: {course?.description}</p>

      <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Детали курса</span>
                <ChevronUpIcon
                  className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <p className="mb-2">
                  <span className="font-medium">Сложность:</span> {course?.difficulty}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Время на завершение:</span>{" "}
                  {course?.time_to_complete_hours} минут
                </p>
                <p className="mb-2">
                  <span className="font-medium">Для кого:</span> {course?.for_who}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Описание:</span> {course?.about}
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl mt-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Блоки курса</span>
                <ChevronUpIcon
                  className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {blocks.length === 0 ? (
                  <p>Блоки не найдены</p>
                ) : (
                  blocks.map((block) => (
                    <div key={block.id} className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{block.title}</h3>
                        <p>{block.description}</p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleBlockCompletion(block.id)}
                          className="ml-4"
                        >
                          {completedBlocks.has(block.id) ? (
                            <CheckCircleIcon className="w-6 h-6 text-green-500" />
                          ) : (
                            <ViewfinderCircleIcon className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => navigate(`/my-courses/block/${block.id}`)}
                          className="ml-2 bg-blue-500 text-white font-medium py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          Перейти
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <button
        onClick={handleUnsubscribe}
        className="mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
      >
        Отписаться
      </button>
    </div>
  );
};
