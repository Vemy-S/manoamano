import { useState, useEffect, useMemo } from 'react';
import { usePostStore } from '../zustand/usePostStore';

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

const useFilteredPost = (searchQuery: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      if (posts.length === 0) {
        try {
          await setPosts();
        } catch (err) {
          setError('Error fetching posts');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [posts, setPosts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  return { filteredPosts, loading, error };
};

export default useFilteredPost;