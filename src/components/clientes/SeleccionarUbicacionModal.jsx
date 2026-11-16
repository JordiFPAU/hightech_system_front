import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '../categorias/CategoriasView.module.css';
import mapaStyles from './SeleccionarUbicacionModal.module.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function CapturarClick({ onSeleccionar }) {
    useMapEvents({
        click(e) {
            onSeleccionar(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function SeleccionarUbicacionModal({ abierto, onConfirmar, onCerrar }) {
    const [marcador, setMarcador] = useState(null);
    const centroQuito = [-0.1807, -78.4678];

    if (!abierto) return null;

    const manejarSeleccion = (lat, lng) => {
        setMarcador({ lat, lng });
    };

    const manejarConfirmar = () => {
        if (!marcador) return;
        onConfirmar(marcador.lat, marcador.lng);
        onCerrar();
    };

    return (
        <div className={styles.overlay}>
            <div className={mapaStyles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>Seleccionar punto de entrega</h2>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                <p className={mapaStyles.instruccion}>
                    Haz click en el mapa para seleccionar la ubicación
                </p>

                {marcador && (
                    <p className={mapaStyles.coordenadas}>
                        {marcador.lat.toFixed(6)}, {marcador.lng.toFixed(6)}
                    </p>
                )}

                <div className={mapaStyles.contenedorMapa}>
                    <MapContainer
                        center={centroQuito}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <CapturarClick onSeleccionar={manejarSeleccion} />
                        {marcador && (
                            <Marker position={[marcador.lat, marcador.lng]} />
                        )}
                    </MapContainer>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.botonSecundario} onClick={onCerrar}>
                        Cancelar
                    </button>
                    <button
                        className={styles.botonPrimario}
                        onClick={manejarConfirmar}
                        disabled={!marcador}
                    >
                        Confirmar ubicación
                    </button>
                </div>
            </div>
        </div>
    );
}