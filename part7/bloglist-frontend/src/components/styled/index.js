import styled from 'styled-components'

export const Header = styled.header`
  background-color: #43a750;
  padding: 10px 0 5px;
  & h1 {
    color: #fff;
    font-weight: normal;
    font-size: 30px;
    padding: 0 10px;
  }
`

export const ContentArea = styled.div`
  padding: 10px;
`

export const Navigation = styled.nav`
  background-color: #b4dab9;
  padding: 0;
  display: flex;
  justify-content: space-between;

  & a, & .logged-user {
    display: inline-block;
    padding: 10px;
    color: #000;
    margin: 0;
  }
  & a {
    text-transform: uppercase;
    text-decoration: none;
    &:hover {
      background-color: #eee;
    }
  }
`

export const Button = styled.button`
  margin: 10px 0;
  background-color: #e2e9ff;
  border: 1px solid #ccc;
  border-radius: 0;
`

export const LinkList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  & li {
    margin: 0;
    padding: 0;
    &:nth-child(odd) {
      background-color: #eee;
    }
    & a {
      display: block;
      padding: 5px 10px;
      &:hover {
        background-color: #eef;
      }
    }
  }
`

export const FormWrapper = styled.div`
  & input[type=submit] {
    background-color: #c39032;
    color: white;
    border: 1px solid #ccc;
    margin: 10px 0;
  }
`

export const InputRow = styled.div`
  & label {
    display: block;
    font-size: 12px;
  }
  & input {
    border: 1px dashed #4c69bb;
  }
`

export const DangerousButton = styled.button`
  padding: 10px 20px;
  background-color: #a33;
  margin: 10px 0;
  color: white;
  text-transform: uppercase;
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  & td, & th {
    padding: 3px;
  }
`

export const TableHead = styled.thead`
  border-bottom: 2px solid #333;

`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
  & td:first-child, &th:first-child {
    width: 70%;
  }
  & td:last-child, &th:last-child {
    width: 30%;
    text-align: center;
  }
`