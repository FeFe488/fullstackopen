const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWithUser1, createNewBlog}= require('./helper')


describe('Blog app', () => {
  
    beforeEach(async ({ page,request }) => {

        await request.post('http://localhost:3003/api/testing/reset')
        
        await request.post('http://localhost:3003/api/users', {
        data: {
            username: 'testuser1',
            name: 'user1',
            password: 'test'
        }
        })

        await request.post('http://localhost:3003/api/users', {
        data: {
            username: 'testuser2',
            name: 'user2',
            password: 'test'
        }
        })

        await page.goto('http://localhost:5173')
        
    })


    describe('login', () => {
        test('succeeds with correct credentials', async({page}) => {
            
            await loginWithUser1 (page,'testuser1', 'test')
            
            await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
        })

        

        test('fails with wrong credentials', async({page}) => {
            await page.getByRole('link',{name: 'login'}).click()
            await page.getByLabel('username').fill('blabla')
            await page.getByLabel('password').fill('wrong')
            await page.getByRole('button',{name: 'login'}).click()

            await expect(page.getByRole('button', {name:'logout'})).not.toBeVisible()
            
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWithUser1 (page, 'testuser1', 'test')
        })

        test('logout', async ({page}) => {
            await page.getByRole('button' , {name : 'logout'}).click()
            await expect(page.getByRole('link',{name: 'login'})).toBeVisible()

        })

        test('a new blog can be created', async ({ page }) => {
            
            await createNewBlog (page,'blog1', 'author1', 'https://url1.com')
            
            await expect(page.getByText('blog1 by author1')).toBeVisible()
            await expect(page.getByRole('link', {name: 'blog1 by author1'})).toBeVisible()

        })
    
        

        describe('when created', () => {
            beforeEach(async ({page}) => {
    
                await createNewBlog (page, 'blog1', 'author1', 'https://url1.com')
            })
            
            test('blog can be liked', async({page}) => {
                await page.getByRole('link', {name: 'blog1 by author1'}).click()
                const likes = page.locator('.likes')
                await page.getByRole('button', {name: 'like'}).click()
                
                await expect(likes).toContainText('1')
            

            })

            test('blog can be deleted', async({page}) => {
                await page.getByRole('link', {name: 'blog1 by author1'}).click()
                await page.getByRole('button', {name: 'remove'}).click()

                await expect(page.getByRole('link', {name: 'blog1 by author1'})).not.toBeVisible()

            })
        })
    })

    // describe('when note of another user exicts', () => {
        
    //     let blogByUser1
    //     let blogByUser2
        

    //     beforeEach(async ({page}) => {
    //         await page.getByRole('button',{name: 'login'}).click()
    //         await page.getByLabel('username').fill('testuser2')
    //         await page.getByLabel('password').fill('test')
    //         await page.getByRole('button',{name: 'login'}).click()
            
    //         await page.getByRole('button',{name: 'create new blog'}).click()
    //         await page.getByLabel('title:').fill('blog2')
    //         await page.getByLabel('author:').fill('user2')
    //         await page.getByLabel('url:').fill('https://url2.com')
    //         await page.getByRole('button',{name: 'create'}).click()
            
    //         await page.getByRole('button', {name: 'logout'}).click()

    //         await loginWithUser1 (page, 'testuser1', 'test')

    //         await createNewBlog (page,'blog1', 'user1', 'https://url1.com')

    //         blogByUser1 = page.locator('.blog').filter({hasText: 'blog1'})
    //         blogByUser2 = page.locator('.blog').filter({hasText : 'blog2'})
    //         // blog = page.locator('blog')
            
    //     })
        
    //     test('only User2 can see remove button', async ({page}) => {
    //         await expect(blogByUser1).toBeVisible()
    //         await blogByUser2.getByRole('button', {name: 'view'}).click()
    //         await expect (page.getByRole('button', {name: 'remove'})).not.toBeVisible()
    //     })

    //     test('blog with more likes is on top', async ({page}) => {
            
    //         await blogByUser1.getByRole('button', {name: 'view'}).click()
    //         const likes = page.locator('.likes')
    //         await likes.getByRole('button', {name: 'like'}).click()    
    //         await expect (likes.getByText('1')).toBeVisible()

    //         await blogByUser2.getByRole('button', {name: 'view'}).click()
            
    //         const wholeBlogs = page.locator('.wholeBlock')
    //         await expect(wholeBlogs.nth(0)).toContainText('blog1')
    //         await expect(wholeBlogs.nth(1)).toContainText('blog2')
    //     })
    // }) 

        
})