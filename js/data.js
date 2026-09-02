const ROUTINE = {
  dayA: {
    id: 'dayA',
    name: 'Day 1',
    subtitle: 'Legs + Pull',
    exercises: [
      {
        id: 'bulgarian_split_squat',
        name: 'Bulgarian squat',

        sets: 4,
        repsTarget: '6-8 each leg',
        rest: 120,
        material: '15 kg each hand + 15 kg loop band',
        execution: `<strong>Setup:</strong> Rear foot on bench (laces down), front foot 2-3 steps ahead. Hold dumbbells at sides.<br>
<strong>Down:</strong> Lower straight down 3s, rear knee nearly touches floor. Front knee tracks over toes, never past.<br>
<strong>Up:</strong> Drive through front heel explosively. Squeeze glute at top.<br>
<strong>Torso:</strong> Slight forward lean — NOT upright. This loads the glute more.<br>
<strong>Common mistakes:</strong> Front foot too close to bench (knee caves), bouncing at bottom, losing balance (fix: brace core before descending).<br>
<strong>Tip:</strong> If balance is an issue, do all reps on one side before switching. Look at a fixed point ahead.`
      },
      {
        id: 'pullups_pronated',
        name: 'Pull-ups (pronated)',
        sets: 5,
        repsTarget: 'max (log total)',
        rest: 120,
        material: 'Bodyweight',
        execution: `<strong>Grip:</strong> Pronated (palms away), slightly wider than shoulder width. Thumbs wrapped around the bar.<br>
<strong>Start:</strong> Dead hang, arms fully extended, shoulders packed down (not shrugged).<br>
<strong>Pull:</strong> Drive elbows down and back. Chin must clear the bar. Squeeze lats at top for 1s.<br>
<strong>Lower:</strong> Controlled 2-3s descent all the way to dead hang. No half reps.<br>
<strong>Common mistakes:</strong> Kipping/swinging, not going to full extension, chin not clearing bar, shrugging shoulders.<br>
<strong>Tip:</strong> If you fail mid-set, rest 10s and do singles until you can't. Every rep counts for the total.`
      },
      {
        id: 'single_leg_rdl',
        name: 'Single-leg RDL',

        sets: 4,
        repsTarget: '8-10 each leg',
        rest: 90,
        material: '15 kg + 25 kg loop band',
        execution: `<strong>Two variants:</strong><br>
(1) <em>Counterbalance:</em> Free leg extends behind as you hinge — acts as counterweight. Harder on balance, more hamstring stretch.<br>
(2) <em>Kickstand:</em> Free leg slightly behind with toes on ground for support. Easier balance, same muscle work.<br>
<strong>Hinge:</strong> Push hips back, lower dumbbell along standing leg. Back stays flat. Go until you feel a deep hamstring stretch (~parallel torso).<br>
<strong>Up:</strong> Drive hips forward explosively. Squeeze glute at top.<br>
<strong>Tempo:</strong> 3s down, 1s up.<br>
<strong>Common mistakes:</strong> Rounding lower back, bending the standing knee too much, rotating hips open.<br>
<strong>Tip:</strong> Keep the dumbbell close to your leg like it's on a rail. Slight bend in standing knee is fine.`
      },
      {
        id: 'single_arm_row',
        name: 'Single-arm row',

        sets: 4,
        repsTarget: '8-10 each arm',
        rest: 90,
        material: '15 kg + 15 kg loop band',
        execution: `<strong>Setup:</strong> One hand and same-side knee on bench. Other foot on floor wide for stability. Back flat, parallel to floor.<br>
<strong>Pull:</strong> Drive elbow straight back past your torso. Squeeze shoulder blade at top for 1s. Don't rotate your torso.<br>
<strong>Lower:</strong> Controlled 2s, full arm extension at bottom. Let the scapula protract slightly for extra range.<br>
<strong>Common mistakes:</strong> Rotating torso to cheat weight up, not pulling high enough (elbow should pass ribs), jerking the weight.<br>
<strong>Tip:</strong> Think "elbow to hip pocket" — not pulling the hand up, but driving the elbow back.`
      },
      {
        id: 'face_pull',
        name: 'Face pull',
        sets: 3,
        repsTarget: '15-20',
        rest: 60,
        material: 'Tube band',
        execution: `<strong>Setup:</strong> Anchor band at face height. Step back until band is taut. Grip with both hands, palms facing each other.<br>
<strong>Pull:</strong> Pull toward your face, separating hands wide. Elbows high and wide, squeezing rear delts and rhomboids.<br>
<strong>End position:</strong> Hands should be beside your ears, thumbs pointing back. Hold 1s.<br>
<strong>Return:</strong> Slow and controlled. Don't let the band snap back.<br>
<strong>Common mistakes:</strong> Pulling too low (to chest), using biceps instead of rear delts, leaning back.<br>
<strong>Tip:</strong> This is a rear delt and posture exercise — light weight, high reps, perfect form. Never ego-lift this.`,
        alternatives: [
          {
            id: 'reverse_fly',
            name: 'Reverse fly',
            sets: 3,
            repsTarget: '15-20',
            rest: 60,
            material: '6-10 kg each hand or tube band',
            execution: `<strong>With dumbbells:</strong> Hinge at hips to ~45-60°, flat back. Dumbbells hanging below chest, palms facing each other. Slight bend in elbows, locked in place.<br>
<strong>With band:</strong> Anchor band at chest height or hold the middle with arms extended forward. Same movement pattern.<br>
<strong>Raise:</strong> Raise both arms out to the sides in an arc, squeezing shoulder blades together at the top. Hold 1s.<br>
<strong>Lower:</strong> Controlled 2s descent. Don't let gravity do the work.<br>
<strong>Common mistakes:</strong> Using too much weight (this is an isolation exercise), straightening elbows mid-rep, swinging torso upright to cheat.<br>
<strong>Tip:</strong> Think about leading with the elbows, not the hands. Light weight, feel the rear delts burn. Pinky finger slightly higher than thumb at the top.`
          }
        ]
      },
      {
        id: 'plank',
        name: 'Plank',
        unit: 'seconds',
        sets: 3,
        repsTarget: '45-60s',
        rest: 60,
        material: 'Bodyweight',
        execution: `<strong>Setup:</strong> Forearms on floor, elbows under shoulders. Feet hip-width apart.<br>
<strong>Position:</strong> Straight line from head to heels. Tuck pelvis slightly (posterior tilt) to engage lower abs.<br>
<strong>Breathing:</strong> Breathe normally. Brace abs as if expecting a punch.<br>
<strong>Common mistakes:</strong> Hips sagging (lower back pain), hips too high (pike), holding breath, looking up (neck strain).<br>
<strong>Tip:</strong> Squeeze glutes and quads — it's not just an ab exercise. If it's too easy, try RKC plank: squeeze everything maximally for shorter holds.`
      }
    ]
  },
  dayB: {
    id: 'dayB',
    name: 'Day 2',
    subtitle: 'Legs + Push',
    exercises: [
      {
        id: 'goblet_squat',
        name: 'Goblet squat',
        sets: 4,
        repsTarget: '10-12',
        rest: 90,
        material: '15 kg + 35 kg loop band stepped on',
        execution: `<strong>Setup:</strong> Hold dumbbell vertically against chest, cupping the top end. Feet shoulder-width or slightly wider, toes out 15-30°. Band under both feet.<br>
<strong>Down:</strong> Sit between your legs, not back. Push knees out over toes. Go as deep as you can while keeping back straight — aim for below parallel.<br>
<strong>Up:</strong> Drive through full foot, squeeze glutes at top. Don't lock knees aggressively.<br>
<strong>Common mistakes:</strong> Heels lifting (work ankle mobility or elevate heels on plates), knees caving in, leaning forward too much, cutting depth.<br>
<strong>Tip:</strong> Use the elbows — at the bottom they should be inside your knees, pushing them out. This is a mobility AND strength exercise.`,
        alternatives: [
          {
            id: 'suitcase_squat',
            name: 'Suitcase squat (DBs at sides)',
            sets: 4,
            repsTarget: '10-12',
            rest: 90,
            material: '15 kg each hand + loop band',
            execution: `<strong>Setup:</strong> Dumbbells hanging at sides like suitcases. Feet shoulder-width, toes out 15-30°. Band under both feet optional.<br>
<strong>Down:</strong> Sit back and down, keeping torso as upright as possible. Go to parallel or below. Knees track over toes.<br>
<strong>Up:</strong> Drive through full foot, squeeze glutes at top.<br>
<strong>Advantage:</strong> Allows double the load vs goblet (2 dumbbells). Grip may be the limiter — use straps if needed.<br>
<strong>Common mistakes:</strong> Leaning forward excessively, dumbbells drifting forward, cutting depth.<br>
<strong>Tip:</strong> Keep chest up and core braced. The dumbbells should travel in a straight vertical line.`
          },
          {
            id: 'db_front_squat',
            name: 'Dumbbell front squat (DBs on shoulders)',
            sets: 4,
            repsTarget: '10-12',
            rest: 90,
            material: '15 kg each hand + loop band',
            execution: `<strong>Setup:</strong> Clean dumbbells to shoulders, resting one end on each shoulder, elbows up. Feet shoulder-width, toes out 15-30°.<br>
<strong>Down:</strong> Sit between your legs, elbows stay high. Go to parallel or below. Knees track over toes.<br>
<strong>Up:</strong> Drive through full foot, keep elbows up throughout. Squeeze glutes at top.<br>
<strong>Advantage:</strong> Double the load vs goblet, more core engagement than suitcase, mimics barbell front squat.<br>
<strong>Common mistakes:</strong> Elbows dropping (dumps the weight forward), leaning forward, cutting depth.<br>
<strong>Tip:</strong> If elbows drop, reduce weight. The upright torso position is what makes this exercise valuable.`
          }
        ]
      },
      {
        id: 'floor_press',
        name: 'Bench press',
        sets: 4,
        repsTarget: '8-12',
        rest: 90,
        material: '15 kg each hand + loop band across back',
        execution: `<strong>Setup:</strong> Lie on floor, knees bent. Band across upper back, held in each hand with dumbbells. Start with arms extended.<br>
<strong>Down:</strong> Lower controlled until triceps rest on the floor. Elbows at ~45° angle from torso — not flared out.<br>
<strong>Pause:</strong> Brief pause on the floor (kills the stretch reflex — makes it harder and safer).<br>
<strong>Up:</strong> Press explosively. Squeeze chest at top.<br>
<strong>Common mistakes:</strong> Bouncing elbows off floor, flaring elbows to 90° (shoulder stress), arching back excessively.<br>
<strong>Tip:</strong> The floor limits range of motion — this protects the shoulders while still building chest and triceps. Focus on the lockout.`,
        alternatives: [
          {
            id: 'pushups',
            name: 'Push-ups',
            sets: 4,
            repsTarget: 'max',
            rest: 90,
            material: 'Bodyweight',
            execution: `<strong>Setup:</strong> Hands shoulder-width, fingers spread. Body straight from head to heels.<br>
<strong>Down:</strong> Lower controlled, chest touches or nearly touches floor. Elbows at 45° from torso.<br>
<strong>Up:</strong> Push explosively, fully extend arms. Squeeze chest at top.<br>
<strong>Common mistakes:</strong> Hips sagging, head dropping, partial range of motion, elbows flared at 90°.<br>
<strong>Progression:</strong> Band across back, weighted vest, deficit (hands on blocks), or feet elevated.`
          }
        ]
      },
      {
        id: 'reverse_lunge',
        name: 'Reverse lunge',

        sets: 4,
        repsTarget: '8-10 each leg',
        rest: 90,
        material: '15 kg each hand',
        execution: `<strong>Setup:</strong> Standing tall, dumbbells at sides. Feet hip-width apart.<br>
<strong>Step:</strong> Step back with one leg, lower straight down until rear knee nearly touches floor. Front shin stays vertical.<br>
<strong>Up:</strong> Drive through front heel back to standing. Squeeze glute at top.<br>
<strong>Common mistakes:</strong> Stepping too short (knee goes past toes), leaning forward, pushing off the back foot instead of the front.<br>
<strong>Tip:</strong> Reverse lunges are easier on the knees than forward lunges. Keep torso upright and core braced throughout.`
      },
      {
        id: 'decline_pushups',
        name: 'Decline push-ups',
        sets: 4,
        repsTarget: 'max',
        rest: 90,
        material: 'Feet elevated',
        execution: `<strong>Setup:</strong> Feet on bench or chair, hands on floor slightly wider than shoulders. Body straight.<br>
<strong>Down:</strong> Lower chest toward floor, elbows at 45°. Go until forehead nearly touches the ground.<br>
<strong>Up:</strong> Push explosively. Full lockout at top.<br>
<strong>Common mistakes:</strong> Hips sagging (same as regular push-ups but worse due to angle), not going deep enough, looking forward (keep neck neutral).<br>
<strong>Tip:</strong> The higher your feet, the more shoulder-dominant it becomes. Bench height targets upper chest well.`
      },
      {
        id: 'lateral_raise',
        name: 'Lateral raise',
        sets: 3,
        repsTarget: '12-15',
        rest: 60,
        material: '6-10 kg each hand',
        execution: `<strong>Setup:</strong> Standing, feet shoulder-width. Dumbbells at sides, palms facing in. Slight bend in elbows, locked in place.<br>
<strong>Raise:</strong> Lift arms out to the sides until parallel to the floor. Lead with the elbows, not the hands. Hold 1s at the top.<br>
<strong>Lower:</strong> Controlled 2s descent. Don't let the dumbbells crash down.<br>
<strong>Common mistakes:</strong> Shrugging traps (keep shoulders down), swinging the weight up, going above shoulder height (unnecessary stress), using too much weight.<br>
<strong>Tip:</strong> Think about pouring water from a pitcher — pinky slightly higher than thumb at the top. Light weight, strict form, feel the burn in the medial delt.`
      },
      {
        id: 'weighted_crunch',
        name: 'Weighted crunch',
        sets: 3,
        repsTarget: '15',
        rest: 60,
        material: 'Dumbbell, kettlebell or band',
        execution: `<strong>With dumbbell/kettlebell:</strong> Lie on your back, knees bent. Hold the weight against your chest with both hands or extended behind your head for more difficulty.<br>
<strong>With band:</strong> Kneel facing away from anchor point. Band behind neck, held with both hands at chest level.<br>
<strong>Crunch:</strong> Curl torso up (floor) or down (kneeling), driving ribs toward hips. Squeeze abs hard at the top for 1s. The movement is in the spine, not the hips.<br>
<strong>Return:</strong> Slow and controlled back to start. Don't use momentum.<br>
<strong>Common mistakes:</strong> Pulling with the neck, hinging at hips instead of crunching spine, going too fast.<br>
<strong>Tip:</strong> Exhale forcefully as you crunch. Focus on shortening the distance between ribs and hips.`
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
        repsTarget: '8-10',
        rest: 120,
        material: '15 kg each hand + 35 kg loop band',
        execution: `<strong>Setup:</strong> Feet hip-width, band stepped on under both feet. Dumbbells in front of thighs. Slight knee bend, locked in place.<br>
<strong>Down:</strong> Push hips back, slide dumbbells down your legs. Lower until you feel a deep hamstring stretch (~mid-shin). Keep back flat. 3s down.<br>
<strong>Up:</strong> Drive hips forward, squeeze glutes at top. Don't hyperextend. 1s up.<br>
<strong>Common mistakes:</strong> Rounding lower back, bending knees more as you go down, looking up (keep neck neutral), not going low enough.<br>
<strong>Tip:</strong> The band adds resistance at the top where dumbbells are weakest. Think about pushing the floor away with your feet on the way up.`
      },
      {
        id: 'chinups',
        name: 'Chin-ups (supinated/neutral)',
        sets: 5,
        repsTarget: 'max (log total)',
        rest: 120,
        material: 'Bodyweight',
        execution: `<strong>Grip:</strong> Supinated (palms facing you, shoulder-width) or neutral grip if handles available. Both hit biceps more than pronated.<br>
<strong>Start:</strong> Dead hang, arms fully extended. Shoulders packed down.<br>
<strong>Pull:</strong> Drive elbows down toward hips. Chin over bar. Squeeze biceps and lats at top for 1s.<br>
<strong>Lower:</strong> Controlled 2-3s descent to full dead hang.<br>
<strong>Common mistakes:</strong> Half reps (not full extension at bottom), kipping, not getting chin over bar.<br>
<strong>Tip:</strong> Supinated grip is generally stronger than pronated — use it to build up total volume. If you fail, switch to negatives (jump up, lower slow 5s).`
      },
      {
        id: 'static_lunge',
        name: 'Static lunge',

        sets: 3,
        repsTarget: '8-10 each leg',
        rest: 90,
        material: '10 kg each hand',
        execution: `<strong>Setup:</strong> Split stance — front foot flat, rear foot on toes. Dumbbells at sides. Feet stay planted the entire set.<br>
<strong>Down:</strong> Lower straight down until rear knee nearly touches floor. Front shin stays vertical.<br>
<strong>Up:</strong> Drive through front heel. Squeeze glute at top.<br>
<strong>Common mistakes:</strong> Stance too narrow (side to side), leaning forward, pushing off rear foot.<br>
<strong>Tip:</strong> Keep torso upright and core braced throughout. If balance is an issue, narrow your stance slightly front-to-back.`
      },
      {
        id: 'bilateral_row',
        name: 'Bent-over row',
        sets: 4,
        repsTarget: '8-10',
        rest: 90,
        material: '15 kg each hand + 25 kg loop band',
        execution: `<strong>Setup:</strong> Feet hip-width, band under feet. Hinge at hips to ~45° angle, flat back. Dumbbells hanging below chest.<br>
<strong>Pull:</strong> Row both dumbbells together, driving elbows past your torso. Squeeze scapulae together at top for 1s.<br>
<strong>Lower:</strong> Controlled 2s, full arm extension. Let scapulae protract slightly at bottom for full range.<br>
<strong>Common mistakes:</strong> Standing too upright (reduces back engagement), jerking weight up, not squeezing at top, lower back rounding.<br>
<strong>Tip:</strong> Keep your core braced throughout. If your lower back fatigues before your lats, you're too horizontal or too heavy.`
      },
      {
        id: 'dips',
        name: 'Dips',
        sets: 4,
        repsTarget: 'max',
        rest: 90,
        material: 'Bodyweight',
        execution: `<strong>Setup:</strong> Parallel bars, dip station, or two stable chairs/surfaces. Arms locked out at the top, shoulders down.<br>
<strong>Down:</strong> Lower until elbows reach ~90°. Keep elbows pointing back, not flaring out. 2s down.<br>
<strong>Up:</strong> Press explosively to full lockout. Squeeze triceps at top.<br>
<strong>No parallels?</strong> Use two sturdy chairs — hands on the edges, feet on the floor or elevated on another chair.<br>
<strong>Common mistakes:</strong> Going too deep (shoulder stress), flaring elbows wide, shrugging shoulders.<br>
<strong>Tip:</strong> Feet elevated makes it harder. To go even heavier, place a dumbbell on your lap. Lean slightly forward to shift more work to chest.`
      },
      {
        id: 'hanging_leg_raises',
        name: 'Hanging leg raises',
        sets: 3,
        repsTarget: '8-10',
        rest: 60,
        material: 'Pull-up bar',
        execution: `<strong>Setup:</strong> Hang from bar with straight arms, shoulders packed down. Slight posterior pelvic tilt.<br>
<strong>Raise:</strong> Raise legs straight until they're parallel to floor (or higher for more difficulty). Curl pelvis up at the top — that's where the abs work hardest.<br>
<strong>Lower:</strong> Controlled 2s descent, don't swing. Stop before dead hang to keep tension.<br>
<strong>Regression:</strong> Bend knees (knee raises) if straight legs are too hard. Progress to straight legs over time.<br>
<strong>Common mistakes:</strong> Swinging/kipping, using hip flexors only (no pelvic curl), dropping legs fast.<br>
<strong>Tip:</strong> If you swing, pause for 1s at the bottom of each rep. Grip failing? Use straps or do them earlier in the workout.`
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
