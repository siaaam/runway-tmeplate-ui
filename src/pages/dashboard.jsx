import React, { useContext, useEffect, useState } from 'react';
import { Content, FlexWrapper, MenuBar } from '../styles/dashBoardStyles';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import axiosAPI from '../utils/axiosAPI';
import useToken from '../hooks/useToken';
import formatCategories from '../utils/formatCategories';

const Dashboard = () => {
  const { blogs, blogsLoaded, setBlogs } = useContext(BlogContext);
  const { user, userLoaded } = useContext(AuthContext);
  const { token, tokenLoaded } = useToken();

  const [blogsForDashBoard, setBlogsFromDashBoard] = useState([]);
  const [blogsForDashBoardLoaded, setBlogsFromDashBoardLoaded] =
    useState(false);

  const loadBlogs = async () => {
    try {
      const res = await axiosAPI({
        method: 'get',
        url: `blogs?filters[author][id][$eq]=${user.id}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      setBlogsFromDashBoard(formatCategories(res.data));
      setBlogsFromDashBoardLoaded(true);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
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

      const blogsAfterDelete = blogsForDashBoard.filter(
        (blog) => blog.id !== id
      );
      setBlogsFromDashBoard(blogsAfterDelete);
      // blog page
      const x = blogs.filter((blog) => blog.id !== id);
      setBlogs(x);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (tokenLoaded) {
      loadBlogs();
    }
  }, [userLoaded, tokenLoaded]);

  // console.log(user.blogs);
  return (
    <div style={{ marginTop: '70px', background: 'rgba(0, 0, 0, 0.1)' }}>
      <div className="container">
        <h1 className="text-center">Dashboard</h1>
        <FlexWrapper>
          <MenuBar>
            <ul>
              <li>
                <Link to={'/profile'}>Profile</Link>
              </li>
              <li>
                <Link to={'/addBlog'}>Add Blog</Link>
              </li>
            </ul>
          </MenuBar>
          <Content>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogsForDashBoardLoaded &&
                  blogsForDashBoard.map((blog) => (
                    <tr key={blog.id}>
                      <th>{blog.id}</th>
                      <td>
                        <Link to={`/blogDetails/${blog.id}`}>{blog.title}</Link>
                      </td>

                      <td>
                        <div style={{ fontSize: '30px' }}>
                          <span className="mr-3">
                            <AiFillDelete onClick={() => deleteBlog(blog.id)} />
                          </span>
                          <span>
                            <AiOutlineEdit />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Content>
        </FlexWrapper>
      </div>
    </div>
  );
};

export default Dashboard;
