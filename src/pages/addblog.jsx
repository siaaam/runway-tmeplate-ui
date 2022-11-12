import React, { useContext, useRef, useState } from 'react';
import { InputWrapper } from '../styles/addBlogStyles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BlogContext } from '../context/BlogContext';
import JoditEditor from 'jodit-react';
import TurndownService from 'turndown';

const schema = yup
  .object({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
  })
  .required();

const AddBlog = () => {
  let turndownService = new TurndownService();
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const { addBlog, categories } = useContext(BlogContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const markdown = turndownService.turndown(content);

    // console.log(data);
    addBlog(data, markdown);
  };

  return (
    <div
      style={{ marginTop: '70px', background: '#ddd', padding: '0 0 30px 0' }}
    >
      <div className="container">
        <h2 className="py-4">Add Blog</h2>
        <form
          style={{ paddingBottom: '60px' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWrapper>
            <label htmlFor="title">Title</label>
            <input type="text" {...register('title')} />
          </InputWrapper>
          <p className="text-danger">{errors.title?.message}</p>

          <InputWrapper>
            <label htmlFor="description">Description</label>
            <textarea {...register('description')}></textarea>
          </InputWrapper>
          <p className="text-danger">{errors.description?.message}</p>

          <InputWrapper>
            <label htmlFor="category">category</label>
            <select {...register('category')}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="image">Image</label>
            <input type="file" accept="image/*" {...register('image')} />
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="content">Content</label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </InputWrapper>

          <button className="btn btn-primary mt-4" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
