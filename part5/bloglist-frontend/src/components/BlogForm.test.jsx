// import userEvent from "@testing-library/user-event"
// import { render, screen} from "@testing-library/react"
// import BlogForm from "./BlogForm"



// test('<BlogForm /> calls createBlog with right details when new blog created', async () => {
  
//   const createBlog = vi.fn()
//   const user = userEvent.setup()

//   render(<BlogForm createBlog={createBlog} />)

  

//   const title = screen.getByPlaceholderText('write title here')
//   const author = screen.getByPlaceholderText('write author here')
//   const url = screen.getByPlaceholderText('write url here')

//   const createButton = screen.getByText('create')

//   await user.type(title, 'test title')
//   await user.type(author, 'test author')
//   await user.type(url, 'https://testurl.com')
  
//   await user.click(createButton)
  
//   expect(createBlog.mock.calls).toHaveLength(1)
//   expect(createBlog.mock.calls[0][0].title).toBe('test title')
//   expect(createBlog.mock.calls[0][0].author).toBe('test author')
//   expect(createBlog.mock.calls[0][0].url).toBe('https://testurl.com')

  
// })