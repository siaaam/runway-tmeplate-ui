import React, { useContext } from 'react';
import { Content, FlexWrapper, MenuBar } from '../styles/dashBoardStyles';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const Dashboard = () => {
  const { blogs } = useContext(BlogContext);
  console.log(blogs);
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

                  <th>Handle</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <th>{blog.id}</th>
                    <td>
                      <Link to={`/blogDetails/${blog.id}`}>{blog.title}</Link>
                    </td>

                    <td>@mdo</td>
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
