import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={{ title: 'blogTitle', author: 'tester', url: 'http', likes: 42 }}
        user={{}}
        handleBlogRemoved={() => null}
        handleBlogUpdated={() => null}
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

})