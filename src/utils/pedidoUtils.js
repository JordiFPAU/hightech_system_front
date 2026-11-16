
export const ESTADOS_PEDIDO = [
    'PENDIENTE',
    'EN_RUTA',
    'ENTREGADO',
    'PARCIAL',
    'FALLIDO'
];

export const BADGE_ESTADO = {
    PENDIENTE:  { bg: 'transparent', color: '#d97706' },
    EN_RUTA:    { bg: 'transparent', color: '#0ea5e9' },
    ENTREGADO:  { bg: 'transparent', color: '#16a34a' },
    PARCIAL:    { bg: 'transparent', color: '#ea580c' },
    FALLIDO:    { bg: 'transparent', color: '#dc2626' },
};


export const ESTADOS_ENTREGA = ['COMPLETA', 'PARCIAL', 'FALLIDA'];

export const BADGE_ESTADO_ENTREGA = {
    COMPLETA:  { bg: 'transparent', color: '#16a34a' },
    PARCIAL:   { bg: 'transparent', color: '#ea580c' },
    FALLIDA:   { bg: 'transparent', color: '#dc2626' },
};


export const METODOS_PAGO = ['Efectivo', 'Transferencia', 'Tarjeta', 'Cheque'];

export const getBadgeEstilo = (estado) =>
    BADGE_ESTADO[estado] || BADGE_ESTADO.PENDIENTE;

export const getBadgeEstiloEntrega = (estado) =>
    BADGE_ESTADO_ENTREGA[estado] || BADGE_ESTADO_ENTREGA.COMPLETA;

export const formatearFecha = (fecha) => {
    if (!fecha) return '—';
    return new Date(fecha).toLocaleDateString('es-EC', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const calcularTotalPedido = (detalles = []) =>
    detalles.reduce((acc, d) =>
        acc + (Number(d.precioUnitario) * d.cantidadSolicitada), 0
    );