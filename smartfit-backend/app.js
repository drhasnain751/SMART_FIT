import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { EXERCISES_DATASET, FOOD_DATASET } from './fitnessData.js';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'smartfit-dev-secret-key';
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
const ACCESS_TOKEN_EXPIRE_MINUTES = Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) || 60 * 24;
const USER_COOKIE_NAME = 'smartfit_auth_store';

// In-memory cache (complemented by signed HttpOnly cookie for stateless serverless functions)
const usersByEmail = new Map();
let nextUserId = 1;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Cookie & Auth Helpers ---
function parseCookies(cookieHeader = '') {
  const cookies = {};
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) cookies[key] = decodeURIComponent(val);
  }
  return cookies;
}

function readCookieUsers(req) {
  try {
    const cookies = parseCookies(req.headers.cookie || '');
    const raw = cookies[USER_COOKIE_NAME];
    if (!raw) return [];
    const payload = jwt.verify(raw, JWT_SECRET_KEY, { algorithms: [JWT_ALGORITHM] });
    return Array.isArray(payload?.users) ? payload.users : [];
  } catch {
    return [];
  }
}

function writeCookieUsers(res, users) {
  const trimmed = users.slice(-5);
  const token = jwt.sign({ users: trimmed }, JWT_SECRET_KEY, {
    algorithm: JWT_ALGORITHM,
    expiresIn: '30d',
  });
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  const flags = [
    `${USER_COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${60 * 60 * 24 * 30}`,
  ];
  if (isProd) flags.push('Secure');
  res.setHeader('Set-Cookie', flags.join('; '));
}

function createAccessToken(email) {
  return jwt.sign({ sub: email }, JWT_SECRET_KEY, {
    algorithm: JWT_ALGORITHM,
    expiresIn: `${ACCESS_TOKEN_EXPIRE_MINUTES}m`,
  });
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ detail: 'Could not validate credentials' });
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY, { algorithms: [JWT_ALGORITHM] });
    if (!payload?.sub) {
      return res.status(401).json({ detail: 'Could not validate credentials' });
    }
    req.user = usersByEmail.get(payload.sub) || { email: payload.sub };
    return next();
  } catch {
    return res.status(401).json({ detail: 'Could not validate credentials' });
  }
}

// --- API Routes ---
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', app: 'SmartFit AI API' });
});

app.post('/api/v1/auth/register', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ detail: [{ msg: 'Please enter a valid email address.' }] });
  }
  if (!password || typeof password !== 'string' || password.length < 8 || password.length > 50) {
    return res.status(422).json({ detail: [{ msg: 'Password must be between 8 and 50 characters.' }] });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const cookieUsers = readCookieUsers(req);
  if (usersByEmail.has(normalizedEmail) || cookieUsers.some((u) => u.email === normalizedEmail)) {
    return res.status(400).json({ detail: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: nextUserId++,
    email: normalizedEmail,
    hashedPassword,
    createdAt: new Date().toISOString(),
  };
  usersByEmail.set(normalizedEmail, user);
  writeCookieUsers(res, [...cookieUsers, { email: normalizedEmail, hashedPassword }]);

  return res.status(201).json({ id: user.id, email: user.email });
});

app.post('/api/v1/auth/token', async (req, res) => {
  const email = (req.body?.username || req.body?.email || '').trim().toLowerCase();
  const password = req.body?.password || '';

  let user = usersByEmail.get(email);
  if (!user) {
    const cookieUser = readCookieUsers(req).find((u) => u.email === email);
    if (cookieUser) {
      user = { email: cookieUser.email, hashedPassword: cookieUser.hashedPassword };
      usersByEmail.set(email, user);
    }
  }

  if (!user) {
    return res.status(401).json({ detail: 'Incorrect email or password' });
  }

  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) {
    return res.status(401).json({ detail: 'Incorrect email or password' });
  }

  const access_token = createAccessToken(user.email);
  return res.json({ access_token, token_type: 'bearer' });
});

