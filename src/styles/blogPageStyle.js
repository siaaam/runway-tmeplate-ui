import styled from 'styled-components';

export const BlogHeader = styled.div`
  background: linear-gradient(rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.4)),
    url('images/background/04.jpg');
  height: 300px;
  background-size: cover;
  /* background-position: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  a {
    color: white;
  }

  h1 {
    color: white;
  }
  p {
    color: white;
    text-transform: capitalize;
  }
`;

export const BlogBody = styled.div`
  display: flex;
  gap: 2rem;
  padding: 60px 0 60px 0;
`;

export const Blogs = styled.div`
  flex: 2;
`;

export const RightSide = styled.div`
  flex: 1;
  overflow: scroll;
`;

export const BlogCard = styled.div`
  background: white;

  margin-bottom: 30px;

  a {
    color: black;

    &:hover {
      opacity: 0.7;
      border-bottom: 4px solid pink;
    }
  }

  h3 {
    padding: 20px 10px;
  }

  p {
    padding: 0 10px 20px;
  }
`;

export const BlogCardFooter = styled.div`
  display: flex;
  margin: 0 20px 0 10px;
  padding: 20px 0;
  justify-content: space-between;
`;

export const Categories = styled.div`
  background: white;
  padding: 20px 30px;
  position: sticky;
  margin-bottom: 40px;
  /* top: 80px; */

  a {
    color: #000;
    transition: all 0.2 ease;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Recent = styled.div`
  /* color: red; */
  /* position: sticky; */
  /* top: 400px; */
  background: white;
  padding: 20px 30px;
  /* top: 400px; */
  /* z-index: 99999; */
  /* overflow-y: hidden; */

  li {
    background: #ddd;
    padding: 5px;
    overflow-y: scroll;
    margin-bottom: 10px;

    a {
      color: #000;

      &:hover {
        color: #999;
      }
    }
  }
`;
