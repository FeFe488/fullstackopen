

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { test, expect, describe, vi } from 'vitest'
import Blog from './Blog'

const blog = {
  title: 'test title',
  author: 'robert martin',
  url: 'https://test.com',
  likes: 1,
  user: {
    username: 'superuser',
    name: 'super user'
  }
}

describe('single blog view', () => {
  
  test('blog information and likes are shown to unauthenticated users. buttons are not shown', () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText('robert martin: test title')).toBeInTheDocument()
    expect(screen.getByText('https://test.com')).toBeInTheDocument()
    expect(screen.getByText('likes 1')).toBeInTheDocument()
    expect(screen.getByText('Added by super user')).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  
  
  test('authenticated users who are not the creator are shown only the like button', () => {
    const loggedInUser = {
      username: 'testuser',
      name: 'test user'
    }

    render(
      <Blog
        blog={blog}
        user={loggedInUser}
      />
    )

    expect(screen.getByText('robert martin: test title')).toBeInTheDocument()
    expect(screen.getByText('likes 1')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })



  test('the creator of the blog is shown the delete button', () => {
    const creator = {
      username: 'superuser',
      name: 'super user'
    }

    render(
      <Blog
        blog={blog}
        user={creator}
      />
    )

    expect(screen.getByText('robert martin: test title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
  })

})