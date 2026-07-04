
export const ESTADOS_PEDIDO = [
    'PENDIENTE',
    'EN_RUTA',
    'ENTREGADO',
    'PARCIAL',
    'FALLIDO'
];

export const BADGE_ESTADO = {
    PENDIENTE:  { bg: '#fef9c3', color: '#854d0e' },
    EN_RUTA:    { bg: '#dbeafe', color: '#1d4ed8' },
    ENTREGADO:  { bg: '#dcfce7', color: '#166534' },
    PARCIAL:    { bg: '#ffedd5', color: '#9a3412' },
    FALLIDO:    { bg: '#fee2e2', color: '#991b1b' },
};


export const ESTADOS_ENTREGA = ['COMPLETA', 'PARCIAL', 'FALLIDA'];

export const BADGE_ESTADO_ENTREGA = {
    COMPLETA:  { bg: '#dcfce7', color: '#166534' },
    PARCIAL:   { bg: '#ffedd5', color: '#9a3412' },
    FALLIDA:   { bg: '#fee2e2', color: '#991b1b' },
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