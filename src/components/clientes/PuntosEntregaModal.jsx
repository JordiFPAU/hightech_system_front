import React, { useEffect, useState, useCallback } from 'react';
import { getPuntosEntrega, createPuntoEntrega, deletePuntoEntrega } from '../../api/logisticaApi';
import styles from '../categorias/CategoriasView.module.css';
import puntoStyles from './PuntosEntregaModal.module.css';

const FORM_INICIAL = {
    descripcion: '',
    direccionTexto: '',
    latitud: '',
    longitud: '',
    esPrincipal: false
};

export default function PuntosEntregaModal({ abierto, cliente, onCerrar }) {
    const [puntos, setPuntos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [form, setForm] = useState(FORM_INICIAL);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);



    const cargarPuntos = useCallback(async () => {
        try {
            setCargando(true);
            const res = await getPuntosEntrega(cliente.id);
            setPuntos(res.data);
        } catch {
            setError('No se pudieron cargar los puntos de entrega.');
        } finally {
            setCargando(false);
        }
    }, [cliente]);

    useEffect(() => {
        if (abierto && cliente) {
            cargarPuntos();
        }
    }, [abierto, cliente, cargarPuntos]);

    const manejarCrear = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setError(null);

        try {
            await createPuntoEntrega({
                clienteId: cliente.id,
                descripcion: form.descripcion,
                direccionTexto: form.direccionTexto,
                latitud: Number(form.latitud),
                longitud: Number(form.longitud),
                esPrincipal: form.esPrincipal
            });
            setForm(FORM_INICIAL);
            setMostrarForm(false);
            cargarPuntos();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar el punto de entrega.');
        } finally {
            setGuardando(false);
        }
    };

    const manejarEliminar = async (id) => {
        try {
            await deletePuntoEntrega(id);
            cargarPuntos();
        } catch {
            setError('No se pudo eliminar el punto de entrega.');
        }
    };

    if (!abierto || !cliente) return null;

    return (
        <div className={styles.overlay}>
            <div className={puntoStyles.modal}>
                <div className={styles.modalHeader}>
                    <div>
                        <h2 className={styles.modalTitulo}>Puntos de entrega</h2>
                        <p className={puntoStyles.clienteNombre}>{cliente.nombre}</p>
                    </div>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                {/* Lista de puntos */}
                {cargando ? (
                    <p className={styles.cargando}>Cargando puntos...</p>
                ) : puntos.length === 0 ? (
                    <p className={puntoStyles.sinPuntos}>
                        Este cliente no tiene puntos de entrega registrados
                    </p>
                ) : (
                    <div className={puntoStyles.listaPuntos}>
                        {puntos.map(punto => (
                            <div key={punto.id} className={puntoStyles.puntoItem}>
                                <div className={puntoStyles.puntoInfo}>
                                    <div className={puntoStyles.puntoHeader}>
                                        <p className={puntoStyles.puntoDescripcion}>
                                            {punto.descripcion || 'Sin descripción'}
                                        </p>
                                        {punto.esPrincipal && (
                                            <span className={puntoStyles.badgePrincipal}>
                                                Principal
                                            </span>
                                        )}
                                    </div>
                                    <p className={puntoStyles.puntoDireccion}>
                                        {punto.direccionTexto}
                                    </p>
                                    {punto.latitud && (
                                        <p className={puntoStyles.puntoCoordenadas}>
                                            {punto.latitud}, {punto.longitud}
                                        </p>
                                    )}
                                </div>
                                <button
                                    className={styles.botonEliminar}
                                    onClick={() => manejarEliminar(punto.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Formulario nuevo punto */}
                {mostrarForm ? (
                    <form onSubmit={manejarCrear} className={puntoStyles.formNuevo}>
                        <p className={puntoStyles.formTitulo}>Nuevo punto de entrega</p>
                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Descripción</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Ej: Oficina principal"
                                value={form.descripcion}
                                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                            />
                        </div>
                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Dirección *</label>
                            <input
                                type="text"
                                required
                                className={styles.input}
                                placeholder="Ej: Av. Amazonas y Naciones Unidas"
                                value={form.direccionTexto}
                                onChange={e => setForm({ ...form, direccionTexto: e.target.value })}
                            />
                        </div>
                        <div className={puntoStyles.filaCoordenadas}>
                            <div className={styles.campo}>
                                <label className={styles.etiqueta}>Latitud *</label>
                                <input
                                    type="number"
                                    required
                                    step="any"
                                    className={styles.input}
                                    placeholder="-0.1807"
                                    value={form.latitud}
                                    onChange={e => setForm({ ...form, latitud: e.target.value })}
                                />
                            </div>
                            <div className={styles.campo}>
                                <label className={styles.etiqueta}>Longitud *</label>
                                <input
                                    type="number"
                                    required
                                    step="any"
                                    className={styles.input}
                                    placeholder="-78.4678"
                                    value={form.longitud}
                                    onChange={e => setForm({ ...form, longitud: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={styles.campo}>
                            <label className={puntoStyles.checkLabel}>
                                <input
                                    type="checkbox"
                                    checked={form.esPrincipal}
                                    onChange={e => setForm({ ...form, esPrincipal: e.target.checked })}
                                />
                                Marcar como punto principal
                            </label>
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.botonSecundario}
                                onClick={() => setMostrarForm(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={styles.botonPrimario}
                                disabled={guardando}
                            >
                                {guardando ? 'Guardando...' : 'Agregar punto'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        className={styles.botonPrimario}
                        style={{ marginTop: '16px', width: '100%' }}
                        onClick={() => setMostrarForm(true)}
                    >
                        + Agregar punto de entrega
                    </button>
                )}
            </div>
        </div>
    );
}