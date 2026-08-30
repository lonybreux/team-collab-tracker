import { Link, useNavigate } from "react-router-dom"
import '../styles/Login.css'
import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

export const Login = () => {

    const [email, setEmail] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const res = await fetch(`${API_URL}/api/auth/login`,{
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    contrasena
                })
            })

            const data = await res.json()
            

            if(!res.ok) {
                setError(data.message)
            } else {
                navigate('/dashboard')
                
            }
            
        } catch(error) {
            setError('error de conexión')
            
        } finally {
            setLoading(false)
        }


    }

    const handleGoogleAccess = async () => {
        window.location.href = `${API_URL}/api/auth/google`
    }


    return (
        <>
            <header className="login-header">
                <span>Team Collab Tracker</span>

                <div className="register-redirect-div">
                    <p>¿Aún no tienes cuenta?</p>
                    <Link to={'/register'}>Crea una cuenta</Link>
                </div>
            </header>

            <div className="login-content">
                <div className="login-info-div">
                    <h1>El trabajo en equipo, más claro.</h1>
                    <p>Coordina proyectos, reparte tareas y llega a cada entrega con todo bajo control.</p>

                    <ul className="login-info-list">
                        <li>Un solo espacio para cada proyecto</li>
                        <li>Menos reuniones, más avances</li>
                    </ul>
                </div>

                <div className="login-form-card">
                    <div className="login-form-header">
                        <p>Qué bueno verte</p>
                        <h2>Inicia sesión</h2>
                        <p>Continúa donde lo dejaste con tu equipo.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Correo</label>
                        <input type="email" id="email" value={email} onChange={(e) => handleChange(e, setEmail)} placeholder="tucorreo@email.com" />

                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" value={contrasena} onChange={(e) => handleChange(e, setContrasena)} placeholder="••••••••" />


                        {error && <p>{error}</p>}
                        <button type="submit" disabled={loading} >{loading ? 'Iniciando sesión...' : 'Iniciar sesión'}</button>

                        
                    </form>

                    <div>
                        o continúa con  
                    </div>

                    <button onClick={handleGoogleAccess}>Google</button>

                </div>
            </div>
        </>
    )
}