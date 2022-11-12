import { createContext, useContext, useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import axiosAPI from '../utils/axiosAPI';
import formatCategories from '../utils/formatCategories';
import { useNavigate } from 'react-router-dom';
import formatSingleItem from '../utils/formatSingleItem';
import axios from 'axios';
import { axiosPrivateInstance } from '../utils/axios';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState(false);
  const [blogsLoaded, setBlogsLoaded] = useState(false);

  const { token, tokenLoaded } = useToken();

  const loadCategories = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: '/categories?populate=blogs',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const formattedCategories = formatCategories(data.data);
      setCategories(formattedCategories);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBlogs = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: '/blogs?populate=*',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const formattedCategories = formatCategories(data.data);
      setBlogs(formattedCategories);
      setBlogsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token && tokenLoaded) {
      loadCategories();
      loadBlogs();
    }
  }, [token, tokenLoaded]);

  const addBlog = async (blog, markdown) => {
    // console.log(blog);

    const blogData = {
      title: blog.title,
      description: blog.description,
      category: blog.category,
      author: user.id,
      content: markdown,
    };

    const formData = new FormData();

    formData.append('files.image', blog.image[0], blog.image[0].name);
    formData.append('data', JSON.stringify(blogData));

    // console.log(formData);

    try {
      const res = await axiosPrivateInstance(token).post(
        '/blogs?populate=*',
        formData
      );
      const formattedBlogData = formatSingleItem(res.data.data);
      setBlogs([...blogs, formattedBlogData]);
      navigate('/blog');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }

    // try {
    //   const res = await axiosAPI({
    //     method: 'post',
    //     url: '/blogs?populate=*',
    //     data: {
    //       data: formData,
    //     },
    //     config: {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   });
    //   console.log(res.data);
    //   const formattedBlogData = formatSingleItem(res.data);
    //   console.log(formattedBlogData);

    //   setBlogs([...blogs, formattedBlogData]);
    //   navigate('/blog');
    // } catch (err) {
    //   console.log(err);
    //   console.log(err.response);
    // }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axiosAPI({
        method: 'delete',
        url: `/blogs/${id}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const blogsAfterDelete = blogs.filter((blog) => blog.id !== id);
      setBlogs(blogsAfterDelete);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const editBlog = async (id, blogToEdit) => {
    const foundBlog = blogs.find((blog) => blog.id === id);
    try {
      const res = await axiosAPI({
        method: 'put',
        url: `/blogs/${id}`,
        data: {
          data: blogToEdit,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const blogAfterEdit = formatSingleItem(res.data);

      // find blog from blogs

      // update the current object with blogtoedit

      const blogsAfterUpdate = blogs.map((blog) => {
        if (blog.id === blogAfterEdit.id) {
          return {
            id: blog.id,
            ...blogAfterEdit,
          };
        } else {
          return blog;
        }
      });

      setBlogs(blogsAfterUpdate);
      navigate('/blog');
      // const formattedBlogData = formatSingleItem(res.data);

      // setBlogs([...blogs, formattedBlogData]);
      // navigate('/blog');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const value = {
    categories,
    blogs,
    setBlogs,
    blogsLoaded,
    addBlog,
    deleteBlog,
    editBlog,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
