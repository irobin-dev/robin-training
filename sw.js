const CACHE = 'robin-training-v4';

const PRECACHE = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap',
  'images/exercises/Ankle_Circles/0.jpg',
  'images/exercises/Ankle_Circles/1.jpg',
  'images/exercises/Anterior_Tibialis-SMR/0.jpg',
  'images/exercises/Anterior_Tibialis-SMR/1.jpg',
  'images/exercises/Balance_Board/0.jpg',
  'images/exercises/Balance_Board/1.jpg',
  'images/exercises/Ball_Leg_Curl/0.jpg',
  'images/exercises/Ball_Leg_Curl/1.jpg',
  'images/exercises/Band_Pull_Apart/0.jpg',
  'images/exercises/Band_Pull_Apart/1.jpg',
  'images/exercises/Barbell_Ab_Rollout_-_On_Knees/0.jpg',
  'images/exercises/Barbell_Ab_Rollout_-_On_Knees/1.jpg',
  'images/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg',
  'images/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg',
  'images/exercises/Barbell_Deadlift/0.jpg',
  'images/exercises/Barbell_Deadlift/1.jpg',
  'images/exercises/Barbell_Glute_Bridge/0.jpg',
  'images/exercises/Barbell_Glute_Bridge/1.jpg',
  'images/exercises/Barbell_Hip_Thrust/0.jpg',
  'images/exercises/Barbell_Hip_Thrust/1.jpg',
  'images/exercises/Barbell_Shoulder_Press/0.jpg',
  'images/exercises/Barbell_Shoulder_Press/1.jpg',
  'images/exercises/Barbell_Shrug/0.jpg',
  'images/exercises/Barbell_Shrug/1.jpg',
  'images/exercises/Barbell_Squat/0.jpg',
  'images/exercises/Barbell_Squat/1.jpg',
  'images/exercises/Battling_Ropes/0.jpg',
  'images/exercises/Battling_Ropes/1.jpg',
  'images/exercises/Behind_Head_Chest_Stretch/0.jpg',
  'images/exercises/Behind_Head_Chest_Stretch/1.jpg',
  'images/exercises/Bent_Over_Barbell_Row/0.jpg',
  'images/exercises/Bent_Over_Barbell_Row/1.jpg',
  'images/exercises/Bodyweight_Walking_Lunge/0.jpg',
  'images/exercises/Bodyweight_Walking_Lunge/1.jpg',
  'images/exercises/Cable_Hip_Adduction/0.jpg',
  'images/exercises/Cable_Hip_Adduction/1.jpg',
  'images/exercises/Cable_Seated_Lateral_Raise/0.jpg',
  'images/exercises/Cable_Seated_Lateral_Raise/1.jpg',
  'images/exercises/Calf_Stretch_Hands_Against_Wall/0.jpg',
  'images/exercises/Calf_Stretch_Hands_Against_Wall/1.jpg',
  'images/exercises/Cat_Stretch/0.jpg',
  'images/exercises/Cat_Stretch/1.jpg',
  'images/exercises/Dead_Bug/0.jpg',
  'images/exercises/Dead_Bug/1.jpg',
  'images/exercises/Dumbbell_Seated_One-Leg_Calf_Raise/0.jpg',
  'images/exercises/Dumbbell_Seated_One-Leg_Calf_Raise/1.jpg',
  'images/exercises/Face_Pull/0.jpg',
  'images/exercises/Face_Pull/1.jpg',
  'images/exercises/Farmers_Walk/0.jpg',
  'images/exercises/Farmers_Walk/1.jpg',
  'images/exercises/Freehand_Jump_Squat/0.jpg',
  'images/exercises/Freehand_Jump_Squat/1.jpg',
  'images/exercises/Front_Box_Jump/0.jpg',
  'images/exercises/Front_Box_Jump/1.jpg',
  'images/exercises/Hammer_Curls/0.jpg',
  'images/exercises/Hammer_Curls/1.jpg',
  'images/exercises/Hanging_Leg_Raise/0.jpg',
  'images/exercises/Hanging_Leg_Raise/1.jpg',
  'images/exercises/Incline_Dumbbell_Press/0.jpg',
  'images/exercises/Incline_Dumbbell_Press/1.jpg',
  'images/exercises/Isometric_Neck_Exercise_-_Front_And_Back/0.jpg',
  'images/exercises/Isometric_Neck_Exercise_-_Front_And_Back/1.jpg',
  'images/exercises/Isometric_Neck_Exercise_-_Sides/0.jpg',
  'images/exercises/Isometric_Neck_Exercise_-_Sides/1.jpg',
  'images/exercises/IT_Band_and_Glute_Stretch/0.jpg',
  'images/exercises/IT_Band_and_Glute_Stretch/1.jpg',
  'images/exercises/Kneeling_Hip_Flexor/0.jpg',
  'images/exercises/Kneeling_Hip_Flexor/1.jpg',
  'images/exercises/Leg_Extensions/0.jpg',
  'images/exercises/Leg_Extensions/1.jpg',
  'images/exercises/Lying_Leg_Curls/0.jpg',
  'images/exercises/Lying_Leg_Curls/1.jpg',
  'images/exercises/Monster_Walk/0.jpg',
  'images/exercises/Monster_Walk/1.jpg',
  'images/exercises/Natural_Glute_Ham_Raise/0.jpg',
  'images/exercises/Natural_Glute_Ham_Raise/1.jpg',
  'images/exercises/One-Arm_Kettlebell_Swings/0.jpg',
  'images/exercises/One-Arm_Kettlebell_Swings/1.jpg',
  'images/exercises/Pallof_Press/0.jpg',
  'images/exercises/Pallof_Press/1.jpg',
  'images/exercises/Plank/0.jpg',
  'images/exercises/Plank/1.jpg',
  'images/exercises/Rack_Pulls/0.jpg',
  'images/exercises/Rack_Pulls/1.jpg',
  'images/exercises/Rocking_Standing_Calf_Raise/0.jpg',
  'images/exercises/Rocking_Standing_Calf_Raise/1.jpg',
  'images/exercises/Romanian_Deadlift/0.jpg',
  'images/exercises/Romanian_Deadlift/1.jpg',
  'images/exercises/Rope_Jumping/0.jpg',
  'images/exercises/Rope_Jumping/1.jpg',
  'images/exercises/Seated_Cable_Rows/0.jpg',
  'images/exercises/Seated_Cable_Rows/1.jpg',
  'images/exercises/Shoulder_Circles/0.jpg',
  'images/exercises/Shoulder_Circles/1.jpg',
  'images/exercises/Side_Bridge/0.jpg',
  'images/exercises/Side_Bridge/1.jpg',
  'images/exercises/Side_Neck_Stretch/0.jpg',
  'images/exercises/Side_Neck_Stretch/1.jpg',
  'images/exercises/Split_Squat_with_Dumbbells/0.jpg',
  'images/exercises/Split_Squat_with_Dumbbells/1.jpg',
  'images/exercises/Thigh_Abductor/0.jpg',
  'images/exercises/Thigh_Abductor/1.jpg',
  'images/exercises/Triceps_Pushdown_-_Rope_Attachment/0.jpg',
  'images/exercises/Triceps_Pushdown_-_Rope_Attachment/1.jpg',
  'images/exercises/Weighted_Pull_Ups/0.jpg',
  'images/exercises/Weighted_Pull_Ups/1.jpg',
  'images/exercises/Worlds_Greatest_Stretch/0.jpg',
  'images/exercises/Worlds_Greatest_Stretch/1.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(PRECACHE.map(url => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only handle GET requests
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Google Fonts: stale-while-revalidate so fonts work offline
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const network = fetch(e.request).then(res => {
            cache.put(e.request, res.clone());
            return res;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // Same-origin: cache-first, fall back to network
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          return caches.open(CACHE).then(cache => {
            cache.put(e.request, res.clone());
            return res;
          });
        })
      )
    );
  }
});
