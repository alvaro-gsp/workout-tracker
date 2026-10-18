const ROUTINE = {
  dayA: {
    id: 'dayA',
    name: 'Day 1',
    subtitle: 'Pull + Legs',
    exercises: [
      {
        id: 'pullups_pronated',
        name: 'Pull-ups (pronated)',
        sets: 4,
        repsTarget: '4-6',
        rest: 150,
        material: 'Peso corporal',
        execution: `<strong>Agarre:</strong> Grip pronado (palmas hacia fuera), algo más ancho que los hombros. Pulgares rodeando la barra.<br>
<strong>Inicio:</strong> Colgado completo, brazos extendidos, hombros abajo (no encogidos).<br>
<strong>Tirón:</strong> Tira llevando los codos abajo y atrás. La barbilla debe pasar la barra. Aprieta dorsales arriba 1s.<br>
<strong>Bajada:</strong> Controlada 2-3s hasta extensión completa. Nada de medias reps.<br>
<strong>Errores comunes:</strong> Balanceo/kipping, no extender del todo abajo, barbilla que no pasa la barra, encogerse de hombros.<br>
<strong>Consejo:</strong> Si fallas a mitad de serie, descansa 10s y haz singles hasta que no puedas más.`,
        alternatives: [
          {
            id: 'chinups',
            name: 'Chin-ups',
            sets: 4,
            repsTarget: '4-6',
            rest: 150,
            material: 'Peso corporal',
            execution: `<strong>Agarre:</strong> Supino (palmas hacia ti), ancho de hombros.<br>
<strong>Inicio:</strong> Colgado completo, brazos extendidos.<br>
<strong>Tirón:</strong> Tira llevando los codos hacia las caderas. Barbilla sobre la barra, aprieta bíceps y dorsales 1s arriba.<br>
<strong>Bajada:</strong> Controlada 2-3s hasta extensión completa.<br>
<strong>Consejo:</strong> Si fallas, cambia a negativas (salta arriba, baja lento 5s).`
          },
          {
            id: 'pullups_rings',
            name: 'Pull-ups neutras (anillas)',
            sets: 4,
            repsTarget: '4-6',
            rest: 150,
            material: 'Anillas',
            execution: `<strong>Agarre:</strong> Neutro en anillas, permite rotación natural de muñecas.<br>
<strong>Inicio:</strong> Colgado completo, brazos extendidos.<br>
<strong>Tirón:</strong> Mismo movimiento que dominadas normales, tirando codos abajo y atrás.<br>
<strong>Ventaja:</strong> Las anillas son menos agresivas con hombros y codos por la rotación libre.<br>
<strong>Consejo:</strong> Deja que las muñecas roten naturalmente durante el movimiento.`
          }
        ]
      },
      {
        id: 'bulgarian_split_squat',
        name: 'Bulgarian split squat',
        sets: 3,
        repsTarget: '6-8 each leg',
        rest: 120,
        material: 'Mancuernas ajustables',
        execution: `<strong>Posición:</strong> Pie trasero en silla/banco (empeine abajo), pie delantero 2-3 pasos adelante. Mancuernas a los lados.<br>
<strong>Bajada:</strong> Baja recto 3s, rodilla trasera casi toca el suelo. Rodilla delantera sigue la dirección de los dedos.<br>
<strong>Subida:</strong> Sube empujando con el talón delantero. Aprieta glúteo arriba.<br>
<strong>Torso:</strong> Ligera inclinación del torso hacia delante — carga más el glúteo.<br>
<strong>Errores comunes:</strong> Pie delantero demasiado cerca del banco (rodilla se hunde), rebotar abajo, perder el equilibrio.<br>
<strong>Consejo:</strong> Si el equilibrio es problema, haz todas las reps de un lado antes de cambiar. Mira un punto fijo al frente.`,
        alternatives: [
          {
            id: 'db_front_squat',
            name: 'DB front squat',
            sets: 3,
            repsTarget: '8-10',
            rest: 120,
            material: 'Mancuernas ajustables',
            execution: `<strong>Posición:</strong> Mancuernas a los hombros, apoyando un extremo en cada hombro, codos arriba. Pies ancho de hombros, puntas 15-30° hacia fuera.<br>
<strong>Bajada:</strong> Baja sentándote entre las piernas, codos altos. Profundidad a paralelo o más.<br>
<strong>Subida:</strong> Sube empujando con todo el pie.<br>
<strong>Ventaja:</strong> Doble carga vs goblet, más core.<br>
<strong>Errores comunes:</strong> Codos cayendo (tira el peso hacia delante), inclinarse hacia delante, cortar profundidad.<br>
<strong>Consejo:</strong> Si los codos caen, reduce peso. La posición erguida del torso es lo que hace valioso este ejercicio.`
          },
          {
            id: 'suitcase_squat',
            name: 'Suitcase squat',
            sets: 3,
            repsTarget: '8-10',
            rest: 120,
            material: 'Mancuernas ajustables',
            execution: `<strong>Posición:</strong> Mancuernas colgando a los lados como maletas. Pies ancho de hombros.<br>
<strong>Bajada:</strong> Baja como en sentadilla normal, torso lo más recto posible. Paralelo o más abajo.<br>
<strong>Subida:</strong> Empuja con todo el pie, aprieta glúteos arriba.<br>
<strong>Ventaja:</strong> Permite doble carga. El grip puede ser limitante — usa straps si necesitas.<br>
<strong>Errores comunes:</strong> Inclinarse demasiado, mancuernas yéndose hacia delante, cortar profundidad.<br>
<strong>Consejo:</strong> Pecho arriba y core apretado. Las mancuernas deben viajar en línea vertical recta.`
          }
        ]
      },
      {
        id: 'single_arm_row',
        name: 'Single-arm row',
        sets: 3,
        repsTarget: '6-8 each arm',
        rest: 90,
        material: 'Mancuerna + strap',
        execution: `<strong>Posición:</strong> Una mano y rodilla del mismo lado en banco. Otro pie en el suelo bien abierto. Espalda plana y paralela al suelo.<br>
<strong>Tirón:</strong> Tira del codo recto hacia atrás, pasando el torso. Aprieta la escápula arriba 1s.<br>
<strong>Bajada:</strong> Controlada 2s hasta extensión completa. No rotar el torso.<br>
<strong>Errores comunes:</strong> Rotar el torso para subir el peso, no tirar suficientemente alto (el codo debe pasar las costillas), tirones bruscos.<br>
<strong>Consejo:</strong> Piensa "codo al bolsillo" — no tiras de la mano arriba, empujas el codo atrás.`,
        alternatives: [
          {
            id: 'bilateral_row',
            name: 'Bent-over row',
            sets: 3,
            repsTarget: '6-8',
            rest: 90,
            material: 'Mancuernas + straps',
            execution: `<strong>Posición:</strong> Pies ancho de caderas. Bisagra de cadera a ~45°, espalda plana. Mancuernas colgando.<br>
<strong>Tirón:</strong> Rema las dos a la vez, codos pasando el torso. Aprieta escápulas arriba 1s.<br>
<strong>Bajada:</strong> Controlada 2s hasta extensión completa.<br>
<strong>Errores comunes:</strong> Ponerse demasiado erguido (menos trabajo de espalda), tirones bruscos, no apretar arriba, espalda baja redondeándose.<br>
<strong>Consejo:</strong> Si la espalda baja se fatiga antes que los dorsales, estás demasiado horizontal o con mucho peso.`
          },
          {
            id: 'row_rings',
            name: 'Inverted row (rings)',
            sets: 3,
            repsTarget: '8-10',
            rest: 90,
            material: 'Anillas',
            execution: `<strong>Posición:</strong> Anillas a la altura del pecho. Agárrate con brazos extendidos, cuerpo inclinado hacia atrás.<br>
<strong>Dificultad:</strong> Cuanto más horizontal el cuerpo, más difícil.<br>
<strong>Tirón:</strong> Tira del pecho hacia las anillas, codos atrás. Aprieta escápulas 1s.<br>
<strong>Bajada:</strong> Controlada 2s hasta extensión completa.<br>
<strong>Ventaja:</strong> Permite rotación natural de muñecas, menos estrés articular.`
          }
        ]
      },
      {
        id: 'reverse_fly',
        name: 'Reverse fly',
        sets: 3,
        repsTarget: '12-15',
        rest: 60,
        material: '6-10 kg cada mano',
        execution: `<strong>Posición:</strong> Con mancuernas: bisagra de cadera a ~45-60°, espalda plana. Mancuernas colgando, palmas enfrentadas. Ligera flexión de codos fija.<br>
<strong>Movimiento:</strong> Sube los brazos a los lados en arco, apretando escápulas arriba 1s.<br>
<strong>Bajada:</strong> Controlada 2s. No dejes que la gravedad haga el trabajo.<br>
<strong>Errores comunes:</strong> Demasiado peso (es aislamiento), extender codos a mitad de rep, balancear torso para hacer trampa.<br>
<strong>Consejo:</strong> Meñique ligeramente más alto que el pulgar arriba. Peso ligero, sentir el deltoides posterior.`,
        alternatives: [
          {
            id: 'band_pull_apart',
            name: 'Band pull-apart',
            sets: 3,
            repsTarget: '15-20',
            rest: 60,
            material: 'Banda elástica',
            execution: `<strong>Posición:</strong> Banda a la altura del pecho, brazos extendidos al frente.<br>
<strong>Movimiento:</strong> Separa las manos tirando hacia los lados hasta que la banda toque el pecho. Aprieta escápulas.<br>
<strong>Vuelta:</strong> Controlada, sin dejar que la banda se cierre de golpe.<br>
<strong>Músculos:</strong> Trabaja deltoides posterior y romboides.<br>
<strong>Consejo:</strong> Peso ligero, muchas reps, forma perfecta.`
          },
          {
            id: 'face_pull',
            name: 'Face pull',
            sets: 3,
            repsTarget: '15-20',
            rest: 60,
            material: 'Banda tubular',
            execution: `<strong>Posición:</strong> Banda anclada a la altura de la cara. Retrocede hasta que la banda esté tensa.<br>
<strong>Tirón:</strong> Tira hacia la cara separando las manos. Codos altos y abiertos.<br>
<strong>Posición final:</strong> Manos a los lados de las orejas, pulgares hacia atrás. Aguanta 1s.<br>
<strong>Vuelta:</strong> Controlada, sin dejar que la banda tire de ti.<br>
<strong>Consejo:</strong> Peso ligero, reps altas, forma perfecta. Es un ejercicio de deltoides posterior y postura.`
          }
        ]
      },
      {
        id: 'dead_bug',
        name: 'Dead bug',
        sets: 3,
        repsTarget: '10 each side',
        rest: 60,
        material: 'Peso corporal (opcional: mancuerna o banda)',
        execution: `<strong>Posición:</strong> Tumbado boca arriba, brazos extendidos al techo, rodillas a 90°.<br>
<strong>Movimiento:</strong> Extiende brazo contrario y pierna contraria simultáneamente, acercándolos al suelo sin tocarlo. Vuelve al centro y cambia de lado.<br>
<strong>Clave:</strong> Mantén la espalda baja pegada al suelo TODO el rato. Si se despega, estás bajando demasiado.<br>
<strong>Errores comunes:</strong> Espalda baja despegándose del suelo, movimiento demasiado rápido, no coordinar brazo y pierna contrarios.<br>
<strong>Progresión:</strong> Mancuerna en las manos o banda en los pies.`,
        alternatives: [
          {
            id: 'hollow_body_hold',
            name: 'Hollow body hold',
            sets: 3,
            repsTarget: '20-30s',
            rest: 60,
            material: 'Peso corporal',
            unit: 'seconds',
            execution: `<strong>Posición:</strong> Tumbado boca arriba. Brazos extendidos detrás de la cabeza, piernas rectas ligeramente elevadas.<br>
<strong>Activación:</strong> Aprieta abdomen hundiendo la espalda baja en el suelo. Mantén la posición.<br>
<strong>Dificultad:</strong> Cuanto más cerca del suelo brazos y piernas, más difícil.<br>
<strong>Regresión:</strong> Si es demasiado difícil, dobla las rodillas o sube brazos/piernas más alto.<br>
<strong>Consejo:</strong> Respira normal, no contengas la respiración. Aprieta glúteos y cuádriceps.`
          },
          {
            id: 'leg_raise_floor',
            name: 'Lying leg raise',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Peso corporal (opcional: mancuerna entre pies)',
            execution: `<strong>Posición:</strong> Tumbado boca arriba, manos debajo de los glúteos o a los lados. Piernas rectas.<br>
<strong>Movimiento:</strong> Sube las piernas hasta 90° (o hasta donde puedas sin despegar la espalda baja). Baja controlado sin tocar el suelo.<br>
<strong>Progresión:</strong> Mancuerna entre los pies.<br>
<strong>Errores comunes:</strong> Espalda baja despegándose del suelo, bajar demasiado rápido, doblar las rodillas.<br>
<strong>Consejo:</strong> Si la espalda baja se despega, no bajes tanto.`
          }
        ]
      }
    ]
  },
  dayB: {
    id: 'dayB',
    name: 'Day 2',
    subtitle: 'Push + Legs',
    exercises: [
      {
        id: 'floor_press',
        name: 'Bench press',
        sets: 4,
        repsTarget: '6-8',
        rest: 150,
        material: 'Mancuernas ajustables',
        execution: `<strong>Posición:</strong> Tumbado en el suelo (o banco cuando tengas), rodillas flexionadas. Mancuernas a los lados del pecho.<br>
<strong>Bajada:</strong> Baja controlado hasta que los tríceps toquen el suelo. Pausa breve (elimina la inercia).<br>
<strong>Subida:</strong> Sube explosivo. Codos a ~45° del torso, nunca abiertos a 90°.<br>
<strong>Preparación:</strong> Para subir las mancuernas a posición: siéntate con ellas en los muslos, déjate caer hacia atrás y usa las rodillas para impulsarlas arriba.<br>
<strong>Errores comunes:</strong> Rebotar codos en el suelo, codos abiertos a 90° (estrés de hombro), arquear la espalda excesivamente.<br>
<strong>Consejo:</strong> El suelo limita el rango de movimiento — protege los hombros mientras trabajas pecho y tríceps.`,
        alternatives: [
          {
            id: 'floor_press_single',
            name: 'Bench press un brazo',
            sets: 4,
            repsTarget: '6-8 each arm',
            rest: 150,
            material: 'Mancuerna ajustable',
            execution: `<strong>Posición:</strong> Mismo movimiento que el press de banca pero con una sola mancuerna.<br>
<strong>Mano libre:</strong> En el suelo o en el abdomen para estabilidad.<br>
<strong>Ventaja:</strong> Más fácil colocar el peso. Trabaja también anti-rotación del core.<br>
<strong>Errores comunes:</strong> Rotar el torso hacia el lado del peso, no estabilizar la cadera.<br>
<strong>Consejo:</strong> Aprieta el core fuerte para evitar la rotación. Misma técnica de codos a 45°.`
          },
          {
            id: 'pushups_band',
            name: 'Banded push-ups',
            sets: 4,
            repsTarget: '8-12',
            rest: 90,
            material: 'Banda elástica pesada',
            execution: `<strong>Posición:</strong> Flexión normal con banda elástica cruzada por la espalda y sujeta en las manos.<br>
<strong>Resistencia:</strong> Añade resistencia progresiva (más difícil arriba donde normalmente es más fácil).<br>
<strong>Técnica:</strong> Misma técnica que flexión normal: cuerpo recto, codos a 45°, pecho toca o casi toca el suelo.<br>
<strong>Errores comunes:</strong> Banda mal colocada (debe ir por la parte alta de la espalda), caderas caídas.<br>
<strong>Consejo:</strong> Usa una banda lo suficientemente pesada para que las últimas reps sean difíciles arriba.`
          }
        ]
      },
      {
        id: 'db_front_squat',
        name: 'DB front squat',
        sets: 3,
        repsTarget: '8-10',
        rest: 120,
        material: 'Mancuernas ajustables',
        execution: `<strong>Posición:</strong> Mancuernas a los hombros, apoyando un extremo en cada hombro, codos arriba. Pies ancho de hombros, puntas 15-30° hacia fuera.<br>
<strong>Bajada:</strong> Baja sentándote entre las piernas, codos altos. Profundidad a paralelo o más.<br>
<strong>Subida:</strong> Sube empujando con todo el pie.<br>
<strong>Ventaja:</strong> Doble carga vs goblet, más core.<br>
<strong>Errores comunes:</strong> Codos cayendo (tira el peso hacia delante), inclinarse hacia delante, cortar profundidad.<br>
<strong>Consejo:</strong> Si los codos caen, reduce peso. La posición erguida del torso es lo que hace valioso este ejercicio.`,
        alternatives: [
          {
            id: 'suitcase_squat',
            name: 'Suitcase squat',
            sets: 3,
            repsTarget: '8-10',
            rest: 120,
            material: 'Mancuernas ajustables',
            execution: `<strong>Posición:</strong> Mancuernas colgando a los lados como maletas. Pies ancho de hombros.<br>
<strong>Bajada:</strong> Baja como en sentadilla normal, torso lo más recto posible. Paralelo o más abajo.<br>
<strong>Subida:</strong> Empuja con todo el pie, aprieta glúteos arriba.<br>
<strong>Ventaja:</strong> Permite doble carga. El grip puede ser limitante — usa straps si necesitas.<br>
<strong>Consejo:</strong> Pecho arriba y core apretado. Las mancuernas deben viajar en línea vertical recta.`
          },
          {
            id: 'goblet_squat',
            name: 'Goblet squat',
            sets: 3,
            repsTarget: '10-12',
            rest: 90,
            material: 'Mancuerna ajustable',
            execution: `<strong>Posición:</strong> Mancuerna vertical contra el pecho, sujetando la parte superior. Pies ancho de hombros.<br>
<strong>Bajada:</strong> Baja sentándote entre las piernas, codos dentro de las rodillas empujándolas hacia fuera.<br>
<strong>Subida:</strong> Sube empujando con todo el pie.<br>
<strong>Errores comunes:</strong> Talones levantándose (trabaja movilidad de tobillo o eleva talones), rodillas cayendo hacia dentro, inclinarse demasiado.<br>
<strong>Consejo:</strong> Usa los codos: abajo deben estar dentro de las rodillas, empujándolas hacia fuera. Es un ejercicio de movilidad Y fuerza.`
          }
        ]
      },
      {
        id: 'dips',
        name: 'Dips',
        sets: 4,
        repsTarget: 'max',
        rest: 120,
        material: 'Sillas en paralelo',
        execution: `<strong>Posición:</strong> Dos sillas estables en paralelo, manos en los bordes/respaldos. Brazos bloqueados arriba, hombros abajo.<br>
<strong>Bajada:</strong> Baja hasta que los codos lleguen a ~90°, NO más (protege el hombro). Codos apuntando atrás, no abiertos.<br>
<strong>Subida:</strong> Sube explosivo hasta bloqueo completo.<br>
<strong>Inclinación:</strong> Ligeramente inclinado hacia delante activa más pecho.<br>
<strong>Errores comunes:</strong> Bajar demasiado (estrés de hombro), codos abiertos, encogerse de hombros.<br>
<strong>Consejo:</strong> Si molesta el hombro, no bajes tanto. Pies elevados lo hacen más difícil.`,
        alternatives: [
          {
            id: 'sphinx_pushups',
            name: 'Flexiones esfinge',
            sets: 4,
            repsTarget: '8-12',
            rest: 90,
            material: 'Peso corporal',
            execution: `<strong>Posición:</strong> Posición de plancha con antebrazos en el suelo.<br>
<strong>Movimiento:</strong> Empuja con los tríceps para extender los brazos (como una flexión desde los antebrazos). Baja controlado hasta apoyar los antebrazos de nuevo.<br>
<strong>Músculos:</strong> Tríceps puro.<br>
<strong>Clave:</strong> Mantén el cuerpo recto como en una plancha.<br>
<strong>Consejo:</strong> Si es muy difícil, hazlo desde las rodillas al principio.`
          },
          {
            id: 'diamond_pushups',
            name: 'Flexiones diamante',
            sets: 4,
            repsTarget: 'max',
            rest: 90,
            material: 'Peso corporal',
            execution: `<strong>Posición:</strong> Manos juntas bajo el pecho formando un diamante con índices y pulgares.<br>
<strong>Bajada:</strong> Baja el pecho hasta las manos. Codos pegados al cuerpo.<br>
<strong>Subida:</strong> Sube explosivo hasta extensión completa.<br>
<strong>Músculos:</strong> Más tríceps y pecho interior que una flexión normal.<br>
<strong>Consejo:</strong> Si es muy difícil, separa un poco las manos.`
          }
        ]
      },
      {
        id: 'lateral_raise',
        name: 'Lateral raise',
        sets: 3,
        repsTarget: '12-15',
        rest: 60,
        material: '6-10 kg cada mano',
        execution: `<strong>Posición:</strong> De pie, pies ancho de hombros. Mancuernas a los lados, palmas hacia dentro. Ligera flexión de codos fija.<br>
<strong>Movimiento:</strong> Sube los brazos a los lados hasta paralelo al suelo. Lidera con los codos, no con las manos. Aguanta 1s arriba.<br>
<strong>Bajada:</strong> Controlada 2s. No dejes caer las mancuernas.<br>
<strong>Errores comunes:</strong> Encoger los trapecios (hombros abajo), balancear el peso, subir por encima del hombro (estrés innecesario), demasiado peso.<br>
<strong>Consejo:</strong> Peso ligero, forma estricta, sentir el deltoides lateral arder.`,
        alternatives: [
          {
            id: 'lateral_raise_band',
            name: 'Banded lateral raise',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Banda elástica',
            execution: `<strong>Posición:</strong> Mismo movimiento que la lateral raise pero con banda pisada.<br>
<strong>Ventaja:</strong> La resistencia aumenta arriba, donde el deltoides es más fuerte.<br>
<strong>Técnica:</strong> Permite más tensión constante durante todo el rango.<br>
<strong>Consejo:</strong> Misma forma estricta: codos ligeramente flexionados, hombros abajo, sin balanceo.`
          },
          {
            id: 'arnold_press_light',
            name: 'Light Arnold press',
            sets: 3,
            repsTarget: '10-12',
            rest: 60,
            material: 'Mancuernas ligeras',
            execution: `<strong>Posición:</strong> Sentado o de pie. Mancuernas a la altura de la barbilla, palmas hacia ti (como final de un curl).<br>
<strong>Movimiento:</strong> Sube rotando las muñecas hasta press completo arriba (palmas hacia fuera). Baja invirtiendo la rotación.<br>
<strong>Músculos:</strong> Trabaja las tres cabezas del deltoides en un solo movimiento.<br>
<strong>Consejo:</strong> Peso ligero, enfocarse en la rotación suave y controlada.`
          }
        ]
      },
      {
        id: 'russian_twist',
        name: 'Russian twist',
        sets: 3,
        repsTarget: '12 each side',
        rest: 60,
        material: 'Mancuerna o kettlebell',
        execution: `<strong>Posición:</strong> Sentado en el suelo, rodillas flexionadas, pies ligeramente elevados (o apoyados si es difícil). Mancuerna con ambas manos frente al pecho.<br>
<strong>Movimiento:</strong> Rota el torso a un lado tocando (o casi) el suelo con la mancuerna, luego al otro.<br>
<strong>Clave:</strong> Movimiento controlado, sin impulso. El torso rota, no solo los brazos.<br>
<strong>Errores comunes:</strong> Mover solo los brazos sin rotar el torso, usar impulso, dejar caer los pies.<br>
<strong>Progresión:</strong> Más peso o pies más elevados.`,
        alternatives: [
          {
            id: 'bicycle_crunch',
            name: 'Bicycle crunch',
            sets: 3,
            repsTarget: '15 each side',
            rest: 60,
            material: 'Peso corporal',
            execution: `<strong>Posición:</strong> Tumbado boca arriba, manos detrás de la cabeza.<br>
<strong>Movimiento:</strong> Rodilla derecha al pecho mientras llevas el codo izquierdo hacia ella, extendiendo la pierna izquierda. Alterna.<br>
<strong>Clave:</strong> No tires del cuello. Movimiento lento y controlado, no es velocidad sino contracción.<br>
<strong>Consejo:</strong> Exhala al rotar. Mantén la espalda baja pegada al suelo.`
          },
          {
            id: 'crunch_db',
            name: 'DB crunch',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Mancuerna al pecho',
            execution: `<strong>Posición:</strong> Tumbado boca arriba, rodillas flexionadas. Mancuerna sujeta al pecho con ambas manos.<br>
<strong>Movimiento:</strong> Sube el torso contrayendo el abdomen (NO tires de la mancuerna). Aprieta arriba 1s.<br>
<strong>Bajada:</strong> Controlada, sin dejarte caer.<br>
<strong>Consejo:</strong> Exhala al subir. Progresión: mancuerna más pesada.`
          }
        ]
      }
    ]
  },
  dayC: {
    id: 'dayC',
    name: 'Day 3',
    subtitle: 'Full body heavy',
    exercises: [
      {
        id: 'bilateral_rdl',
        name: 'RDL',
        sets: 4,
        repsTarget: '6-8',
        rest: 150,
        material: 'Mancuernas ajustables + straps',
        execution: `<strong>Posición:</strong> Pies ancho de caderas. Mancuernas delante de los muslos, pegadas a las piernas. Ligera flexión de rodillas (15-20°), fija durante todo el movimiento.<br>
<strong>Bajada:</strong> Empuja las caderas ATRÁS como si cerraras una puerta de coche con el culo. Las mancuernas bajan rozando los muslos. Baja hasta notar estirón en isquios, no más.<br>
<strong>Subida:</strong> Sube empujando caderas al frente, aprieta glúteos arriba fuerte. Espalda plana SIEMPRE.<br>
<strong>Errores comunes:</strong> Redondear la espalda baja, doblar más las rodillas al bajar, mirar arriba (cuello neutro), no bajar suficiente.<br>
<strong>Consejo:</strong> Si notas la espalda baja más que los isquios: caderas más atrás, mancuernas más pegadas a las piernas, no bajes tanto.`,
        alternatives: [
          {
            id: 'single_leg_rdl',
            name: 'Single-leg RDL',
            sets: 4,
            repsTarget: '8-10 each leg',
            rest: 120,
            material: 'Mancuerna ajustable',
            execution: `<strong>Posición:</strong> Igual que el RDL bilateral pero a una pierna. La pierna libre va hacia atrás como contrapeso.<br>
<strong>Mancuerna:</strong> En la mano contraria a la pierna de apoyo.<br>
<strong>Clave:</strong> Mantén la cadera cuadrada (no rotar). Ligera flexión en la rodilla de apoyo.<br>
<strong>Errores comunes:</strong> Rotar la cadera, perder el equilibrio, redondear la espalda.<br>
<strong>Consejo:</strong> Si el equilibrio es problema, usa la variante kickstand (puntera trasera apoyada).`
          },
          {
            id: 'stiff_leg_deadlift',
            name: 'Stiff-leg deadlift',
            sets: 4,
            repsTarget: '8-10',
            rest: 120,
            material: 'Mancuernas ajustables + straps',
            execution: `<strong>Posición:</strong> Igual que el RDL pero con las rodillas más extendidas (casi rectas).<br>
<strong>Énfasis:</strong> Más isquios y menos glúteos que el RDL. Mancuernas pegadas a las piernas.<br>
<strong>Clave:</strong> No redondear la espalda baja.<br>
<strong>Errores comunes:</strong> Bloquear rodillas completamente, redondear espalda, no llegar suficientemente abajo.<br>
<strong>Consejo:</strong> Si no llegas abajo con espalda plana, flexiona un poco más las rodillas.`
          }
        ]
      },
      {
        id: 'chinups',
        name: 'Chin-ups',
        sets: 4,
        repsTarget: '4-6',
        rest: 150,
        material: 'Peso corporal',
        execution: `<strong>Agarre:</strong> Supino (palmas hacia ti), ancho de hombros.<br>
<strong>Inicio:</strong> Colgado completo, brazos extendidos. Hombros abajo.<br>
<strong>Tirón:</strong> Tira llevando los codos hacia las caderas. Barbilla sobre la barra, aprieta bíceps y dorsales 1s arriba.<br>
<strong>Bajada:</strong> Controlada 2-3s hasta extensión completa.<br>
<strong>Errores comunes:</strong> Medias reps (no extender abajo), kipping, barbilla que no pasa la barra.<br>
<strong>Consejo:</strong> Si fallas, cambia a negativas (salta arriba, baja lento 5s).`,
        alternatives: [
          {
            id: 'pullups_rings',
            name: 'Pull-ups neutras (anillas)',
            sets: 4,
            repsTarget: '4-6',
            rest: 150,
            material: 'Anillas',
            execution: `<strong>Agarre:</strong> Neutro en anillas, permite rotación natural de muñecas.<br>
<strong>Inicio:</strong> Colgado completo, brazos extendidos.<br>
<strong>Tirón:</strong> Mismo movimiento que dominadas normales, tirando codos abajo y atrás.<br>
<strong>Ventaja:</strong> Las anillas son menos agresivas con hombros y codos por la rotación libre.<br>
<strong>Consejo:</strong> Deja que las muñecas roten naturalmente durante el movimiento.`
          },
          {
            id: 'pullups_pronated',
            name: 'Pull-ups (pronated)',
            sets: 4,
            repsTarget: '4-6',
            rest: 150,
            material: 'Peso corporal',
            execution: `<strong>Agarre:</strong> Pronado (palmas hacia fuera), algo más ancho que los hombros.<br>
<strong>Inicio:</strong> Colgado completo, brazos extendidos, hombros abajo.<br>
<strong>Tirón:</strong> Tira llevando los codos abajo y atrás. La barbilla debe pasar la barra.<br>
<strong>Bajada:</strong> Controlada 2-3s hasta extensión completa.<br>
<strong>Consejo:</strong> Si fallas a mitad de serie, descansa 10s y haz singles hasta que no puedas más.`
          }
        ]
      },
      {
        id: 'bilateral_row',
        name: 'Bent-over row',
        sets: 3,
        repsTarget: '6-8',
        rest: 120,
        material: 'Mancuernas ajustables + straps',
        execution: `<strong>Posición:</strong> Pies ancho de caderas. Bisagra de cadera a ~45°, espalda plana. Mancuernas colgando.<br>
<strong>Tirón:</strong> Rema las dos a la vez, codos pasando el torso. Aprieta escápulas arriba 1s.<br>
<strong>Bajada:</strong> Controlada 2s hasta extensión completa.<br>
<strong>Errores comunes:</strong> Ponerse demasiado erguido, tirones bruscos, no apretar arriba, espalda baja redondeándose.<br>
<strong>Consejo:</strong> Si la espalda baja se fatiga antes que los dorsales, estás demasiado horizontal o con mucho peso.`,
        alternatives: [
          {
            id: 'single_arm_row',
            name: 'Single-arm row',
            sets: 3,
            repsTarget: '6-8 each arm',
            rest: 90,
            material: 'Mancuerna + strap',
            execution: `<strong>Posición:</strong> Una mano y rodilla del mismo lado en banco. Otro pie en el suelo bien abierto. Espalda plana y paralela al suelo.<br>
<strong>Tirón:</strong> Tira del codo recto hacia atrás, pasando el torso. Aprieta la escápula arriba 1s.<br>
<strong>Bajada:</strong> Controlada 2s. No rotar el torso.<br>
<strong>Consejo:</strong> Piensa "codo al bolsillo" — no tiras de la mano arriba, empujas el codo atrás.`
          },
          {
            id: 'row_rings',
            name: 'Inverted row (rings)',
            sets: 3,
            repsTarget: '8-10',
            rest: 90,
            material: 'Anillas',
            execution: `<strong>Posición:</strong> Anillas a la altura del pecho. Agárrate con brazos extendidos, cuerpo inclinado hacia atrás.<br>
<strong>Dificultad:</strong> Cuanto más horizontal el cuerpo, más difícil.<br>
<strong>Tirón:</strong> Tira del pecho hacia las anillas, codos atrás.<br>
<strong>Bajada:</strong> Controlada 2s hasta extensión completa.<br>
<strong>Ventaja:</strong> Permite rotación natural de muñecas.`
          }
        ]
      },
      {
        id: 'decline_pushups',
        name: 'Decline push-ups',
        sets: 3,
        repsTarget: 'max',
        rest: 90,
        material: 'Pies elevados',
        execution: `<strong>Posición:</strong> Pies en silla o banco, manos en el suelo algo más anchas que los hombros. Cuerpo recto.<br>
<strong>Bajada:</strong> Baja el pecho hacia el suelo, codos a 45°.<br>
<strong>Subida:</strong> Sube explosivo hasta extensión completa.<br>
<strong>Dificultad:</strong> Cuanto más altos los pies, más trabaja el hombro. Altura de silla trabaja bien el pecho superior.<br>
<strong>Errores comunes:</strong> Caderas caídas, no bajar suficiente, mirar al frente (cuello neutro).<br>
<strong>Consejo:</strong> Mantén el cuerpo recto de cabeza a talones como en una plancha.`,
        alternatives: [
          {
            id: 'pushups_band',
            name: 'Banded push-ups',
            sets: 3,
            repsTarget: '8-12',
            rest: 90,
            material: 'Banda elástica pesada',
            execution: `<strong>Posición:</strong> Flexión normal con banda elástica cruzada por la espalda y sujeta en las manos.<br>
<strong>Resistencia:</strong> Añade resistencia progresiva (más difícil arriba).<br>
<strong>Técnica:</strong> Misma técnica que flexión normal: cuerpo recto, codos a 45°, pecho toca o casi toca el suelo.<br>
<strong>Consejo:</strong> Usa una banda lo suficientemente pesada para que las últimas reps sean difíciles.`
          },
          {
            id: 'pushups',
            name: 'Push-ups',
            sets: 3,
            repsTarget: 'max',
            rest: 90,
            material: 'Peso corporal',
            execution: `<strong>Posición:</strong> Manos ancho de hombros, dedos abiertos. Cuerpo recto de cabeza a talones.<br>
<strong>Bajada:</strong> Baja controlado, pecho toca o casi toca el suelo. Codos a 45° del torso.<br>
<strong>Subida:</strong> Sube explosivo, extiende brazos completamente. Aprieta pecho arriba.<br>
<strong>Errores comunes:</strong> Caderas caídas, cabeza cayendo, rango parcial, codos abiertos a 90°.<br>
<strong>Progresión:</strong> Banda en la espalda, chaleco lastrado, déficit (manos en bloques), o pies elevados.`
          }
        ]
      },
      {
        id: 'leg_raise_floor',
        name: 'Lying leg raise',
        sets: 3,
        repsTarget: '12-15',
        rest: 60,
        material: 'Peso corporal (opcional: mancuerna entre pies)',
        execution: `<strong>Posición:</strong> Tumbado boca arriba, manos debajo de los glúteos o a los lados. Piernas rectas.<br>
<strong>Movimiento:</strong> Sube las piernas hasta 90° (o hasta donde puedas sin despegar la espalda baja). Baja controlado sin tocar el suelo.<br>
<strong>Progresión:</strong> Mancuerna entre los pies.<br>
<strong>Errores comunes:</strong> Espalda baja despegándose del suelo, bajar demasiado rápido, doblar las rodillas.<br>
<strong>Consejo:</strong> Si la espalda baja se despega, no bajes tanto.`,
        alternatives: [
          {
            id: 'reverse_crunch',
            name: 'Crunch inverso',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Peso corporal',
            execution: `<strong>Posición:</strong> Tumbado boca arriba, brazos a los lados. Rodillas flexionadas.<br>
<strong>Movimiento:</strong> Lleva las rodillas al pecho y eleva la cadera del suelo apretando el abdomen inferior. Baja controlado.<br>
<strong>Clave:</strong> El movimiento es de la cadera, no de las piernas.<br>
<strong>Consejo:</strong> Exhala al elevar la cadera. No uses impulso.`
          },
          {
            id: 'crunch_db',
            name: 'DB crunch',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Mancuerna al pecho',
            execution: `<strong>Posición:</strong> Tumbado boca arriba, rodillas flexionadas. Mancuerna sujeta al pecho con ambas manos.<br>
<strong>Movimiento:</strong> Sube el torso contrayendo el abdomen (NO tires de la mancuerna). Aprieta arriba 1s.<br>
<strong>Bajada:</strong> Controlada, sin dejarte caer.<br>
<strong>Consejo:</strong> Exhala al subir. Progresión: mancuerna más pesada.`
          }
        ]
      }
    ]
  },
  dayD: {
    id: 'dayD',
    name: 'Day 4',
    subtitle: 'Upper body',
    exercises: [
      {
        id: 'db_curl',
        name: 'DB curl',
        sets: 3,
        repsTarget: '8-10',
        rest: 60,
        material: 'Mancuernas ajustables',
        execution: `<strong>Posición:</strong> De pie, mancuernas a los lados, palmas hacia fuera (supinación).<br>
<strong>Movimiento:</strong> Sube flexionando el codo, sin mover el brazo (codo pegado al costado). Aprieta bíceps arriba 1s.<br>
<strong>Bajada:</strong> Controlada 2s. No balancear el cuerpo.<br>
<strong>Variante:</strong> Alterna brazos o los dos a la vez.<br>
<strong>Errores comunes:</strong> Balancear el torso para subir el peso, codos adelantándose, bajar demasiado rápido.<br>
<strong>Consejo:</strong> Si necesitas balancear, el peso es demasiado. Baja peso y haz reps limpias.`,
        alternatives: [
          {
            id: 'concentration_curl',
            name: 'Concentration curl',
            sets: 3,
            repsTarget: '10-12',
            rest: 60,
            material: 'Mancuerna ajustable',
            execution: `<strong>Posición:</strong> Sentado, codo apoyado en la cara interna del muslo. Mancuerna colgando.<br>
<strong>Movimiento:</strong> Sube flexionando solo el antebrazo. Aprieta arriba 1s.<br>
<strong>Bajada:</strong> Lenta y controlada.<br>
<strong>Ventaja:</strong> Aislamiento total del bíceps, imposible hacer trampa.<br>
<strong>Consejo:</strong> Concéntrate en la contracción del bíceps, no en mover peso.`
          },
          {
            id: 'curl_band',
            name: 'Banded curl',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Banda elástica',
            execution: `<strong>Posición:</strong> De pie, banda pisada con los pies. Agarre supino.<br>
<strong>Movimiento:</strong> Mismo movimiento que el curl con mancuerna. Codos pegados al costado.<br>
<strong>Ventaja:</strong> La banda da más resistencia arriba (donde el bíceps es más fuerte).<br>
<strong>Consejo:</strong> Controla la bajada, no dejes que la banda tire de ti.`
          }
        ]
      },
      {
        id: 'hammer_curl',
        name: 'Hammer curl',
        sets: 3,
        repsTarget: '8-10',
        rest: 60,
        material: 'Mancuernas ajustables',
        execution: `<strong>Posición:</strong> De pie, mancuernas a los lados, palmas enfrentadas (agarre neutro).<br>
<strong>Movimiento:</strong> Sube sin rotar la muñeca. Aprieta arriba 1s.<br>
<strong>Músculos:</strong> Trabaja bíceps + braquial + antebrazo.<br>
<strong>Clave:</strong> Mismo control que el curl normal: codo quieto, sin balanceo.<br>
<strong>Consejo:</strong> El agarre neutro es más fuerte que la supinación — podrás usar algo más de peso.`,
        alternatives: [
          {
            id: 'zottman_curl',
            name: 'Zottman curl',
            sets: 3,
            repsTarget: '8-10',
            rest: 60,
            material: 'Mancuernas ajustables',
            execution: `<strong>Subida:</strong> Sube como un curl normal (palmas arriba).<br>
<strong>Rotación arriba:</strong> Arriba, gira las muñecas (palmas abajo).<br>
<strong>Bajada:</strong> Baja en pronación (palmas abajo) controlado 3s.<br>
<strong>Rotación abajo:</strong> Abajo, gira las muñecas de nuevo (palmas arriba).<br>
<strong>Ventaja:</strong> Trabaja bíceps al subir y antebrazo al bajar. Dos en uno.<br>
<strong>Consejo:</strong> La bajada lenta en pronación es donde está el valor. No la apresures.`
          },
          {
            id: 'reverse_curl_band',
            name: 'Banded reverse curl',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Banda elástica',
            execution: `<strong>Posición:</strong> Banda pisada, agarre pronado (palmas abajo).<br>
<strong>Movimiento:</strong> Sube flexionando el codo. Codos pegados al costado.<br>
<strong>Músculos:</strong> Trabaja braquiorradial y extensores del antebrazo.<br>
<strong>Consejo:</strong> Más ligero que un curl normal, 12-15 reps con forma estricta.`
          }
        ]
      },
      {
        id: 'overhead_tricep_ext',
        name: 'Overhead tricep extension',
        sets: 3,
        repsTarget: '10-12',
        rest: 60,
        material: 'Mancuerna ajustable (1 DB, dos manos)',
        execution: `<strong>Posición:</strong> De pie o sentado. Una mancuerna con ambas manos detrás de la cabeza, codos apuntando al techo.<br>
<strong>Movimiento:</strong> Extiende los brazos subiendo la mancuerna. Aprieta tríceps arriba.<br>
<strong>Bajada:</strong> Controlada, codos fijos apuntando al techo, no abrirlos.<br>
<strong>Músculos:</strong> Trabaja la cabeza larga del tríceps (la más grande).<br>
<strong>Errores comunes:</strong> Codos abriéndose, mover los brazos superiores, usar impulso.<br>
<strong>Consejo:</strong> Mantén los codos apuntando al techo todo el rato. Si se abren, baja peso.`,
        alternatives: [
          {
            id: 'tricep_kickback',
            name: 'Tricep kickback',
            sets: 3,
            repsTarget: '10-12',
            rest: 60,
            material: 'Mancuerna ajustable',
            execution: `<strong>Posición:</strong> Bisagra de cadera ~45°. Brazo pegado al costado, codo a 90°.<br>
<strong>Movimiento:</strong> Extiende el antebrazo hacia atrás hasta que el brazo quede recto. Aprieta tríceps 1s.<br>
<strong>Bajada:</strong> Controlada. El brazo superior NO se mueve, solo el antebrazo.<br>
<strong>Consejo:</strong> Peso ligero, control total. No balancear el brazo.`
          },
          {
            id: 'band_pushdown',
            name: 'Band pushdown',
            sets: 3,
            repsTarget: '15-20',
            rest: 60,
            material: 'Banda elástica anclada arriba',
            execution: `<strong>Posición:</strong> Banda anclada arriba (barra de dominadas). Agarra con ambas manos, codos pegados al costado.<br>
<strong>Movimiento:</strong> Empuja hacia abajo extendiendo los brazos. Aprieta tríceps abajo.<br>
<strong>Vuelta:</strong> Controlada. Codos fijos, solo se mueven los antebrazos.<br>
<strong>Consejo:</strong> Mantén los codos pegados al cuerpo todo el rato.`
          }
        ]
      },
      {
        id: 'close_grip_pushups',
        name: 'Close-grip push-ups',
        sets: 3,
        repsTarget: 'max',
        rest: 60,
        material: 'Peso corporal',
        execution: `<strong>Posición:</strong> Flexión con manos a la anchura de los hombros o ligeramente más juntas. Codos pegados al cuerpo.<br>
<strong>Bajada:</strong> Controlada, pecho al suelo.<br>
<strong>Subida:</strong> Explosiva hasta extensión completa.<br>
<strong>Músculos:</strong> Más tríceps que una flexión normal.<br>
<strong>Errores comunes:</strong> Codos abriéndose, caderas caídas, rango parcial.<br>
<strong>Consejo:</strong> Si es fácil, añade banda. Si es difícil, separa un poco las manos.`,
        alternatives: [
          {
            id: 'sphinx_pushups',
            name: 'Flexiones esfinge',
            sets: 3,
            repsTarget: '8-12',
            rest: 60,
            material: 'Peso corporal',
            execution: `<strong>Posición:</strong> Posición de plancha con antebrazos en el suelo.<br>
<strong>Movimiento:</strong> Empuja con los tríceps para extender los brazos. Baja controlado hasta apoyar los antebrazos de nuevo.<br>
<strong>Músculos:</strong> Tríceps puro.<br>
<strong>Clave:</strong> Mantén el cuerpo recto como en una plancha.<br>
<strong>Consejo:</strong> Si es muy difícil, hazlo desde las rodillas.`
          },
          {
            id: 'diamond_pushups',
            name: 'Flexiones diamante',
            sets: 3,
            repsTarget: 'max',
            rest: 60,
            material: 'Peso corporal',
            execution: `<strong>Posición:</strong> Manos juntas bajo el pecho formando un diamante con índices y pulgares.<br>
<strong>Bajada:</strong> Baja el pecho hasta las manos.<br>
<strong>Subida:</strong> Sube explosivo.<br>
<strong>Músculos:</strong> Más tríceps y pecho interior que una flexión normal.<br>
<strong>Consejo:</strong> Si es muy difícil, separa un poco las manos.`
          }
        ]
      },
      {
        id: 'arnold_press',
        name: 'Arnold press',
        sets: 3,
        repsTarget: '8-10',
        rest: 90,
        material: 'Mancuernas ajustables',
        execution: `<strong>Posición:</strong> Sentado o de pie. Empieza con mancuernas a la altura de la barbilla, palmas hacia ti.<br>
<strong>Movimiento:</strong> Sube rotando hasta press completo (palmas hacia fuera arriba). Baja invirtiendo la rotación.<br>
<strong>Músculos:</strong> Trabaja deltoides frontal, lateral y posterior en un movimiento.<br>
<strong>Ventaja:</strong> Más seguro que press militar estricto por la rotación gradual.<br>
<strong>Errores comunes:</strong> No completar la rotación, arquear la espalda, usar impulso.<br>
<strong>Consejo:</strong> Rotación suave y continua. No apresures la transición.`,
        alternatives: [
          {
            id: 'shoulder_press',
            name: 'Shoulder press',
            sets: 3,
            repsTarget: '8-10',
            rest: 90,
            material: 'Mancuernas ajustables',
            execution: `<strong>Posición:</strong> Sentado o de pie. Mancuernas a la altura de los hombros, palmas hacia fuera.<br>
<strong>Movimiento:</strong> Sube hasta extensión completa. Baja controlado.<br>
<strong>Clave:</strong> Codos a ~45° del torso, no abiertos. No arquear la espalda.<br>
<strong>Consejo:</strong> Si arqueas la espalda, baja peso o hazlo sentado con respaldo.`
          },
          {
            id: 'lateral_raise_heavy',
            name: 'Heavy lateral raise',
            sets: 3,
            repsTarget: '8-10',
            rest: 60,
            material: 'Mancuernas ajustables',
            execution: `<strong>Posición:</strong> Mismo movimiento que lateral raise pero con más peso y menos reps (8-10).<br>
<strong>Técnica:</strong> Algo de impulso controlado está permitido con pesos más altos.<br>
<strong>Bajada:</strong> Siempre lenta 3s, eso es lo importante.<br>
<strong>Consejo:</strong> La fase excéntrica (bajada lenta) es donde ocurre el crecimiento. No dejes caer las mancuernas.`
          }
        ]
      },
      {
        id: 'lateral_raise',
        name: 'Lateral raise',
        sets: 3,
        repsTarget: '12-15',
        rest: 60,
        material: '6-10 kg cada mano',
        execution: `<strong>Posición:</strong> De pie, pies ancho de hombros. Mancuernas a los lados, palmas hacia dentro. Ligera flexión de codos fija.<br>
<strong>Movimiento:</strong> Sube los brazos a los lados hasta paralelo al suelo. Lidera con los codos, no con las manos. Aguanta 1s arriba.<br>
<strong>Bajada:</strong> Controlada 2s. No dejes caer las mancuernas.<br>
<strong>Errores comunes:</strong> Encoger los trapecios (hombros abajo), balancear el peso, subir por encima del hombro (estrés innecesario), demasiado peso.<br>
<strong>Consejo:</strong> Peso ligero, forma estricta, sentir el deltoides lateral arder.`,
        alternatives: [
          {
            id: 'lateral_raise_band',
            name: 'Banded lateral raise',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Banda elástica',
            execution: `<strong>Posición:</strong> Mismo movimiento que la lateral raise pero con banda pisada.<br>
<strong>Ventaja:</strong> La resistencia aumenta arriba, donde el deltoides es más fuerte.<br>
<strong>Técnica:</strong> Permite más tensión constante durante todo el rango.<br>
<strong>Consejo:</strong> Misma forma estricta: codos ligeramente flexionados, hombros abajo, sin balanceo.`
          },
          {
            id: 'front_raise',
            name: 'Front raise',
            sets: 3,
            repsTarget: '12-15',
            rest: 60,
            material: 'Mancuernas ajustables',
            execution: `<strong>Posición:</strong> De pie, mancuernas delante de los muslos, palmas hacia atrás.<br>
<strong>Movimiento:</strong> Sube un brazo al frente hasta la altura del hombro. Baja controlado. Alterna brazos.<br>
<strong>Músculos:</strong> Trabaja deltoides anterior.<br>
<strong>Errores comunes:</strong> Balancear el cuerpo, subir demasiado alto, usar impulso.<br>
<strong>Consejo:</strong> Mantén el core apretado y no balancees. Hasta la altura del hombro, no más.`
          }
        ]
      },
      {
        id: 'farmer_carry',
        name: 'Farmer carry',
        sets: 3,
        repsTarget: '30-40s',
        rest: 60,
        unit: 'seconds',
        material: 'Mancuernas pesadas',
        execution: `<strong>Posición:</strong> Coge una mancuerna pesada en cada mano.<br>
<strong>Movimiento:</strong> Camina recto, ida y vuelta, 30-40 segundos. Espalda recta, hombros atrás y abajo, core apretado.<br>
<strong>Clave:</strong> Agarra fuerte. No dejes que los hombros se encorven.<br>
<strong>Músculos:</strong> Trabaja grip, antebrazos, traps y core a la vez.<br>
<strong>Progresión:</strong> Más peso o más tiempo.`,
        alternatives: [
          {
            id: 'dead_hang',
            name: 'Dead hang',
            sets: 3,
            repsTarget: 'max',
            rest: 60,
            unit: 'seconds',
            material: 'Barra de dominadas',
            execution: `<strong>Posición:</strong> Cuélgate de la barra con agarre pronado.<br>
<strong>Movimiento:</strong> Aguanta el máximo tiempo posible. Hombros abajo (no encogidos). Respira normal.<br>
<strong>Músculos:</strong> Trabaja grip y descomprime hombros y columna.<br>
<strong>Consejo:</strong> Cuando los antebrazos cedan, baja. No fuerces con los hombros encogidos.`
          },
          {
            id: 'wrist_curls',
            name: 'Wrist curls',
            sets: 3,
            repsTarget: '15-20',
            rest: 45,
            material: 'Mancuernas ligeras',
            execution: `<strong>Posición:</strong> Sentado, antebrazos apoyados en los muslos, muñecas libres al borde. Mancuernas ligeras, palmas arriba.<br>
<strong>Movimiento:</strong> Flexiona las muñecas subiendo las mancuernas. Baja controlado.<br>
<strong>Variante:</strong> Luego gira: palmas abajo y extiende las muñecas (reverse).<br>
<strong>Músculos:</strong> Trabaja flexores y extensores del antebrazo.<br>
<strong>Consejo:</strong> Peso ligero, muchas reps. Los antebrazos responden bien al volumen.`
          }
        ]
      }
    ]
  }
};


