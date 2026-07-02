import React from 'react';
import styles from '../categorias/CategoriasView.module.css';
import productoStyles from './ProductosTabla.module.css';

export default function ProductosTabla({ productos, onEditar, onEliminar , onAjustarStock}) {
    const getBadgeStock = (stockActual, stockMinimo) => {
        if (stockActual <= stockMinimo) return productoStyles.badgeDanger;
        if (stockActual <= stockMinimo * 1.5) return productoStyles.badgeWarning;
        return productoStyles.badgeSuccess;
    };

    return (
        <div className={styles.tablaContenedor}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Categoría</th>
                        <th>Precio venta</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? (
                        <tr>
                            <td colSpan={7} className={styles.sinDatos}>
                                No hay productos registrados
                            </td>
                        </tr>
                    ) : (
                        productos.map(prod => (
                            <tr key={prod.id}>
                                <td className={styles.nombreCell}>{prod.nombre}</td>
                                <td>{prod.codigoMarca || '—'}</td>
                                <td>{prod.categoria?.nombre || '—'}</td>
                                <td>${Number(prod.precioVenta).toFixed(2)}</td>
                                <td>
                                    <span className={`${productoStyles.badgeStock} ${getBadgeStock(prod.stockActual, prod.stockMinimo)}`}>
                                        {prod.stockActual} / {prod.stockMinimo}
                                    </span>
                                </td>
                                <td>
                                    <span className={prod.activo
                                        ? styles.badgeActivo
                                        : styles.badgeInactivo}>
                                        {prod.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.acciones}>
                                        <button
                                            className={styles.botonEditar}
                                            onClick={() => onEditar(prod)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={productoStyles.botonStock}
                                            onClick={() => onAjustarStock(prod)}
                                        >
                                            Stock
                                        </button>

                                        <button
                                            className={styles.botonEliminar}
                                            onClick={() => onEliminar(prod)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}