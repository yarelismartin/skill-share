import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { allPosts } from '../api/postData';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getAllPost = async () => {
    await allPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div>
      <Button type="button" onClick={() => { router.push('/post/new'); }}>Create A Post</Button>
      {posts.map((post) => (
        <PostCard key={post.firebaseKey} postObj={post} onUpdate={getAllPost} />
      ))}
    </div>
  );
}
