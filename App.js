import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const W = Math.min(width, 480);

const C = {
  rosa: '#F9D5E5',
  rosaSuave: '#FFEAF2',
  lila: '#E4D9FF',
  lilaProfundo: '#8E7CC3',
  durazno: '#FFE3D3',
  menta: '#D6F3E8',
  cielo: '#D8EBFF',
  crema: '#FFF8FB',
  texto: '#5B4B63',
  acento: '#E27BA3',
};

const SERIF = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' });

const FOTOS = [
  require('./assets/foto1.png'),
  require('./assets/foto2.png'),
  require('./assets/foto3.png'),
  require('./assets/foto4.png'),
  require('./assets/foto5.png'),
];

const MENSAJE = [
  'Mi amor, las palabras se me quedan cortas para lograr expresar la dicha que han sido estos meses a tu lado. He vivido tantas cosas contigo durante todo este tiempo.',
  'Llegaste a mi vida de la forma más inesperada posible y te metiste en ella sin pedir permiso ni preguntar. Eso fue lo mejor que me pasó, porque conocí a una niña maravillosa que me ha hecho vivir lo que es ser amado de verdad.',
  'Este detalle solo es una muestra pequeña del inmenso amor que tengo por ti. Espero seguir construyendo nuestra historia juntos y que nunca faltes en mi vida.',
  '1 año contigo me ha hecho el ser humano más feliz del planeta.',
];

/* Corazón que flota; se repite en bucle */
function Corazon({ left, size, delay, duration, color }) {
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(y, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.quad),
        }),
      ])
    ).start();
  }, []);
  const translateY = y.interpolate({ inputRange: [0, 1], outputRange: [40, -260] });
  const opacity = y.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.8, 0.6, 0] });
  return (
    <Animated.Text
      style={{
        position: 'absolute',
        bottom: 20,
        left,
        fontSize: size,
        color,
        opacity,
        transform: [{ translateY }],
      }}
    >
      ♥
    </Animated.Text>
  );
}

function Polaroid({ source, rotate = '0deg', style }) {
  return (
    <View style={[styles.polaroid, { transform: [{ rotate }] }, style]}>
      <Image source={source} style={styles.polaroidImg} resizeMode="cover" />
      <Text style={styles.polaroidHeart}>♥</Text>
    </View>
  );
}

