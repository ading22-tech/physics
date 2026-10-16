// ADD YOUR OWN QUESTIONS HERE.
// Each question: q (the question), options (list of choices),
// answer (position of the correct choice, starting from 0), explain (why it is right).
// Copy a block between { } and a comma, paste it below, and edit it.
const TOPICS = [
  {
    name: "Measurement and Vectors",
    questions: [
      { q: "Which of these is a vector quantity?", options: ["Speed", "Mass", "Velocity", "Temperature"], answer: 2,
        explain: "A vector has both magnitude and direction. Velocity is speed in a given direction. Speed, mass, and temperature are scalars." },
      { q: "A 10 N force acts 30° above the horizontal. What is its horizontal component?", options: ["5.00 N", "8.66 N", "10.0 N", "17.3 N"], answer: 1,
        explain: "Fx = F cos θ = 10 × cos 30° = 10 × 0.866 = 8.66 N. (The vertical part uses sin: 10 × sin 30° = 5 N.)" },
      { q: "Convert 72 km/h to m/s.", options: ["7.2 m/s", "20 m/s", "36 m/s", "259 m/s"], answer: 1,
        explain: "Divide km/h by 3.6. 72 ÷ 3.6 = 20 m/s. (1 km/h = 1000 m / 3600 s.)" }
    ]
  },
  {
    name: "Kinematics",
    questions: [
      { q: "A car starts from rest and accelerates at 2 m/s² for 5 s. What is its final velocity?", options: ["5 m/s", "7 m/s", "10 m/s", "25 m/s"], answer: 2,
        explain: "v = v₀ + at = 0 + (2)(5) = 10 m/s." },
      { q: "For the same car, how far does it travel in those 5 s?", options: ["10 m", "12.5 m", "25 m", "50 m"], answer: 2,
        explain: "d = v₀t + ½at² = 0 + ½(2)(5²) = 25 m." },
      { q: "A ball is thrown straight up at 19.6 m/s. How long until it reaches its highest point? (g = 9.8 m/s²)", options: ["1 s", "2 s", "4 s", "9.8 s"], answer: 1,
        explain: "At the top, v = 0. Use v = v₀ − gt, so t = v₀/g = 19.6 / 9.8 = 2 s." }
    ]
  },
  {
    name: "Newton's Laws",
    questions: [
      { q: "A 10 kg object has a net force of 30 N acting on it. What is its acceleration?", options: ["0.33 m/s²", "3 m/s²", "30 m/s²", "300 m/s²"], answer: 1,
        explain: "Newton's second law: a = F/m = 30 / 10 = 3 m/s²." },
      { q: "An object stays at rest or keeps moving at constant velocity unless a net force acts on it. This is:", options: ["Newton's first law", "Newton's second law", "Newton's third law", "The law of gravitation"], answer: 0,
        explain: "That is the law of inertia, Newton's first law." },
      { q: "What is the weight of a 5 kg object on Earth? (g = 9.8 m/s²)", options: ["0.51 N", "5 N", "49 N", "490 N"], answer: 2,
        explain: "Weight is a force: W = mg = 5 × 9.8 = 49 N. Mass (5 kg) stays the same everywhere, but weight changes with g." }
    ]
  },
  {
    name: "Work and Energy",
    questions: [
      { q: "A 20 N force pushes a box 3 m in the direction of the force. How much work is done?", options: ["6.7 J", "17 J", "23 J", "60 J"], answer: 3,
        explain: "W = Fd cos θ = (20)(3)(cos 0°) = 60 J." },
      { q: "What is the kinetic energy of a 2 kg object moving at 3 m/s?", options: ["3 J", "6 J", "9 J", "18 J"], answer: 2,
        explain: "KE = ½mv² = ½(2)(3²) = 9 J. Remember that v is squared before you multiply." },
      { q: "An object is dropped from 10 m. Ignoring air resistance, about how fast is it going just before it hits the ground? (g = 9.8 m/s²)", options: ["9.8 m/s", "14 m/s", "98 m/s", "196 m/s"], answer: 1,
        explain: "Energy conservation: mgh = ½mv², so v = √(2gh) = √(2 × 9.8 × 10) = √196 = 14 m/s. Mass cancels out." }
    ]
  }
];
