import React, { useEffect, useState } from "react";
import axiosInstance from "api/axiosConfig";

interface Member {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  age: number;
  gender: number;
  phone: string;
  email: string;
  image_id: number;
  created_at: string;
  lastOnline: string;
  // Другие поля участника
}

interface MyStudentsOnCourseProps {
  courseId: number;
  onClose: () => void;
}

export const MyStudentsOnCourse: React.FC<MyStudentsOnCourseProps> = ({ courseId }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Получаем список участников курса
        const response = await axiosInstance.get<{ members: Member[] }>(`/courses/${courseId}/members`);
        setMembers(response.data.members); // Изменяем обращение к свойству members
        setLoading(false);
      } catch (error) {
        setError("Ошибка при загрузке участников курса");
        setLoading(false);
      }
    };

    fetchMembers();
  }, [courseId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
    <div className="w-8 h-8 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ученики на курсе</h2>
      {members.length === 0 ? (
        <p>На этом курсе пока нет участников.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Аватар
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Фамилия
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Имя
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Avatar imageId={member.image_id} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.surname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );  
};

interface AvatarProps {
  imageId: number;
}

const Avatar: React.FC<AvatarProps> = ({ imageId }) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');
  
    useEffect(() => {
        if (imageId) {
            fetchAvatar(imageId.toString());
          }
        }, [imageId]);
    
      const fetchAvatar = async (imageId: string) => {
        try {
          const response = await axiosInstance.get(`/images/${imageId}`, { responseType: 'blob' });
          const url = URL.createObjectURL(response.data);
          setAvatarUrl(url);
        } catch (error) {
          console.error('Ошибка при загрузке аватарки:', error);
        }
      };


    return <img src={avatarUrl} alt="Аватар" className="w36 h-36 rounded-full mb-4" />;
  };
