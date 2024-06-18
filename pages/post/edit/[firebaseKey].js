/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostForm from '../../../components/forms/PostForm';
import { getSinglePost } from '../../../api/postData';

export default function UpdatePost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getPost = () => {
    getSinglePost(firebaseKey).then(setEditItem);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <PostForm postObj={editItem} />
    </div>
  );
}
