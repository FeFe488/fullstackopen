

import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('does render title and author, not url or likes ', () => {
  const blog = {
    title: 'title yes',
    author: 'author yes',
    url:'url no',
    likes:'likes no',
    user:{
        username: 'xxx'
    }
  }

  const {container} = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('title yes')
  expect(div).toHaveTextContent('author yes')

  expect(div).not.toHaveTextContent('url no')
  expect(div).not.toHaveTextContent('likes no')
})

test('does render url and likes on button click', async() => {
    
    const blog = {
        title:"xxx",
        author:"xxx",
        url: 'url yes',
        likes: 1,
        user:{
            username:"xxx"
        },
    }

    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('url yes')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    
})


test('clicking the like button twice calls event handler handleLike twice', async () => {
  
  const mockHandler = vi.fn()

  const blog = {
        title:"xxx",
        author:"xxx",
        url: 'xxx',
        likes: 1,
        user:{
            username:"xxx"
        }
  }

  render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})