/*
import { useState, useEffect } from 'react';
import { getPostById } from '../services/posts';
import { usePostIdStore } from '../zustand/usePostIdStore';

interface Post {
  post_id: number;
  title: string;
  description: string;
  type: string;
  user_id: number;
  status: string;
  postulationCount: number;
  maxPostulations: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  user: {
    user_id: number;
    fullname: string;
    email: string;
    phone: string;
    role: string;
    photo: string;
    status: string;
  };
  reviews: Array<{
    review_id: number;
    user_id: number;
    calification: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }>;
  postulations: any[];
}

const usePostData = () => {
  const { postId } = usePostIdStore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const postData = await getPostById(postId);

        // Verificación más detallada de la estructura de datos
        if (
          postData &&
          typeof postData === 'object' &&
          'post_id' in postData &&
          'title' in postData &&
          'description' in postData &&
          'createdAt' in postData &&
          'updatedAt' in postData &&
          'user' in postData &&
          Array.isArray(postData.reviews)
        ) {
          // Convertir las fechas de createdAt y updatedAt a tipo Date
          const formattedPost: Post = {
            post_id: postData.post_id,
            title: postData.title,
            description: postData.description,
            type: postData.type,
            user_id: postData.user_id,
            status: postData.status,
            postulationCount: postData.postulation_count,
            maxPostulations: postData.maxPostulations,
            tags: postData.tags || [], // Asumimos que "tags" podría no estar presente
            createdAt: new Date(postData.createdAt).toISOString(), // Convertir a ISO string
            updatedAt: new Date(postData.updatedAt).toISOString(), // Convertir a ISO string
            user: postData.user,
            reviews: postData.reviews.map((review: any) => ({
              review_id: review.review_id,
              user_id: review.user_id,
              calification: review.calification,
              comment: review.comment,
              createdAt: new Date(review.createdAt).toISOString(), // Convertir a ISO string
              updatedAt: new Date(review.updatedAt).toISOString(), // Convertir a ISO string
            })),
            postulations: postData.postulations, // Ajusta el tipo según lo necesites
          };

          setPost(formattedPost); // Ahora usamos el post ya formateado
        } else {
          throw new Error('Datos de post no válidos o incompletos');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Error al obtener los datos del post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};

export default usePostData;
*/