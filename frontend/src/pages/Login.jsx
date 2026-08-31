import { Link, useNavigate } from "react-router-dom"
import '../styles/Login.css'
import { useState } from "react"
import googleIcon from '../assets/google-icon.svg'

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
                    <h1>El trabajo en <br /> equipo, más claro.</h1>
                    <p>Coordina proyectos, reparte tareas y llega a cada <br /> entrega con todo bajo control.</p>

                    <ul className="login-info-list">
                        <li><i class="fa-solid fa-circle-check"></i> Un solo espacio para cada proyecto</li>
                        <li><i class="fa-solid fa-circle-check"></i> Menos reuniones, más avances</li>
                    </ul>
                </div>

                <div className="login-form-card">
                    <div className="login-form-header">
                        <p className="login-form-header-short-message">Qué bueno verte</p>
                        <h2>Inicia sesión</h2>
                        <p className="login-form-header-desc">Continúa donde lo dejaste con tu equipo.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Correo</label>
                            <input type="email" id="email" value={email} onChange={(e) => handleChange(e, setEmail)} placeholder="tucorreo@email.com" />
                        </div>
                       
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" value={contrasena} onChange={(e) => handleChange(e, setContrasena)} placeholder="••••••••" />
                        </div>
                        


                        {error && <p>{error}</p>}
                        <button type="submit" disabled={loading} >{loading ? 'Iniciando sesión...' : 'Iniciar sesión'}<i class="fa-solid fa-arrow-right"></i></button>

                        
                    </form>

                    <div className="divisor-div">
                        <p>o continúa con </p> 
                    </div>

                    <button onClick={handleGoogleAccess} className="google-access-btn"><img src={googleIcon} alt="Google-icon" /> Google</button>

                </div>
            </div>
        </>
    )
}