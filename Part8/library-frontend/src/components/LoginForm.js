import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, setError, show, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')   

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.message)
        },
        onCompleted: () => {
            setPage('authors')
        },
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const handleSubmit = (event) => {
        event.preventDefault()
        login({ variables: { username, password }})
        setUsername('')
        setPassword('')
    }
    if(!show){
        return null
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username: 
                    <input value={username} onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    password: 
                    <input value={password} onChange={({target}) => setPassword(target.value)}/>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm