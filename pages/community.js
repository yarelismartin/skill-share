/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { allPosts } from '../api/postData';
import Menu from '../components/Menu';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getAllPost = async () => {
    const fetchedPosts = await allPosts();
    const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setPosts(sortedPosts);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="product-list-container">
      <Menu />
      <section className="products-container">
        <Button type="button" onClick={() => { router.push('/post/new'); }}>Create A Post</Button>
        {posts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} onUpdate={getAllPost} />
        ))}
      </section>
    </div>
  );
}
