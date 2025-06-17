// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Quiz = require('./models/Quiz');

const topics = [
  {
    title: 'Sports Quiz',
    description: 'Test your knowledge about sports.',
    created_by: 'Raghava',
    time_limit: 5,
    questions: [
      { text: 'How many players are in a soccer team?', type: 'multiple_choice', options: ['10', '11', '12', '9'], correct_answer: '11', points: 5 },
      { text: 'Which country won FIFA 2022?', type: 'multiple_choice', options: ['France', 'Argentina', 'Brazil', 'Germany'], correct_answer: 'Argentina', points: 5 },
      { text: 'Which sport uses a shuttlecock?', type: 'multiple_choice', options: ['Cricket', 'Badminton', 'Tennis', 'Hockey'], correct_answer: 'Badminton', points: 5 },
      { text: 'Who has the most Olympic golds?', type: 'multiple_choice', options: ['Usain Bolt', 'Michael Phelps', 'Carl Lewis', 'Simone Biles'], correct_answer: 'Michael Phelps', points: 5 },
      { text: 'Where were 2016 Olympics held?', type: 'multiple_choice', options: ['Tokyo', 'London', 'Beijing', 'Rio'], correct_answer: 'Rio', points: 5 },
      { text: 'Which country invented basketball?', type: 'multiple_choice', options: ['USA', 'UK', 'Germany', 'Canada'], correct_answer: 'USA', points: 5 },
      { text: 'What is the length of a cricket pitch?', type: 'multiple_choice', options: ['20 yards', '22 yards', '25 yards', '18 yards'], correct_answer: '22 yards', points: 5 },
      { text: 'Who won IPL 2023?', type: 'multiple_choice', options: ['CSK', 'GT', 'RCB', 'MI'], correct_answer: 'CSK', points: 5 },
      { text: 'Tennis Grand Slam in France is called?', type: 'multiple_choice', options: ['Wimbledon', 'US Open', 'Australian Open', 'French Open'], correct_answer: 'French Open', points: 5 },
      { text: 'What color card means send-off in football?', type: 'multiple_choice', options: ['Blue', 'Red', 'Yellow', 'Black'], correct_answer: 'Red', points: 5 }
    ]
  },

  {
    title: 'Tech Stack Quiz',
    description: 'Know your frontend and backend basics.',
    created_by: 'Raghava',
    time_limit: 5,
    questions: [
      { text: 'HTML stands for?', type: 'multiple_choice', options: ['HyperText Markup Language', 'HyperTech ML', 'HighText Machine Language', 'HyperTool ML'], correct_answer: 'HyperText Markup Language', points: 5 },
      { text: 'CSS is used for?', type: 'multiple_choice', options: ['Logic', 'Styling', 'Database', 'Routing'], correct_answer: 'Styling', points: 5 },
      { text: 'Which of these is a backend language?', type: 'multiple_choice', options: ['React', 'Node.js', 'HTML', 'CSS'], correct_answer: 'Node.js', points: 5 },
      { text: 'Express is built on?', type: 'multiple_choice', options: ['Python', 'Java', 'Node.js', 'PHP'], correct_answer: 'Node.js', points: 5 },
      { text: 'SQL is used for?', type: 'multiple_choice', options: ['Design', 'Styling', 'Data Query', 'Networking'], correct_answer: 'Data Query', points: 5 },
      { text: 'MongoDB stores data as?', type: 'multiple_choice', options: ['Tables', 'Documents', 'Sheets', 'Arrays'], correct_answer: 'Documents', points: 5 },
      { text: 'JavaScript is a?', type: 'multiple_choice', options: ['Styling Tool', 'Programming Language', 'Database', 'Framework'], correct_answer: 'Programming Language', points: 5 },
      { text: 'HTTP is?', type: 'multiple_choice', options: ['Protocol', 'Database', 'Language', 'Server'], correct_answer: 'Protocol', points: 5 },
      { text: 'AJAX stands for?', type: 'multiple_choice', options: ['Asynchronous JavaScript and XML', 'Advanced JSON API X', 'Auto Java XML', 'Async Job And X'], correct_answer: 'Asynchronous JavaScript and XML', points: 5 },
      { text: 'REST APIs use?', type: 'multiple_choice', options: ['UDP', 'TCP', 'HTTP', 'SSH'], correct_answer: 'HTTP', points: 5 }
    ]
  },

  {
    title: 'MERN Stack Quiz',
    description: 'Test your knowledge of the MERN stack!',
    created_by: 'Raghava',
    time_limit: 5,
    questions: [
      { text: 'MERN stands for?', type: 'multiple_choice', options: ['Mongo Express React Node', 'MySQL Express React Node', 'Mongo Elastic React Node', 'Mongo Express Redux Node'], correct_answer: 'Mongo Express React Node', points: 5 },
      { text: 'Which one is not part of MERN?', type: 'multiple_choice', options: ['React', 'Express', 'MongoDB', 'Angular'], correct_answer: 'Angular', points: 5 },
      { text: 'React uses which DOM?', type: 'multiple_choice', options: ['Real DOM', 'Fake DOM', 'Virtual DOM', 'Static DOM'], correct_answer: 'Virtual DOM', points: 5 },
      { text: 'Which command creates a new React app?', type: 'multiple_choice', options: ['create-react-app', 'new-react-app', 'start-react', 'init-react'], correct_answer: 'create-react-app', points: 5 },
      { text: 'Node.js is written in?', type: 'multiple_choice', options: ['Python', 'JavaScript', 'C++', 'Ruby'], correct_answer: 'JavaScript', points: 5 },
      { text: 'Which port is default for React dev server?', type: 'multiple_choice', options: ['3000', '5000', '8080', '27017'], correct_answer: '3000', points: 5 },
      { text: 'MongoDB stores data as?', type: 'multiple_choice', options: ['Collections', 'Tables', 'Schemas', 'Arrays'], correct_answer: 'Collections', points: 5 },
      { text: 'Which library is used for routing in React?', type: 'multiple_choice', options: ['react-router-dom', 'react-path', 'react-nav', 'express-router'], correct_answer: 'react-router-dom', points: 5 },
      { text: 'Express handles?', type: 'multiple_choice', options: ['Frontend', 'APIs & Routing', 'Database', 'Styling'], correct_answer: 'APIs & Routing', points: 5 },
      { text: 'React is a?', type: 'multiple_choice', options: ['Library', 'Framework', 'Language', 'Compiler'], correct_answer: 'Library', points: 5 }
    ]
  },

  {
    title: 'Core Java Quiz',
    description: 'How well do you know Java?',
    created_by: 'Raghava',
    time_limit: 5,
    questions: [
      { text: 'Which keyword is used to inherit a class in Java?', options: ['extends', 'implements', 'inherits', 'super'], correct_answer: 'extends', type: 'multiple_choice', points: 5 },
      { text: 'Which method is the entry point for any Java program?', options: ['start()', 'main()', 'init()', 'run()'], correct_answer: 'main()', type: 'multiple_choice', points: 5 },
      { text: 'Which keyword is used to define a constant in Java?', options: ['final', 'static', 'const', 'constant'], correct_answer: 'final', type: 'multiple_choice', points: 5 },
      { text: 'Which collection class allows you to grow or shrink its size and provides indexed access to its elements?', options: ['HashSet', 'ArrayList', 'TreeSet', 'LinkedList'], correct_answer: 'ArrayList', type: 'multiple_choice', points: 5 },
      { text: 'Which exception is thrown when dividing by zero?', options: ['ArithmeticException', 'IOException', 'NullPointerException', 'DivideByZeroException'], correct_answer: 'ArithmeticException', type: 'multiple_choice', points: 5 },
      { text: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'foreach'], correct_answer: 'do-while', type: 'multiple_choice', points: 5 },
      { text: 'Which of the following is not a Java keyword?', options: ['class', 'interface', 'String', 'enum'], correct_answer: 'String', type: 'multiple_choice', points: 5 },
      { text: 'Which package contains the Random class?', options: ['java.util', 'java.lang', 'java.io', 'java.math'], correct_answer: 'java.util', type: 'multiple_choice', points: 5 },
      { text: 'What is the default value of a boolean variable?', options: ['true', 'false', '0', 'null'], correct_answer: 'false', type: 'multiple_choice', points: 5 },
      { text: 'Which operator is used to compare two values?', options: ['=', '==', '!=', 'equals'], correct_answer: '==', type: 'multiple_choice', points: 5 }
    ]
  },

  {
    title: 'AI & ML Quiz',
    description: 'Test your AI & ML concepts!',
    created_by: 'Raghava',
    time_limit: 5,
    questions: [
      { text: 'Which type of learning uses labeled data?', options: ['Unsupervised', 'Supervised', 'Reinforcement', 'Deep'], correct_answer: 'Supervised', type: 'multiple_choice', points: 5 },
      { text: 'Which algorithm is used for classification?', options: ['Linear Regression', 'K-Means', 'K-NN', 'PCA'], correct_answer: 'K-NN', type: 'multiple_choice', points: 5 },
      { text: 'Which function is used to measure error in regression?', options: ['Loss', 'Accuracy', 'Precision', 'Recall'], correct_answer: 'Loss', type: 'multiple_choice', points: 5 },
      { text: 'Which ML technique involves reward signals?', options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Clustering'], correct_answer: 'Reinforcement', type: 'multiple_choice', points: 5 },
      { text: 'Neural networks are part of?', options: ['Classical AI', 'Rule-based Systems', 'Deep Learning', 'Symbolic AI'], correct_answer: 'Deep Learning', type: 'multiple_choice', points: 5 },
      { text: 'Which metric evaluates binary classification?', options: ['Accuracy', 'MSE', 'R2 Score', 'Silhouette Score'], correct_answer: 'Accuracy', type: 'multiple_choice', points: 5 },
      { text: 'Which of the following is an activation function?', options: ['relu', 'loss', 'mean', 'batch'], correct_answer: 'relu', type: 'multiple_choice', points: 5 },
      { text: 'PCA is used for?', options: ['Clustering', 'Classification', 'Dimensionality Reduction', 'Prediction'], correct_answer: 'Dimensionality Reduction', type: 'multiple_choice', points: 5 },
      { text: 'Which library is used for ML in Python?', options: ['TensorFlow', 'NumPy', 'Pandas', 'Matplotlib'], correct_answer: 'TensorFlow', type: 'multiple_choice', points: 5 },
      { text: 'Which type of model is used for sequential data?', options: ['CNN', 'SVM', 'RNN', 'KNN'], correct_answer: 'RNN', type: 'multiple_choice', points: 5 }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB connected');
  await Quiz.deleteMany({});
  await Quiz.insertMany(topics);
  console.log('Seeded quizzes ✅');
  process.exit();
});
