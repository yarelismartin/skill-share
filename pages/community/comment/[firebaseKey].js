import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostCard from '../../../components/PostCard';
// import CommentCard from '../../../components/CommentCard';

export default function PostDetail() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  // const [ comments, setComments ] = useState([])

  const singlePost = () => {
    getSinglePost(firebaseKey).then(setPost);
  };

  useEffect(() => {
    singlePost();
  }, []);

  return (
    <div>
      <PostCard key={post.firebaseKey} postObj={post} />
      {/* <CommentCard commentObj={}/> */}
    </div>
  );
}
