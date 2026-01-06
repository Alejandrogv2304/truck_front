import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Tipos para los datos del informe
type DetalleViaje = {
  id_viaje: number;
  num_manifiesto: string;
  lugar_origen: string;
  lugar_destino: string;
  fecha_inicio: string;
  camion: string;
  conductor: string;
  valor_viaje: number;
  gastos_viaje: number;
  gastos_camion: number;
  balance_viaje: number;
};

type DatosInforme = {
  mes: string;
  anio: number;
  total_viajes: number;
  ingresos_totales: number;
  egresos_totales: number;
  balance_total: number;
  detalle_viajes: DetalleViaje[];
};

// Estilos del PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#166534',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 10,
    backgroundColor: '#dcfce7',
    padding: 5,
  },
  resumenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 5,
  },
  resumenItem: {
    flex: 1,
    alignItems: 'center',
  },
  resumenLabel: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
  },
  resumenValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  resumenValuePositive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#166534',
  },
  resumenValueNegative: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#166534',
    padding: 8,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
    backgroundColor: '#ffffff',
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
    backgroundColor: '#f9fafb',
  },
  tableCell: {
    fontSize: 8,
    flex: 1,
  },
  tableCellHeader: {
    fontSize: 9,
    flex: 1,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 8,
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
});

// Función para formatear moneda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
};

// Función para formatear fecha
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface InformePDFProps {
  datos: DatosInforme;
}

export const InformePDF = ({ datos }: InformePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Informe de Operaciones</Text>
        <Text style={styles.subtitle}>{datos.mes} de {datos.anio}</Text>
        <Text style={styles.subtitle}>
          Generado: {new Date().toLocaleDateString('es-CO')}
        </Text>
      </View>

      {/* Resumen General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen General</Text>
        <View style={styles.resumenContainer}>
          <View style={styles.resumenItem}>
            <Text style={styles.resumenLabel}>Total Viajes</Text>
            <Text style={styles.resumenValue}>{datos.total_viajes}</Text>
          </View>
          <View style={styles.resumenItem}>
            <Text style={styles.resumenLabel}>Ingresos Totales</Text>
            <Text style={styles.resumenValuePositive}>
              {formatCurrency(datos.ingresos_totales)}
            </Text>
          </View>
          <View style={styles.resumenItem}>
            <Text style={styles.resumenLabel}>Egresos Totales</Text>
            <Text style={styles.resumenValueNegative}>
              {formatCurrency(datos.egresos_totales)}
            </Text>
          </View>
          <View style={styles.resumenItem}>
            <Text style={styles.resumenLabel}>Balance Total</Text>
            <Text style={datos.balance_total >= 0 ? styles.resumenValuePositive : styles.resumenValueNegative}>
              {formatCurrency(datos.balance_total)}
            </Text>
          </View>
        </View>
      </View>

      {/* Detalle de Viajes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalle de Viajes</Text>
        
        <View style={styles.table}>
          {/* Header de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Manifiesto</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.6 }]}>Fecha</Text>
            <Text style={[styles.tableCellHeader, { flex: 1 }]}>Origen</Text>
            <Text style={[styles.tableCellHeader, { flex: 1 }]}>Destino</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.6 }]}>Camión</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Conductor</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Ingresos</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Gastos</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Balance</Text>
          </View>

          {/* Filas de datos */}
          {datos.detalle_viajes.map((viaje, index) => (
            <View key={viaje.id_viaje} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{viaje.num_manifiesto}</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>
                {new Date(viaje.fecha_inicio).toLocaleDateString('es-CO', { month: '2-digit', day: '2-digit' })}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{viaje.lugar_origen}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{viaje.lugar_destino}</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>{viaje.camion}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{viaje.conductor}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{formatCurrency(viaje.valor_viaje)}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{formatCurrency(viaje.gastos_viaje + viaje.gastos_camion)}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{formatCurrency(viaje.balance_viaje)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Este documento fue generado automáticamente por el Sistema de Gestión de Camiones</Text>
      </View>
    </Page>
  </Document>
);
