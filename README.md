A simple task manager app built using the MERN stack (MongoDB, Express, React, Node.js). This app lets you add, update, delete, and mark tasks as completed.
Clone the Project,
Setup the Backend:
cd backend,
Install dependencies:
npm install
Create a .env file inside the backend folder and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
Run the backend server:node server.js


 Setup the Frontend
 cd frontend
Install frontend dependencies:
npm install
Create a .env file inside the frontend folder and add:
VITE_API_URL=http://localhost:5000/api/tasks(it it not there)


Future Improvements:
   User Authentication,
  Search and Filter Tasks,
   Responsive Design,