export default function App() {
  const entrada = useRef(new Animated.Value(0)).current;
  const latido = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(entrada, {
      toValue: 1,
      duration: 1100,
      easing: Easing.out(Easing.cubic),
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(latido, { toValue: 1.18, duration: 650 }),
        Animated.timing(latido, { toValue: 1, duration: 650 }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          {/* HERO */}
          <LinearGradient colors={[C.rosa, C.lila, C.cielo]} style={styles.hero}>
            <Corazon left={W * 0.1} size={22} delay={0} duration={5200} color="#fff" />
            <Corazon left={W * 0.3} size={14} delay={1600} duration={4600} color={C.acento} />
            <Corazon left={W * 0.55} size={26} delay={800} duration={5600} color="#fff" />
            <Corazon left={W * 0.75} size={16} delay={2400} duration={4800} color={C.lilaProfundo} />
            <Corazon left={W * 0.9 - 20} size={20} delay={3200} duration={5000} color="#fff" />

            <Animated.View
              style={{
                alignItems: 'center',
                opacity: entrada,
                transform: [
                  { translateY: entrada.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
                ],
              }}
            >
              <Text style={styles.feliz}>Feliz</Text>
              <Text style={styles.once}>once meses</Text>
              <Animated.Text style={[styles.heroHeart, { transform: [{ scale: latido }] }]}>
                ♥
              </Animated.Text>
              <Text style={styles.paraHilary}>para Hilary</Text>
            </Animated.View>
          </LinearGradient>

          {/* FOTO PRINCIPAL */}
          <View style={styles.arcoWrap}>
            <View style={styles.arco}>
              <Image source={FOTOS[0]} style={styles.arcoImg} resizeMode="cover" />
            </View>
          </View>

          {/* MENSAJE */}
          <View style={styles.cartaWrap}>
            <LinearGradient colors={[C.crema, C.rosaSuave]} style={styles.carta}>
              <Text style={styles.cartaComilla}>“</Text>
              {MENSAJE.map((p, i) => (
                <Text
                  key={i}
                  style={[styles.cartaTexto, i === MENSAJE.length - 1 && styles.cartaDestacado]}
                >
                  {p}
                </Text>
              ))}
              <Text style={styles.te_amo}>Te amo ♥</Text>
            </LinearGradient>
          </View>

          {/* GALERÍA */}
          <Text style={styles.galeriaTitulo}>Nuestros momentos</Text>
          <View style={styles.galeria}>
            <Polaroid source={FOTOS[1]} rotate="-3deg" style={{ backgroundColor: C.rosaSuave }} />
            <Polaroid source={FOTOS[2]} rotate="2.5deg" style={{ backgroundColor: '#F1ECFF' }} />
            <Polaroid source={FOTOS[3]} rotate="-2deg" style={{ backgroundColor: C.durazno }} />
            <Polaroid source={FOTOS[4]} rotate="3deg" style={{ backgroundColor: C.menta }} />
          </View>

          {/* CIERRE */}
          <LinearGradient colors={[C.cielo, C.lila, C.rosa]} style={styles.cierre}>
            <Text style={styles.cierreTexto}>Que nunca falte{'\n'}nuestra historia</Text>
            <Animated.Text style={[styles.cierreHeart, { transform: [{ scale: latido }] }]}>
              ♥
            </Animated.Text>
            <Text style={styles.cierreFirma}>Feliz once meses, mi amor</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.crema },
  scroll: { alignItems: 'center' },
  column: { width: W, backgroundColor: C.crema },

  hero: {
    height: 420,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    overflow: 'hidden',
  },
  feliz: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 34,
    color: C.texto,
    letterSpacing: 1,
  },
  once: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontWeight: '700',
    fontSize: 56,
    color: '#fff',
    shadowColor: 'rgba(142,124,195,0.55)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    marginTop: -4,
  },
  heroHeart: { fontSize: 38, color: C.acento, marginVertical: 10 },
  paraHilary: { fontFamily: SERIF, fontSize: 20, color: C.texto, letterSpacing: 2 },

  arcoWrap: { alignItems: 'center', marginTop: -70 },
  arco: {
    width: W * 0.72,
    height: W * 0.95,
    borderTopLeftRadius: W,
    borderTopRightRadius: W,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: C.rosa,
    shadowColor: C.lilaProfundo,
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  arcoImg: { width: '100%', height: '100%' },

  cartaWrap: { paddingHorizontal: 22, marginTop: 40 },
  carta: {
    borderRadius: 32,
    paddingHorizontal: 26,
    paddingTop: 10,
    paddingBottom: 30,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: C.acento,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  cartaComilla: { fontFamily: SERIF, fontSize: 70, color: C.acento, height: 56 },
  cartaTexto: {
    fontFamily: SERIF,
    fontSize: 17,
    lineHeight: 28,
    color: C.texto,
    marginTop: 14,
  },
  cartaDestacado: {
    fontStyle: 'italic',
    fontWeight: '700',
    color: C.lilaProfundo,
    fontSize: 19,
  },
  te_amo: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 30,
    color: C.acento,
    textAlign: 'right',
    marginTop: 22,
  },

  galeriaTitulo: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 28,
    color: C.texto,
    textAlign: 'center',
    marginTop: 54,
    marginBottom: 20,
  },
  galeria: { alignItems: 'center', paddingBottom: 20 },
  polaroid: {
    width: W * 0.8,
    padding: 10,
    paddingBottom: 30,
    borderRadius: 14,
    marginBottom: 26,
    shadowColor: C.texto,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  polaroidImg: { width: '100%', height: W * 0.8 * 1.1, borderRadius: 8 },
  polaroidHeart: {
    position: 'absolute',
    bottom: 6,
    alignSelf: 'center',
    fontSize: 18,
    color: C.acento,
  },

  cierre: {
    marginTop: 20,
    paddingVertical: 60,
    alignItems: 'center',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  cierreTexto: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 30,
    lineHeight: 40,
    color: C.texto,
    textAlign: 'center',
  },
  cierreHeart: { fontSize: 54, color: '#fff', marginVertical: 18 },
  cierreFirma: { fontFamily: SERIF, fontSize: 18, color: C.texto, letterSpacing: 1 },
});
