import styled from 'styled-components'
import { Box } from '@mui/material'

const RemoveButton = styled.button`
    color: #d32f2f;
    background: white;
    border: 1px solid #ee9292;
    border-radius: 7px;
    padding: 8px 15px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: #ffebee;
    }
  `
  const LikeButton = styled.button`
    color: #156dc5;
    background: white;
    border: 1px solid #99d0fd;
    border-radius: 7px;
    padding: 8px 15px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background: #e3f2fd;
    }
  `
  const OneBlog = styled.div`
    max-width: 800px;
    margin: 18px 0;
    padding: 20px 30px;
    border: 1px solid #c1c1c1;
    border-radius: 6px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
    background: white;
  `
  const BlogTitle = styled.h2`
  margin: 0 0 18px 0;
  font-size: 27px;
  font-weight: 800;
  `

  const BlogBasic = styled.div`
    margin-bottom: 11px;
    font-size: 18px;
    color: #666;
  `
  const BlogLink = styled.a`
    display: block;
    margin-bottom: 11px;
    font-size: 18px;
    color: #1976d2;
  `
  const LikesRow = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
  `

  const LikesText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
  `

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, updatedBlog)
  }

  const handleDeletion = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const ownerName = blog.user
    ?  blog.user.name
    : 'unknown'

  const allowedToRemove =
    user &&
    blog.user &&
    blog.user.username === user.username

  
  return (
    <OneBlog>
      <div className="blog">
        
        <BlogTitle>
          {blog.title}
        </BlogTitle>

        <BlogBasic>
          by {blog.author}
        </BlogBasic>

        <BlogLink href={blog.url}>
          {blog.url}
        </BlogLink>

        <BlogBasic>
          Added by {ownerName}
        </BlogBasic>

        <LikesRow className="likes">
          
          <LikesText>
            likes: {blog.likes}
          </LikesText>

          {user && (
            <LikeButton onClick={handleLike}>
              LIKE
            </LikeButton>
          )}
          
          {allowedToRemove && (
            <RemoveButton onClick={handleDeletion}>
              REMOVE
            </RemoveButton>
          )}
        </LikesRow>
      
      </div>
    </OneBlog>
  )
}

export default Blog