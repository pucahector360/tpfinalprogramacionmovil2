import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

const CATEGORIAS = [
  'Alimentación',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Otros',
];

// Formatea un número como pesos argentinos: 15000 -> $15.000
const formatearMonto = (numero) => {
  const entero = Math.round(numero);
  return '$' + entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default function App() {
  // Estado del formulario
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);

  // Estado de los datos
  const [gastos, setGastos] = useState([
    { id: 1, descripcion: 'Supermercado', monto: 15000, categoria: 'Alimentación' },
    { id: 2, descripcion: 'Nafta', monto: 20000, categoria: 'Transporte' },
    { id: 3, descripcion: 'Café', monto: 3500, categoria: 'Alimentación' },
  ]);

  // Estado del filtro ('Todas' muestra todo)
  const [filtro, setFiltro] = useState('Todas');

  // ---------- Acciones ----------
  const agregarGasto = () => {
    const montoNumero = parseFloat(monto.replace(',', '.'));

    if (descripcion.trim() === '') {
      Alert.alert('Falta la descripción', 'Escribí una descripción del gasto.');
      return;
    }
    if (isNaN(montoNumero) || montoNumero <= 0) {
      Alert.alert('Monto inválido', 'Ingresá un monto mayor a 0.');
      return;
    }

    const nuevoGasto = {
      id: Date.now(),
      descripcion: descripcion.trim(),
      monto: montoNumero,
      categoria: categoria,
    };

    setGastos([...gastos, nuevoGasto]);
    setDescripcion('');
    setMonto('');
  };

  const eliminarGasto = (id) => {
    setGastos(gastos.filter((gasto) => gasto.id !== id));
  };

  // ---------- Cálculos a partir de los datos ----------
  const gastosFiltrados =
    filtro === 'Todas'
      ? gastos
      : gastos.filter((gasto) => gasto.categoria === filtro);

  const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);
  const totalFiltrado = gastosFiltrados.reduce((suma, g) => suma + g.monto, 0);

  const gastoMasAlto =
    gastos.length > 0
      ? gastos.reduce((max, g) => (g.monto > max.monto ? g : max), gastos[0])
      : null;

  const totalPorCategoria = CATEGORIAS.map((cat) => ({
    categoria: cat,
    total: gastos
      .filter((g) => g.categoria === cat)
      .reduce((suma, g) => suma + g.monto, 0),
  }));

  // ---------- Interfaz ----------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>💰 Mis Gastos</Text>

        {/* Resumen */}
        <View style={styles.cardTotal}>
          <Text style={styles.totalLabel}>Total gastado</Text>
          <Text style={styles.totalMonto}>{formatearMonto(total)}</Text>
          <Text style={styles.totalExtra}>
            Cantidad de gastos: {gastos.length}
          </Text>
          {gastoMasAlto && (
            <Text style={styles.totalExtra}>
              Gasto más alto: {gastoMasAlto.descripcion} (
              {formatearMonto(gastoMasAlto.monto)})
            </Text>
          )}
        </View>

        {/* Formulario */}
        <View style={styles.card}>
          <Text style={styles.seccion}>Agregar gasto</Text>

          <TextInput
            style={styles.input}
            placeholder="Descripción (ej: Supermercado)"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TextInput
            style={styles.input}
            placeholder="Monto (ej: 15000)"
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />

          <Text style={styles.label}>Categoría</Text>
          <View style={styles.chips}>
            {CATEGORIAS.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, categoria === cat && styles.chipActivo]}
                onPress={() => setCategoria(cat)}
              >
                <Text
                  style={[
                    styles.chipTexto,
                    categoria === cat && styles.chipTextoActivo,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.botonAgregar} onPress={agregarGasto}>
            <Text style={styles.botonAgregarTexto}>Agregar gasto</Text>
          </TouchableOpacity>
        </View>

        {/* Gasto por categoría */}
        <View style={styles.card}>
          <Text style={styles.seccion}>Gasto por categoría</Text>
          {totalPorCategoria.map((item) => (
            <View key={item.categoria} style={styles.filaCategoria}>
              <Text style={styles.categoriaNombre}>{item.categoria}</Text>
              <Text style={styles.categoriaMonto}>
                {formatearMonto(item.total)}
              </Text>
            </View>
          ))}
        </View>

        {/* Lista con filtro */}
        <View style={styles.card}>
          <Text style={styles.seccion}>Mis gastos</Text>

          <Text style={styles.label}>Filtrar por categoría</Text>
          <View style={styles.chips}>
            {['Todas', ...CATEGORIAS].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, filtro === cat && styles.chipActivo]}
                onPress={() => setFiltro(cat)}
              >
                <Text
                  style={[
                    styles.chipTexto,
                    filtro === cat && styles.chipTextoActivo,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {filtro !== 'Todas' && (
            <Text style={styles.subtotal}>
              Total en {filtro}: {formatearMonto(totalFiltrado)}
            </Text>
          )}

          {gastosFiltrados.length === 0 ? (
            <Text style={styles.vacio}>No hay gastos para mostrar.</Text>
          ) : (
            gastosFiltrados.map((gasto) => (
              <View key={gasto.id} style={styles.gastoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.gastoDescripcion}>
                    {gasto.descripcion}
                  </Text>
                  <Text style={styles.gastoDetalle}>
                    {formatearMonto(gasto.monto)} - {gasto.categoria}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.botonEliminar}
                  onPress={() => eliminarGasto(gasto.id)}
                >
                  <Text style={styles.botonEliminarTexto}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  scroll: { padding: 16, paddingBottom: 40 },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  cardTotal: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  totalLabel: { color: '#BFDBFE', fontSize: 14 },
  totalMonto: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  totalExtra: { color: '#DBEAFE', fontSize: 14, marginTop: 2 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  seccion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  label: { fontSize: 13, color: '#64748B', marginBottom: 6, marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#F8FAFC',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActivo: { backgroundColor: '#2563EB' },
  chipTexto: { color: '#334155', fontSize: 14 },
  chipTextoActivo: { color: '#FFFFFF', fontWeight: '600' },
  botonAgregar: {
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  botonAgregarTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  filaCategoria: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  categoriaNombre: { fontSize: 15, color: '#334155' },
  categoriaMonto: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  subtotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 8,
  },
  vacio: { textAlign: 'center', color: '#94A3B8', paddingVertical: 20 },
  gastoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  gastoDescripcion: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  gastoDetalle: { fontSize: 14, color: '#64748B', marginTop: 2 },
  botonEliminar: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonEliminarTexto: { color: '#DC2626', fontWeight: '600' },
});