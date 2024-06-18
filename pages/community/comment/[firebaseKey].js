/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostCard from '../../../components/PostCard';
import CommentCard from '../../../components/CommentCard';
import { getCommentsForUser } from '../../../api/commentData';

export default function PostDetail() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [comments, setComments] = useState([]);

  const singlePost = () => {
    getSinglePost(firebaseKey).then(setPost);
  };

  const getComments = () => {
    getCommentsForUser(firebaseKey).then(setComments);
  };

  useEffect(() => {
    getComments();
    singlePost();
  }, []);

  return (
    <div>
      <PostCard key={post.firebaseKey} postObj={post} />
      {comments.map((comment) => (
        <CommentCard key={comment.firebaseKey} commentObj={comment} />
      ))}

    </div>
  );
}
