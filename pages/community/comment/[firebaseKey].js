/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostCard from '../../../components/PostCard';
import CommentCard from '../../../components/CommentCard';
import { getCommentsForUser } from '../../../api/commentData';
import CommetnForm from '../../../components/forms/CommentForm';

export default function PostDetail() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [comments, setComments] = useState([]);

  const singlePost = () => {
    getSinglePost(firebaseKey).then(setPost);
  };

  const getComments = async () => {
    const allComments = await getCommentsForUser(firebaseKey);
    const sortedComments = allComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setComments(sortedComments);
  };

  useEffect(() => {
    getComments();
    singlePost();
  }, []);

  return (
    <div style={{ width: '100%', padding: '25px 0px' }}>
      <PostCard key={post.firebaseKey} postObj={post} />
      <div className="comment-container">
        <CommetnForm getComments={getComments} />
        {comments.map((comment) => (
          <CommentCard key={comment.firebaseKey} commentObj={comment} />
        ))}
      </div>

    </div>
  );
}
