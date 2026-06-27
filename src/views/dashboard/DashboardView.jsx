import React, {useEffect, useState, useContext} from "react"; 
import { AuthContext } from "../../context/AuthContext";
import { inventarioApi, logisticaApi, authApi } from '../../api/axiosInstance';
import styles from "./DashboardView.module.css";

export default function DashboardView() {
    const { usuario } = useContext(AuthContext);

    const [metricas, setMetricas] = useState({
        totalProductos: 0,
        stockCritico: 0,
        pedidosHoy: 0,
        pedidosUrgentes: 0,
        entregasHoy: 0,
        totalClientes: 0,
    });

    const [pedidosRecientes, setPedidosRecientes] = useState([]);
    const [alertasStock, setAlertasStock] = useState([]);
    const [cargando, setCargando] = useState(true);

    const fechaHoy = new Date().toLocaleDateString('es-EC', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [productos, stockCritico, pedidos, clientes, alertas, entregas] =
                await Promise.all([
                    inventarioApi.get('/productos'),
                    inventarioApi.get('/productos/stockCritico'),
                    logisticaApi.get('/pedidos'),
                    logisticaApi.get('/clientes'),
                    inventarioApi.get('/alertas/no-leidas'),
                    logisticaApi.get('/entregas/repartidor/00000000-0000-0000-0000-000000000000')
                        .catch(() => ({ data: [] })),
                ]);

            const pedidosUrgentes = pedidos.data.filter(p => p.esUrgente).length;
            const entregasCompletas = entregas.data.filter(e => e.estado === 'COMPLETA').length;

            setMetricas({
                totalProductos: productos.data.length,
                stockCritico: stockCritico.data.length,
                pedidosHoy: pedidos.data.length,
                pedidosUrgentes,
                entregasHoy: entregasCompletas,
                totalClientes: clientes.data.length,
            });

            setPedidosRecientes(pedidos.data.slice(0, 5));
            setAlertasStock(alertas.data.slice(0, 3));

        } catch (error) {
            console.error('Error cargando dashboard:', error);
        } finally {
            setCargando(false);
        }
    };

    const getBadgeEstado = (estado) => {
        const mapa = {
            PENDIENTE: styles.badgeWarning,
            EN_RUTA: styles.badgeAccent,
            ENTREGADO: styles.badgeSuccess,
            PARCIAL: styles.badgeWarning,
            FALLIDO: styles.badgeDanger,
        };
        return mapa[estado] || styles.badgeWarning;
    };

    const getPorcentajeStock = (stockActual, stockMinimo) => {
        if (stockMinimo === 0) return 0;
        return Math.min((stockActual / stockMinimo) * 100, 100);
    };

    const getColorBarra = (porcentaje) => {
        if (porcentaje <= 30) return styles.barraRoja;
        if (porcentaje <= 70) return styles.barraAmarilla;
        return styles.barraVerde;
    };

    if (cargando) {
        return (
            <div className={styles.cargando}>
                <p>Cargando dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.contenedor}>

            {/* Encabezado */}
            <div className={styles.encabezado}>
                <h1 className={styles.titulo}>Dashboard</h1>
                <p className={styles.fecha}>{fechaHoy}</p>
            </div>

            {/* Métricas */}
            <div className={styles.metricas}>
                <div className={styles.metricaCard}>
                    <p className={styles.metricaLabel}>Productos</p>
                    <p className={styles.metricaValor}>{metricas.totalProductos.toLocaleString()}</p>
                    <span className={`${styles.badge} ${styles.badgeWarning}`}>
                        {metricas.stockCritico} en stock crítico
                    </span>
                </div>
                <div className={styles.metricaCard}>
                    <p className={styles.metricaLabel}>Pedidos hoy</p>
                    <p className={styles.metricaValor}>{metricas.pedidosHoy}</p>
                    <span className={`${styles.badge} ${styles.badgeAccent}`}>
                        {metricas.pedidosUrgentes} urgentes
                    </span>
                </div>
                <div className={styles.metricaCard}>
                    <p className={styles.metricaLabel}>Entregas completadas</p>
                    <p className={styles.metricaValor}>{metricas.entregasHoy}</p>
                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                        completadas
                    </span>
                </div>
                <div className={styles.metricaCard}>
                    <p className={styles.metricaLabel}>Clientes</p>
                    <p className={styles.metricaValor}>{metricas.totalClientes}</p>
                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                        activos
                    </span>
                </div>
            </div>

            {/* Fila principal */}
            <div className={styles.filaPrincipal}>

                {/* Pedidos recientes */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitulo}>Órdenes recientes</h2>
                        <a href="/pedidos" className={styles.cardLink}>Ver todas →</a>
                    </div>
                    <table className={styles.tabla}>
                        <thead>
                            <tr>
                                <th>Factura</th>
                                <th>Cliente</th>
                                <th>Estado</th>
                                <th>Productos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosRecientes.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className={styles.sinDatos}>
                                        No hay pedidos registrados
                                    </td>
                                </tr>
                            ) : (
                                pedidosRecientes.map(pedido => (
                                    <tr key={pedido.id}>
                                        <td>{pedido.numeroFactura || '—'}</td>
                                        <td>{pedido.cliente?.nombre || '—'}</td>
                                        <td>
                                            <span className={`${styles.badge} ${getBadgeEstado(pedido.estado)}`}>
                                                {pedido.estado}
                                            </span>
                                        </td>
                                        <td>{pedido.detalles?.length || 0}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Columna derecha */}
                <div className={styles.columnaLateral}>

                    {/* Alertas de stock */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitulo}>Alertas de stock</h2>
                            {alertasStock.length > 0 && (
                                <span className={`${styles.badge} ${styles.badgeDanger}`}>
                                    {metricas.stockCritico} nuevas
                                </span>
                            )}
                        </div>
                        {alertasStock.length === 0 ? (
                            <p className={styles.sinDatos}>Sin alertas pendientes</p>
                        ) : (
                            alertasStock.map(alerta => {
                                const porcentaje = getPorcentajeStock(
                                    alerta.stockAlMomento,
                                    alerta.stockMinimo
                                );
                                return (
                                    <div key={alerta.id} className={styles.alertaItem}>
                                        <div className={styles.alertaInfo}>
                                            <p className={styles.alertaNombre}>
                                                {alerta.productoNombre}
                                            </p>
                                            <p className={styles.alertaStock}>
                                                Stock: {alerta.stockAlMomento} / Mínimo: {alerta.stockMinimo}
                                            </p>
                                        </div>
                                        <div className={styles.barraContenedor}>
                                            <div
                                                className={`${styles.barra} ${getColorBarra(porcentaje)}`}
                                                style={{ width: `${porcentaje}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Placeholder mapa */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitulo}>Mapa en tiempo real</h2>
                            <a href="/monitoreo" className={styles.cardLink}>Abrir →</a>
                        </div>
                        <div className={styles.mapaPlaceholder}>
                            <span className={styles.mapaIcono}></span>
                            <p className={styles.mapaTexto}>
                                Mapa de Quito con repartidores en tiempo real
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}