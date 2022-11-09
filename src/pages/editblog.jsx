import React, { useContext, useEffect, useState } from 'react';
import { InputWrapper } from '../styles/addBlogStyles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BlogContext } from '../context/BlogContext';
import { useParams } from 'react-router-dom';
import useToken from '../hooks/useToken';
import axiosAPI from '../utils/axiosAPI';
import formatSingleItem from '../utils/formatSingleItem';

const schema = yup
  .object({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
  })
  .required();

const EditBlog = () => {
  const [blogToEdit, setBlogToEdit] = useState({});

  const { token, tokenLoaded } = useToken();
  const params = useParams();
  const id = +params.id;
  const { addBlog, categories, editBlog } = useContext(BlogContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    editBlog(id, data);
    // addBlog(data);
  };

  const getBlog = async () => {
    try {
      const res = await axiosAPI({
        method: 'get',
        url: `/blogs/${id}?populate=category`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const formattedBlog = formatSingleItem(res.data);
      setBlogToEdit(formattedBlog);
      // setBlog(formattedBlog);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (tokenLoaded) {
      getBlog();
    }
  }, [token, tokenLoaded]);

  return (
    <div
      style={{ marginTop: '70px', background: '#ddd', padding: '0 0 30px 0' }}
    >
      <div className="container">
        <h2 className="py-4">Edit Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              {...register('title')}
              defaultValue={blogToEdit.title}
            />
          </InputWrapper>
          <p className="text-danger">{errors.title?.message}</p>

          <InputWrapper>
            <label htmlFor="description">Description</label>
            <textarea
              {...register('description')}
              defaultValue={blogToEdit.description}
            />
          </InputWrapper>
          <p className="text-danger">{errors.description?.message}</p>

          <InputWrapper>
            <label htmlFor="category">category</label>
            <select {...register('category')}>
              {categories.map((category) => (
                <option
                  //   selected={category.id}
                  key={category.id}
                  value={category.id}
                >
                  {category.title}
                </option>
              ))}
            </select>
          </InputWrapper>

          <button className="btn btn-primary mt-4" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
