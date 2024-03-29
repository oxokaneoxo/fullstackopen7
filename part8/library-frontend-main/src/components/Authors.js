import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"


const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    if(name === "") {
      editAuthor({ variables: { name: authors[0].name, setBornTo: Number(born) } })
    } else {
      editAuthor({ variables: { name, setBornTo: Number(born) } })
    }
    setBorn('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <select onChange={handleChange}>
              {authors.map((a, index) => (
                <option key={a.name} value={a.name} >
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