// --- Workout Generator Logic ---
const PPL_SPLIT = {
  Push: ['Chest', 'Shoulders', 'Triceps'],
  Pull: ['Lats', 'Middle Back', 'Lower Back', 'Biceps', 'Forearms', 'Traps'],
  Legs: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Adductors', 'Abductors'],
  Core: ['Abdominals'],
};

const SETS_REPS_SCHEMA = {
  muscle_gain: '3-4 sets of 8-12 reps',
  fat_loss: '3 sets of 15-20 reps',
  strength_gain: '4-5 sets of 3-6 reps',
  maintenance: '3 sets of 10-12 reps',
};

function sampleItems(arr, count) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function generateWorkoutPlan({ user_level, goal, available_equipment }) {
  const equipmentSet = new Set(available_equipment || []);
  let filtered = EXERCISES_DATASET.filter(
    (ex) => ex.Level === user_level && equipmentSet.has(ex.Equipment)
  );

  if (filtered.length === 0) {
    filtered = EXERCISES_DATASET.filter((ex) => equipmentSet.has(ex.Equipment));
  }

  if (filtered.length === 0) {
    return { Error: "No exercises found for your criteria. Try adding more equipment like 'Body Weight'." };
  }

  const workoutPlan = {};
  const repsSets = SETS_REPS_SCHEMA[goal] || '3 sets of 10-12 reps';

  if (goal === 'fat_loss') {
    const compoundParts = ['Quadriceps', 'Hamstrings', 'Lats', 'Middle Back', 'Chest', 'Shoulders'];
    for (let i = 1; i <= 3; i++) {
      const dayExercises = [];
      for (const part of compoundParts) {
        const partExercises = filtered.filter((ex) => ex.BodyPart === part);
        if (partExercises.length > 0) {
          const [selected] = sampleItems(partExercises, 1);
          dayExercises.push({
            Exercise: selected.Name,
            BodyPart: selected.BodyPart,
            SetsReps: repsSets,
          });
        }
      }
      if (dayExercises.length > 0) {
        workoutPlan[`Day ${i}: Full Body`] = dayExercises;
      }
    }
  } else {
    for (const [day, bodyParts] of Object.entries(PPL_SPLIT)) {
      const dayExercises = [];
      for (const part of bodyParts) {
        const partExercises = filtered.filter((ex) => ex.BodyPart === part);
        const numSamples = Math.min(2, partExercises.length);
        if (numSamples > 0) {
          const selected = sampleItems(partExercises, numSamples);
          for (const row of selected) {
            dayExercises.push({
              Exercise: row.Name,
              BodyPart: row.BodyPart,
              SetsReps: repsSets,
            });
          }
        }
      }
      if (dayExercises.length > 0) {
        workoutPlan[`Day ${Object.keys(workoutPlan).length + 1}: ${day}`] = dayExercises;
      }
    }
  }

  return workoutPlan;
}

app.post('/api/v1/generate-workout', requireAuth, (req, res) => {
  const { user_level, goal, available_equipment } = req.body || {};
  if (!user_level || !goal || !Array.isArray(available_equipment) || available_equipment.length === 0) {
    return res.status(422).json({ detail: 'Please select fitness level, goal, and at least one equipment option.' });
  }

  const plan = generateWorkoutPlan({ user_level, goal, available_equipment });
  if (plan.Error) {
    return res.status(400).json({ detail: plan.Error });
  }
  return res.json({ workout_plan: plan });
});

// --- Diet Generator Logic ---
function calculateTdee({ gender, weight_kg, height_cm, age, activity_level }) {
  const bmr =
    String(gender).toLowerCase() === 'male'
      ? 88.362 + 13.397 * weight_kg + 4.799 * height_cm - 5.677 * age
      : 447.593 + 9.247 * weight_kg + 3.098 * height_cm - 4.33 * age;
  return bmr * activity_level;
}

function calculateMacros({ tdee, goal }) {
  let calorieTarget = tdee;
  if (goal === 'fat_loss') calorieTarget = tdee - 500;
  else if (goal === 'muscle_gain') calorieTarget = tdee + 500;
  calorieTarget = Math.max(1200, calorieTarget);

  return {
    calories: Math.round(calorieTarget),
    protein: Math.round((calorieTarget * 0.3) / 4),
    carbs: Math.round((calorieTarget * 0.4) / 4),
    fat: Math.round((calorieTarget * 0.3) / 9),
  };
}

