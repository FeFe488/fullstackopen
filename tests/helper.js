


const loginWithUser1 = async (page, username, password) => {
    await page.getByRole('link',{name: 'login'}).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button',{name: 'login'}).click()
}


const createNewBlog = async (page, title, author, url) => {
    await page.getByRole('link',{name: 'new blog'}).click()
    await page.getByLabel('title:').fill(title)
    await page.getByLabel('author:').fill(author)
    await page.getByLabel('url:').fill(url)
    await page.getByRole('button',{name: 'create'}).click()
}

export {loginWithUser1, createNewBlog}