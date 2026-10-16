// STUDY MODULES. The name on each line must match a topic name in questions.js EXACTLY.
// Each lesson: h (heading), p (explanation), formula (optional), example {q, a} (optional).
const MODULES = {
  "Measurement and Vectors": [
    { h: "Scalars and vectors",
      p: "A scalar has only a magnitude (size). A vector has magnitude and direction. Scalars: mass, time, speed, temperature. Vectors: displacement, velocity, acceleration, force." },
    { h: "Vector components",
      p: "Split a vector into a horizontal and a vertical part. Measure the angle θ from the horizontal. Cos goes with the horizontal side, sin with the vertical side.",
      formula: "Fx = F cos θ\nFy = F sin θ",
      example: { q: "A 50 N force acts 37° above the horizontal. Find Fx and Fy.",
                 a: "Fx = 50 cos 37° ≈ 40 N. Fy = 50 sin 37° ≈ 30 N." } },
    { h: "Unit conversion",
      p: "Multiply by conversion factors so the unwanted units cancel. For speed, there is a shortcut: divide km/h by 3.6 to get m/s.",
      formula: "m/s = km/h ÷ 3.6",
      example: { q: "Convert 90 km/h to m/s.", a: "90 ÷ 3.6 = 25 m/s." } }
  ],
  "Kinematics": [
    { h: "Motion with constant acceleration",
      p: "These equations work only when acceleration is constant. List what you know (v₀, v, a, t, d), then pick the equation that has your unknown and nothing else you don't know. Be careful with signs: slowing down means negative a if you call the direction of motion positive.",
      formula: "v = v₀ + at\nd = v₀t + ½at²\nv² = v₀² + 2ad",
      example: { q: "A bike slows from 10 m/s to 4 m/s in 3 s. Find the acceleration and distance.",
                 a: "a = (4 − 10)/3 = −2 m/s². d = 10(3) + ½(−2)(3²) = 30 − 9 = 21 m." } },
    { h: "Free fall",
      p: "Ignoring air resistance, every falling or thrown object accelerates at g = 9.8 m/s² downward. At the top of a throw the velocity is zero, but the acceleration is still 9.8 m/s² downward.",
      formula: "g = 9.8 m/s² (down)",
      example: { q: "A ball is dropped from rest. How far does it fall in 3 s?",
                 a: "d = ½gt² = ½(9.8)(3²) = 44.1 m." } }
  ],
  "Newton's Laws": [
    { h: "The three laws",
      p: "First law (inertia): an object keeps its state of motion unless a net force acts on it. Second law: the net force equals mass times acceleration. Third law: when A pushes on B, B pushes back on A with an equal and opposite force. These two forces act on different objects, so they never cancel each other.",
      formula: "ΣF = ma" },
    { h: "Mass versus weight",
      p: "Mass is the amount of matter in an object, measured in kg. Weight is the gravitational force on it, measured in newtons. Mass stays the same everywhere. Weight changes with g.",
      formula: "W = mg",
      example: { q: "What is the weight of a 60 kg student on Earth?", a: "W = 60 × 9.8 = 588 N." } },
    { h: "Using the second law",
      p: "Add up all forces along the direction of motion first to get the net force, then divide by the mass.",
      example: { q: "A 4 kg cart is pulled with 20 N. Friction is 8 N. Find its acceleration.",
                 a: "Net force = 20 − 8 = 12 N. a = 12 / 4 = 3 m/s²." } }
  ],
  "Work and Energy": [
    { h: "Work",
      p: "Work is done when a force moves an object. Only the part of the force along the motion counts, which is why the angle θ is between the force and the direction of motion. The unit is the joule (J).",
      formula: "W = F d cos θ",
      example: { q: "A rope pulls a crate 5 m with 40 N at 60° above the floor. How much work is done?",
                 a: "W = 40 × 5 × cos 60° = 40 × 5 × 0.5 = 100 J." } },
    { h: "Kinetic and potential energy",
      p: "Kinetic energy is energy of motion. Gravitational potential energy is energy of position (height above a chosen reference level).",
      formula: "KE = ½mv²\nPE = mgh",
      example: { q: "What is the PE of a 2 kg book on a 1.5 m shelf?", a: "PE = 2 × 9.8 × 1.5 = 29.4 J." } },
    { h: "Conservation of energy",
      p: "With no friction or air resistance, KE + PE stays constant. As an object falls, PE turns into KE.",
      formula: "mgh = ½mv²   →   v = √(2gh)",
      example: { q: "A ball is dropped from 5 m. How fast is it going at the ground?",
                 a: "v = √(2 × 9.8 × 5) = √98 ≈ 9.9 m/s." } }
  ]
};
