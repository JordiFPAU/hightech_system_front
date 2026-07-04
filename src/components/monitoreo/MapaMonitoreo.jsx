import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapaMonitoreo.module.css';

// Fix del ícono de Leaflet con React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const crearIconoRepartidor = (nombre) => {
    const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return L.divIcon({
        className: '',
        html: `<div class="marcador-repartidor">${iniciales}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

// Componente para centrar el mapa cuando hay ubicaciones
function CentrarMapa({ ubicaciones }) {
    const mapa = useMap();

    useEffect(() => {
        const coords = Object.values(ubicaciones);
        if (coords.length === 1) {
            mapa.setView([coords[0].latitud, coords[0].longitud], 14);
        } else if (coords.length > 1) {
            const bounds = L.latLngBounds(
                coords.map(u => [u.latitud, u.longitud])
            );
            mapa.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [ubicaciones, mapa]);

    return null;
}

export default function MapaMonitoreo({ repartidores, ubicaciones }) {
    const repartidoresMap = {};
    repartidores.forEach(r => {
        repartidoresMap[r.id] = `${r.nombre} ${r.apellido}`;
    });

    // Centro de Quito por defecto
    const centroQuito = [-0.1807, -78.4678];

    return (
        <div className={styles.contenedorMapa}>
            <style>{`
                .marcador-repartidor {
                    width: 40px;
                    height: 40px;
                    background-color: #0ea5e9;
                    border: 3px solid #ffffff;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                }
                .marcador-repartidor span {
                    transform: rotate(45deg);
                    color: white;
                    font-size: 12px;
                    font-weight: 600;
                }
            `}</style>

            <MapContainer
                center={centroQuito}
                zoom={12}
                className={styles.mapa}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CentrarMapa ubicaciones={ubicaciones} />

                {Object.entries(ubicaciones).map(([repartidorId, ubicacion]) => {
                    const nombre = repartidoresMap[repartidorId] || 'Repartidor';
                    return (
                        <Marker
                            key={repartidorId}
                            position={[ubicacion.latitud, ubicacion.longitud]}
                            icon={crearIconoRepartidor(nombre)}
                        >
                            <Popup>
                                <div className={styles.popup}>
                                    <p className={styles.popupNombre}>{nombre}</p>
                                    <p className={styles.popupCoords}>
                                        {ubicacion.latitud.toFixed(6)}, {ubicacion.longitud.toFixed(6)}
                                    </p>
                                    <p className={styles.popupFecha}>
                                        Última actualización:{' '}
                                        {new Date(ubicacion.ultimaActualizacion).toLocaleTimeString('es-EC')}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}