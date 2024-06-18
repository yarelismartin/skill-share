import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostCard from '../../../components/PostCard';

export default function PostDetail() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const singlePost = () => {
    getSinglePost(firebaseKey).then(setPost);
  };

  useEffect(() => {
    singlePost();
  }, []);

  return (
    <div>
      <PostCard key={post.firebaseKey} postObj={post} />
    </div>
  );
}
