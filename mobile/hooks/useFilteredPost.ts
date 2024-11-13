import { useState, useEffect, useMemo } from 'react';
import { useSearchStore } from '../zustand/useSearchStore';
import { getPosts } from '../services/posts';

interface Post {
  post_id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  user_id: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const useFilteredPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  return { filteredPosts, loading, error };
};

export default useFilteredPost;