import React, { useState } from 'react';
import { loginRequest } from '../../api/authApi'; 
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './LoginView.module.css';

export default function LoginView() {
  const { iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const data = await loginRequest(email, password);
      console.log('¡Login exitoso!', data);
      iniciarSesion(data.token, data.usuario);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error en el login:', err);
      setError(err.response?.data?.error || 'No se pudo conectar con el servidor backend.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Iniciar Sesión</h2>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={manejarLogin}>
        
        <div className={styles.grupoInput}>
          <label className={styles.etiqueta}>Correo Electrónico:</label>
          <input
            type="email"
            required
            className={styles.input}
            placeholder="correo@ejemplo.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className={styles.grupoInput}>
          <label className={styles.etiqueta}>Contraseña:</label>
          <input
            type="password"
            required
            className={styles.input}
            placeholder="••••••••"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button
          type="submit"
          disabled={cargando} 
          className={styles.boton}
        >
          {cargando ? 'Cargando...' : 'Ingresar'}
        </button>

      </form>
    </div>
  );
}