const WARMUP = {
  videoUrl: 'https://www.youtube.com/watch?v=_6-k5-w1bZw',
  duration: '5 min',
  intervals: '30s work / 5s rest',
  exercises: [
    { name: 'Jumping Jacks', time: '0:10', desc: 'Classic full-body activation. Feet together to wide, arms overhead and back.' },
    { name: 'Cross Toe Touches', time: '0:45', desc: 'Standing, alternate touching opposite foot with opposite hand. Rotate torso.' },
    { name: 'Squat + Front Kick', time: '1:20', desc: 'Bodyweight squat, at the top kick one leg forward. Alternate legs.' },
    { name: 'Chest Opener + Butt Kicks', time: '1:55', desc: 'Open arms wide stretching chest, combine with butt kicks (heel to glute).' },
    { name: 'Arm Circles', time: '2:30', desc: 'Big circles forward, switch to backward halfway through. Shoulders loose.' },
    { name: 'Standing Knee Drives', time: '3:05', desc: 'Drive knee up toward chest, alternate legs. Engage core on each drive.' },
    { name: 'Inchworm Push-up', time: '3:40', desc: 'Bend forward, walk hands out to plank, do a push-up, walk hands back, stand.' },
    { name: 'Down Dog + Knee Tuck', time: '4:15', desc: 'From down dog, drive one knee toward chest, return. Alternate legs.' },
    { name: 'Lateral Lunges', time: '4:50', desc: 'Step wide to one side, sit into that hip. Alternate sides.' },
    { name: 'High Knees', time: '5:25', desc: 'Run in place driving knees high. Fast pace, pump arms.' }
  ]
};

const DEFAULT_USERS = ['User 1', 'User 2'];
