import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let updateMock

  beforeEach(() => {
    updateMock = jest.fn()
    component = render(
      <Blog
        blog={{ title: 'blogTitle', author: 'tester', url: 'http', likes: 42 }}
        user={{}}
        handleBlogRemoved={() => null}
        handleBlogUpdated={updateMock}
      />
    )
  })

  test('shows only title and author at beginning', () => {
    expect(
      component.container.querySelector('.title')
    ).toBeDefined()

    expect(
      component.container.querySelector('.author')
    ).toBeDefined()

    expect(
      component.container.querySelector('.url')
    ).toBeNull()

    expect(
      component.container.querySelector('.likes')
    ).toBeNull()
  })

  test('shows likes and url after show button is clicked', () => {
    const button = component.getByText('show more')
    fireEvent.click(button)

    expect(
      component.container.querySelector('.url')
    ).toBeDefined()

    expect(
      component.container.querySelector('.likes')
    ).toBeDefined()
  })

  test('clicking like button invokes update function', () => {
    const showButton = component.getByText('show more')
    fireEvent.click(showButton)

    const likeButton = component.container.querySelector('.button-like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateMock.mock.calls).toHaveLength(2)
  })
})