function generateDietPlan(dailyTargets) {
  const mealPlan = {
    Breakfast: { items: [], totals: { Calories: 0, Protein: 0, Fat: 0, Carbs: 0 } },
    Lunch: { items: [], totals: { Calories: 0, Protein: 0, Fat: 0, Carbs: 0 } },
    Dinner: { items: [], totals: { Calories: 0, Protein: 0, Fat: 0, Carbs: 0 } },
  };
  const mealDistribution = { Breakfast: 0.25, Lunch: 0.4, Dinner: 0.35 };

  const leanProteinFoods = FOOD_DATASET.filter((f) => f.Protein > 10 && f.Leanness > 0.3);
  const fillerFoods = FOOD_DATASET.filter((f) => f.Carbs > 15 && f.Leanness < 0.2);

  for (const [mealName, percentage] of Object.entries(mealDistribution)) {
    const mealTargets = {
      calories: dailyTargets.calories * percentage,
      protein: dailyTargets.protein * percentage,
    };
    const mealObj = mealPlan[mealName];

    if (leanProteinFoods.length > 0) {
      const [foodSample] = sampleItems(leanProteinFoods, 1);
      const targetProtein = mealTargets.protein * 0.8;
      const pPortion = foodSample.Protein > 0 ? Math.round((targetProtein / foodSample.Protein) * 100) : 100;
      const cPortion = foodSample.Calories > 0 ? Math.round((mealTargets.calories / foodSample.Calories) * 100) : 100;
      const portionG = Math.min(Math.max(Math.min(pPortion, cPortion), 50), 300);
      const mult = portionG / 100;

      const item = {
        Food: foodSample.Food,
        'Portion (g)': portionG,
        Calories: Math.round(foodSample.Calories * mult),
        Protein: Math.round(foodSample.Protein * mult),
        Fat: Math.round(foodSample.Fat * mult),
        Carbs: Math.round(foodSample.Carbs * mult),
      };
      mealObj.items.push(item);
      for (const key of ['Calories', 'Protein', 'Fat', 'Carbs']) {
        mealObj.totals[key] += item[key];
      }
    }

    let caloriesNeeded = mealTargets.calories - mealObj.totals.Calories;
    while (caloriesNeeded > 100 && mealObj.items.length < 3 && fillerFoods.length > 0) {
      const [foodSample] = sampleItems(fillerFoods, 1);
      const rawPortion = foodSample.Calories > 0 ? Math.round((caloriesNeeded / foodSample.Calories) * 100) : 50;
      const portionG = Math.min(Math.max(rawPortion, 50), 250);
      const mult = portionG / 100;

      const item = {
        Food: foodSample.Food,
        'Portion (g)': portionG,
        Calories: Math.round(foodSample.Calories * mult),
        Protein: Math.round(foodSample.Protein * mult),
        Fat: Math.round(foodSample.Fat * mult),
        Carbs: Math.round(foodSample.Carbs * mult),
      };
      mealObj.items.push(item);
      for (const key of ['Calories', 'Protein', 'Fat', 'Carbs']) {
        mealObj.totals[key] += item[key];
      }
      caloriesNeeded -= item.Calories;
    }
  }

  return mealPlan;
}

app.post('/api/v1/generate-diet', requireAuth, (req, res) => {
  const { gender, weight_kg, height_cm, age, activity_level, goal } = req.body || {};
  if (!gender || !weight_kg || !height_cm || !age || !activity_level || !goal) {
    return res.status(422).json({ detail: 'All body metrics and goals are required.' });
  }

  const tdee = calculateTdee({
    gender,
    weight_kg: Number(weight_kg),
    height_cm: Number(height_cm),
    age: Number(age),
    activity_level: Number(activity_level),
  });
  const macros = calculateMacros({ tdee, goal });
  const plan = generateDietPlan(macros);

  return res.json({ daily_targets: macros, diet_plan: plan });
});

export default app;
