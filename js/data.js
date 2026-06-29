const ROUTINE = {
  dayA: {
    id: 'dayA',
    name: 'Dia 1',
    subtitle: 'Pierna + Pull',
    exercises: [
      {
        id: 'zancada_estatica',
        name: 'Zancada estatica',
        sets: 4,
        repsTarget: '6-8 cada pierna',
        rest: 120,
        material: '15 kg cada mano + banda loop 15 kg',
        notes: 'Pie trasero en banquito. Baja hasta que rodilla trasera casi toque suelo.'
      },
      {
        id: 'dominadas_prono',
        name: 'Dominadas (prono)',
        sets: 5,
        repsTarget: 'max (apunta total)',
        rest: 120,
        material: 'Peso corporal',
        notes: 'Agarre prono a anchura de hombros. Baja del todo, sube barbilla por encima de barra.'
      },
      {
        id: 'peso_muerto_rumano_1p',
        name: 'Peso muerto rumano a 1 pierna',
        sets: 4,
        repsTarget: '8-10 cada pierna',
        rest: 90,
        material: '15 kg + banda loop 25 kg',
        notes: 'Pierna de apoyo ligeramente flexionada. Baja lento (3s), sube explosivo.'
      },
      {
        id: 'remo_1_mano',
        name: 'Remo a una mano',
        sets: 4,
        repsTarget: '8-10 cada brazo',
        rest: 90,
        material: '15 kg + banda loop 15 kg',
        notes: 'Apoyar mano y rodilla en banquito. Tirar codo hacia atras, apretar escapula.'
      },
      {
        id: 'face_pull',
        name: 'Face pull con banda',
        sets: 3,
        repsTarget: '15-20',
        rest: 60,
        material: 'Banda tubular',
        notes: 'Anclar banda a la altura de la cara. Tirar hacia atras abriendo codos.'
      },
      {
        id: 'plancha_a',
        name: 'Plancha abdominal',
        sets: 3,
        repsTarget: '45-60s',
        rest: 60,
        material: 'Peso corporal',
        notes: 'Cuerpo recto de cabeza a talones. Apretar abdomen y gluteos.'
      }
    ]
  },
  dayB: {
    id: 'dayB',
    name: 'Dia 2',
    subtitle: 'Pierna + Push',
    exercises: [
      {
        id: 'sentadilla_goblet',
        name: 'Sentadilla goblet profunda',
        sets: 4,
        repsTarget: '10-12',
        rest: 90,
        material: '15 kg + banda loop 35 kg pisada',
        notes: 'Mancuerna vertical pegada al pecho. Bajar todo lo que puedas con espalda recta.'
      },
      {
        id: 'press_suelo',
        name: 'Press de suelo',
        sets: 4,
        repsTarget: '8-12',
        rest: 90,
        material: '15 kg cada mano + banda loop por espalda',
        notes: 'Tumbado en suelo, codos tocan suelo abajo. Empujar arriba explosivo.'
      },
      {
        id: 'zancada_inversa',
        name: 'Zancada inversa',
        sets: 4,
        repsTarget: '8-10 cada pierna',
        rest: 90,
        material: '15 kg cada mano',
        notes: 'Paso atras, rodilla trasera casi toca suelo, volver a posicion inicial.'
      },
      {
        id: 'flexiones_elevadas',
        name: 'Flexiones pies elevados + banda',
        sets: 4,
        repsTarget: 'max',
        rest: 90,
        material: 'Pies en banquito + banda loop por espalda',
        notes: 'Pies en banquito, banda por la espalda. Bajar pecho al suelo, subir explosivo.'
      },
      {
        id: 'press_hombro',
        name: 'Press hombro de pie',
        sets: 3,
        repsTarget: '10-12',
        rest: 90,
        material: '10-15 kg cada mano',
        notes: 'De pie, empujar mancuernas arriba sin arquear espalda.'
      },
      {
        id: 'crunch_banda',
        name: 'Crunch con banda',
        sets: 3,
        repsTarget: '15',
        rest: 60,
        material: 'Banda tubular anclada arriba',
        notes: 'De rodillas, banda por detras del cuello, crunch hacia abajo apretando abdomen.'
      }
    ]
  },
  dayC: {
    id: 'dayC',
    name: 'Dia 3',
    subtitle: 'Full body heavy',
    exercises: [
      {
        id: 'peso_muerto_bilateral',
        name: 'Peso muerto rumano bilateral',
        sets: 4,
        repsTarget: '8-10',
        rest: 120,
        material: '15 kg cada mano + banda loop 35 kg',
        notes: 'Pies a anchura de caderas, banda pisada. Bajar lento, caderas atras, espalda recta.'
      },
      {
        id: 'dominadas_supino',
        name: 'Dominadas (supino/neutro)',
        sets: 5,
        repsTarget: 'max (apunta total)',
        rest: 120,
        material: 'Peso corporal',
        notes: 'Agarre supino (palmas hacia ti) o neutro si tienes agarre. Rango completo.'
      },
      {
        id: 'zancada_estatica_c',
        name: 'Zancada estatica',
        sets: 3,
        repsTarget: '8-10 cada pierna',
        rest: 90,
        material: '10 kg cada mano',
        notes: 'Mismo que Dia 1 pero con menos peso, mas control.'
      },
      {
        id: 'remo_bilateral',
        name: 'Remo bilateral inclinado',
        sets: 4,
        repsTarget: '8-10',
        rest: 90,
        material: '15 kg cada mano + banda loop 25 kg',
        notes: 'Inclinado a 45 grados, tirar ambas mancuernas a la vez, apretar escapulas arriba.'
      },
      {
        id: 'fondos_sillas',
        name: 'Fondos entre sillas',
        sets: 4,
        repsTarget: 'max',
        rest: 90,
        material: 'Peso corporal',
        notes: 'Dos sillas estables, bajar codos a 90 grados, subir explosivo. Si muy facil, pies elevados.'
      },
      {
        id: 'elevacion_piernas',
        name: 'Elevacion piernas colgado',
        sets: 3,
        repsTarget: '8-10',
        rest: 60,
        material: 'Barra de dominadas',
        notes: 'Colgado de la barra, subir piernas rectas o rodillas al pecho. Sin balanceo.'
      }
    ]
  }
};


const DEFAULT_USERS = ['Usuario 1', 'Usuario 2'];
