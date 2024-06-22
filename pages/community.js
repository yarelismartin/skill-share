/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { allPosts, getPostByCategory } from '../api/postData';
import Menu from '../components/Menu';
import getCategories from '../api/categoryDate';
import { getSingleProfile } from '../api/profileData';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  const getAllCategories = () => {
    getCategories().then(setCategory);
  };

  const getAllPost = async () => {
    const fetchedPosts = await allPosts();
    const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setPosts(sortedPosts);
  };

  const postByCategory = async () => {
    if (selectedCategory) {
      const postForCategory = await getPostByCategory(selectedCategory);
      const sortedCategpryPosts = postForCategory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setPosts(sortedCategpryPosts);
    } else {
      getAllPost();
    }
  };

  useEffect(() => {
    postByCategory(selectedCategory);
    getAllCategories();
  }, [selectedCategory]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <br />

      <div className="product-list-container">

        <Menu categories={category} onSelectCategory={setSelectedCategory} />
        <section className="products-container">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {posts.map((post) => (
              <PostCard key={post.firebaseKey} postObj={post} onUpdate={postByCategory} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
