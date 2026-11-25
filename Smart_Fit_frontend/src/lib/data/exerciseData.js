// src/lib/data/exerciseData.js
// --- FINAL, COMPLETE DATA SOURCE V7 ---
// Now includes unique, hardcoded instructions for each exercise.

export const allExercises = [
  // --- Chest ---
  { id: 1, Title: "Push-up", BodyPart: "Chest", Equipment: "Body Weight", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/1.PNG", youtubeId: "IODxDxX7oi4",
    instructions: [
      "Start in a high plank position with hands slightly wider than your shoulders.",
      "Lower your body until your chest nearly touches the floor, keeping your elbows close to your body.",
      "Push back up to the starting position, maintaining a straight line from head to heels.",
      "Engage your core and glutes throughout the movement to prevent your hips from sagging."
    ]
  },
  { id: 2, Title: "Dumbbell Bench Press", BodyPart: "Chest", Equipment: "Dumbbell", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/2.jpg", youtubeId: "vcBig73ojpE",
    instructions: [
      "Lie on a flat bench with a dumbbell in each hand, positioned at the sides of your chest.",
      "Plant your feet firmly on the ground. Push the dumbbells up until your arms are fully extended over your chest.",
      "Slowly lower the dumbbells back to the starting position.",
      "Keep your back flat on the bench throughout the exercise."
    ]
  },
  { id: 3, Title: "Barbell Bench Press", BodyPart: "Chest", Equipment: "Barbell", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/3.PNG", youtubeId: "rT7DgCr-3pg",
    instructions: [
      "Lie on a flat bench and grip the barbell with hands slightly wider than shoulder-width.",
      "Lift the bar from the rack and lower it slowly to your mid-chest.",
      "Press the bar upwards by extending your arms until it's back in the starting position.",
      "Ensure your spotter is ready. Keep your feet planted and avoid arching your back excessively."
    ]
  },
  { id: 4, Title: "Incline Dumbbell Fly", BodyPart: "Chest", Equipment: "Dumbbell", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/4.PNG", youtubeId: "idAvu2HvqSQ",
    instructions: [
        "Lie on an incline bench with a dumbbell in each hand, palms facing each other.",
        "With a slight bend in your elbows, lower the weights out to your sides in a wide arc.",
        "Feel the stretch in your chest, then bring the dumbbells back to the starting position using the same arc.",
        "Focus on squeezing your chest muscles at the top of the movement."
    ]
  },
  { id: 5, Title: "Cable Crossover", BodyPart: "Chest", Equipment: "Cable", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/5.gif", youtubeId: "qRS3cn89gBE",
    instructions: [
        "Set the pulleys on a cable machine to a high position. Grab the handles with each hand.",
        "Take a step forward and, with a slight bend in your elbows, pull the handles down and across your body.",
        "Squeeze your chest at the peak contraction, then slowly return to the starting position.",
        "Maintain a stable stance and keep your core engaged."
    ]
  },

  // --- Back ---
  { id: 6, Title: "Pull-up", BodyPart: "Lats", Equipment: "Body Weight", Level: "Advance", Type: "Strength", 
    imageUrl: "/exercises/6.PNG", youtubeId: "aAggnpPyR6E",
    instructions: [
        "Grab the pull-up bar with an overhand grip, slightly wider than your shoulders.",
        "Hang with your arms fully extended. Engage your back and biceps.",
        "Pull your body up until your chin is over the bar.",
        "Slowly lower yourself back down to the starting position."
    ]
  },
  { id: 7, Title: "Dumbbell Row", BodyPart: "Middle Back", Equipment: "Dumbbell", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/7.PNG", youtubeId: "pYcpY20QaE8",
    instructions: [
        "Place one knee and one hand on a flat bench. Hold a dumbbell in the opposite hand.",
        "Keeping your back straight, pull the dumbbell up towards your hip.",
        "Squeeze your back and lat muscles at the top of the movement.",
        "Lower the dumbbell slowly and with control. Repeat for the other side."
    ]
  },
  { id: 8, Title: "Barbell Deadlift", BodyPart: "Lower Back", Equipment: "Barbell", Level: "Advance", Type: "Strength", 
    imageUrl: "/exercises/8.PNG", youtubeId: "ytGaGIn3SjE",
    instructions: [
        "Stand with your mid-foot under the barbell. Bend at the hips and knees to grip the bar.",
        "Keeping your back straight, chest up, and core tight, lift the bar by extending your hips and knees.",
        "Stand up tall, pulling your shoulders back. The bar should be held in front of your thighs.",
        "Lower the bar by reversing the motion, maintaining control and a flat back."
    ]
  },
  { id: 9, Title: "Lat Pulldown", BodyPart: "Lats", Equipment: "Cable", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/9.jpg", youtubeId: "qMLOzlpHvDk",
    instructions: [
        "Sit at the lat pulldown machine and secure your knees under the pads.",
        "Grab the bar with a wide, overhand grip.",
        "Pull the bar down towards your upper chest, squeezing your lats.",
        "Slowly release the bar back to the starting position, maintaining control."
    ]
  },
  { id: 10, Title: "Face Pull", BodyPart: "Shoulders", Equipment: "Cable", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/10.jpg", youtubeId: "rep-qVOkqgk",
    instructions: [
        "Set a rope attachment on a cable machine at face level.",
        "Grip the rope with both hands and step back to create tension.",
        "Pull the rope towards your face, separating your hands as you pull.",
        "Squeeze your rear deltoids and upper back, then slowly return to the start."
    ]
  },

  // --- Legs ---
  { id: 11, Title: "Bodyweight Squat", BodyPart: "Quadriceps", Equipment: "Body Weight", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/11.png", youtubeId: "C_VtOYc6j5c",
    instructions: [
        "Stand with your feet shoulder-width apart, toes pointing slightly outwards.",
        "Lower your hips back and down as if sitting in a chair, keeping your chest up.",
        "Go as low as you can comfortably, aiming for your thighs to be parallel to the floor.",
        "Push through your heels to return to the starting position."
    ]
  },
  { id: 12, Title: "Dumbbell Lunge", BodyPart: "Quadriceps", Equipment: "Dumbbell", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/12.jpg", youtubeId: "D7KaRcUTQeE",
    instructions: [
        "Stand tall, holding a dumbbell in each hand at your sides.",
        "Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle.",
        "Ensure your front knee is directly above your ankle and your back knee hovers just above the ground.",
        "Push off your front foot to return to the starting position. Alternate legs."
    ]
  },
  { id: 13, Title: "Barbell Squat", BodyPart: "Quadriceps", Equipment: "Barbell", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/13.gif", youtubeId: "bEv6CCg2BC8",
    instructions: [
        "Position a barbell on your upper back/traps, not on your neck.",
        "Stand with feet shoulder-width apart. Keep your chest up and core tight.",
        "Lower into a squat by bending your knees and hips, as if sitting back.",
        "Drive through your heels to push yourself back up to a standing position."
    ]
  },
  { id: 14, Title: "Kettlebell Swing", BodyPart: "Hamstrings", Equipment: "Kettlebells", Level: "Intermediate", Type: "Cardio", 
    imageUrl: "/exercises/14.webp", youtubeId: "YSxHifyI6s8",
    instructions: [
        "Stand with feet slightly wider than shoulder-width. Hold the kettlebell with both hands.",
        "Hinge at your hips, swinging the kettlebell back between your legs.",
        "Drive your hips forward explosively to swing the kettlebell up to chest level.",
        "Let the kettlebell swing back down naturally, controlling its path. This is a hip-driven, not an arm, movement."
    ]
  },
  { id: 15, Title: "Leg Press", BodyPart: "Quadriceps", Equipment: "Machine", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/15.webp", youtubeId: "oujca3_Shgw",
    instructions: [
        "Sit on the leg press machine with your back and head resting comfortably against the padded support.",
        "Place your feet on the platform about shoulder-width apart.",
        "Push the platform away from you by extending your knees and hips.",
        "Slowly lower the platform back to the starting position. Do not lock your knees at the top."
    ]
  },
  { id: 16, Title: "Glute Bridge", BodyPart: "Glutes", Equipment: "Body Weight", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/16.jpg", youtubeId: "wPM8icPu6H8",
    instructions: [
        "Lie on your back with your knees bent, feet flat on the floor, and arms at your sides.",
        "Engage your core and glutes, then lift your hips off the floor until your body forms a straight line from shoulders to knees.",
        "Squeeze your glutes at the top of the movement.",
        "Lower your hips back down to the starting position."
    ]
  },
  
  // --- Shoulders, Biceps, Triceps, Abs continue with similar logic...
  { id: 17, Title: "Overhead Press (Barbell)", BodyPart: "Shoulders", Equipment: "Barbell", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/17.webp", youtubeId: "2yjwXTZQDDI",
    instructions: ["Hold a barbell at shoulder height. Press it directly overhead until your arms are fully extended.", "Keep your core tight and avoid arching your back.", "Lower the bar back to your shoulders under control."]},
  { id: 18, Title: "Dumbbell Lateral Raise", BodyPart: "Shoulders", Equipment: "Dumbbell", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/18.webp", youtubeId: "3VcKaXpzqRo",
    instructions: ["Stand holding a dumbbell in each hand at your sides.", "With a slight bend in your elbows, raise your arms out to the sides until they are at shoulder level.", "Lower the dumbbells back down slowly."]},
  { id: 19, Title: "Pike Push-up", BodyPart: "Shoulders", Equipment: "Body Weight", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/19.jpg", youtubeId: "XckEEwa1BPI",
    instructions: ["Start in a downward dog yoga pose, with your hips high in the air.", "Lower the top of your head towards the floor by bending your elbows.", "Push back up to the starting position."]},
  { id: 20, Title: "Dumbbell Bicep Curl", BodyPart: "Biceps", Equipment: "Dumbbell", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/20.webp", youtubeId: "ykJmrZ5v0Oo",
    instructions: ["Stand or sit holding a dumbbell in each hand with an underhand grip.", "Curl the weights up towards your shoulders, keeping your elbows stationary.", "Squeeze your biceps at the top, then slowly lower the weights."]},
  { id: 21, Title: "Chin-up", BodyPart: "Biceps", Equipment: "Body Weight", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/21.jpg", youtubeId: "brhRXlOhsAM",
    instructions: ["Grab the bar with an underhand, shoulder-width grip.", "Pull your body up until your chin is over the bar, focusing on using your biceps.", "Lower yourself back down slowly."]},
  { id: 22, Title: "Barbell Curl", BodyPart: "Biceps", Equipment: "Barbell", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/22.avif", youtubeId: "ZQWL7omZh94",
    instructions: ["Hold a barbell with an underhand grip, hands shoulder-width apart.", "Keeping your upper arms stationary, curl the bar towards your chest.", "Squeeze your biceps, then lower the bar with control."]},
  { id: 23, Title: "Tricep Dips (Bodyweight)", BodyPart: "Triceps", Equipment: "Body Weight", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/23.webp", youtubeId: "0326dy_-CzM",
    instructions: ["Use a bench or chair. Place your hands on the edge, fingers pointing forward.", "Extend your legs out. Lower your body by bending your elbows until they are at a 90-degree angle.", "Push back up to the starting position using your triceps."]},
  { id: 24, Title: "Tricep Pushdown", BodyPart: "Triceps", Equipment: "Cable", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/24.webp", youtubeId: "2-LAMcpzODU",
    instructions: ["Attach a straight bar or rope to a high pulley on a cable machine.", "Grip the attachment and push down until your arms are fully extended.", "Keep your elbows tucked into your sides.", "Slowly return to the starting position."]},
  { id: 25, Title: "Dumbbell Skull Crusher", BodyPart: "Triceps", Equipment: "Dumbbell", Level: "Intermediate", Type: "Strength", 
    imageUrl: "/exercises/25.webp", youtubeId: "d_KZxkY_0cM",
    instructions: ["Lie on a bench holding two dumbbells directly over your chest.", "Lower the dumbbells by bending your elbows, bringing them down towards the sides of your head.", "Extend your arms to push the dumbbells back to the start."]},
  { id: 26, Title: "Plank", BodyPart: "Abdominals", Equipment: "Body Weight", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/26.jpg", youtubeId: "pSHjTRCQxIw",
    instructions: ["Lie face down and prop yourself up on your forearms and toes.", "Keep your body in a perfectly straight line from head to heels.", "Engage your core and glutes. Hold this position."]},
  { id: 27, Title: "Crunch", BodyPart: "Abdominals", Equipment: "Body Weight", Level: "Beginner", Type: "Strength", 
    imageUrl: "/exercises/27.jpg", youtubeId: "Xyd_fa5zoEU",
    instructions: ["Lie on your back with your knees bent and feet flat on the floor.", "Place your hands behind your head or across your chest.", "Lift your upper back and shoulders off the floor, curling your rib cage towards your pelvis.", "Lower back down with control."]},
  { id: 28, Title: "Hanging Leg Raise", BodyPart: "Abdominals", Equipment: "Body Weight", Level: "Advance", Type: "Strength", 
    imageUrl: "/exercises/28.webp", youtubeId: "RuIdJSVTKO4",
    instructions: ["Hang from a pull-up bar with your arms fully extended.", "Keeping your legs straight, raise them up until they are parallel to the floor.", "Engage your lower abs to lift, avoid swinging.", "Slowly lower your legs back down."]},
];