import { test, expect } from '@playwright/test'

test('Simple get request', async ({request}) => {
  const response = await request.get('https://reqres.in/api/users/1')
  const body = await response.json()
  expect(response.status()).toBe(200)
  expect(body.data.first_name).toContain('George')
  console.log('Response is:', body)
})

test ('get list 1 of users', async ({request}) => {
  const response = await request.get('https://reqres.in/api/users', {
    params:{
      page:1
    }
  })
  const body = await response.json()
  expect(response.status()).toBe(200)
  expect(body.page).toEqual(1)
  const userPerPage = body.per_page
  expect(body.data).toHaveLength(userPerPage)
  console.log('Response is:', body)
})
test ('create user', async ({request}) =>{
  const response = await request.post('https://reqres.in/api/users', {
    data:{
      name:'Carlos',
      job:'QA'
    },
    headers:{
      'Content-Type':'application/json'
    }
  })
  const body = await response.json()
  expect(response.status()).toBe(201)
  console.log('Response is:', body)
})
test('update user', async ({request}) =>{
  const response = await (request.put('https://reqres.in/api/users/2',{
    data:{
      name:'test',
      job:'tester'
    },
    headers:{
      'Content-Type':'application/json'
    }
  })
)
await expect(response.status()).toBe(200)
const body = await response.json()
console.log('Response is:', body)
})
test('delete user', async ({request}) =>{
  const reponse = await request.delete('https://reqres.in/api/users/2')
  expect(reponse.status()).toBe(204)
})