import { useState } from 'react';
import './index.css';
import {auditRatio, fetchUserData, createSkillBarChart, timeline} from './func';

function App() {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [isUsernameLogin, setIsUsernameLogin] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encodedCredentials = btoa(`${credentials.usernameOrEmail}:${credentials.password}`);
      const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('jwt', data);
        window.location.href = '/profile';
        console.log("ww");
        fetchUserData();
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData.error);
        alert(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove the JWT token from localStorage
    setAuthenticatedUser(null); // Reset the authenticated user
    window.location.href = '/'; // Redirect the user to the login page
  };

 

  return (
    <div className= "stuff" >
      {window.location.pathname === '/profile' ? (
        <div className="container">
          {/* Navigation Bar */}
          <div className="nav-bar">
            <div className="nav-link"><a href="/profile">Profile</a></div>
            <div className="nav-link"><a href="/settings">Settings</a></div>
            <div className="nav-link"><a href="/notifications">Notifications</a></div>
            <div className="nav-link"><a href="#" onClick={handleLogout}>Logout</a></div>
          </div>

          {/* Body Sections */}
          <div className="profile-body">
          <div className="section">
         <div className="chart1"></div>
            
              
              {/* Overview content goes here */}
            </div>

            <div className="section">
            <svg className="chart"></svg>
              {/* Activity content goes here */}
            </div>

            <div className="section">
            <div className="chart2"></div>
            
              {/* Settings content goes here */}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {authenticatedUser ? (
            <div>
              <p>Logged in as {authenticatedUser.name} ({authenticatedUser.email})</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <label>
                  {isUsernameLogin ? 'Username' : 'Email'}:
                  <input
                    type="text"
                    name="usernameOrEmail"
                    value={credentials.usernameOrEmail}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="button" onClick={() => setIsUsernameLogin(!isUsernameLogin)}>
                  {isUsernameLogin ? 'Use Email' : 'Use Username'}
                </button>
                <button type="submit">Login</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
auditRatio();
fetchUserData();
const data = [
  { type: 'skill_go', amount: 40 },
  { type: 'skill_algo', amount: 35 },
  { type: 'skill_go', amount: 45 },
  { type: 'skill_sql', amount: 25 },
  { type: 'skill_html', amount: 35 },
  { type: 'skill_docker', amount: 15 },
  { type: 'skill_back-end', amount: 35 },
  { type: 'skill_front-end', amount: 40 },
  { type: 'skill_sys-admin', amount: 5 },
  { type: 'skill_go', amount: 47 },
  { type: 'skill_html', amount: 35 }
];

  const data2 = [
  {
    "amount": 34375,
    "type": "xp",
    "createdAt": "2024-01-21T16:48:57.464043+00:00",
    "path": "/bahrain/bh-module/lem-in"
  },
  {
    "amount": 76250,
    "type": "xp",
    "createdAt": "2024-04-21T20:02:52.592343+00:00",
    "path": "/bahrain/bh-module/forum"
  },
  {
    "amount": 19100,
    "type": "xp",
    "createdAt": "2024-04-30T07:35:48.704432+00:00",
    "path": "/bahrain/bh-module/image-upload"
  },
  {
    "amount": 10000,
    "type": "xp",
    "createdAt": "2024-06-04T09:11:22.838281+00:00",
    "path": "/bahrain/bh-module/math-skills"
  },
  {
    "amount": 147000,
    "type": "xp",
    "createdAt": "2024-06-10T14:13:07.327948+00:00",
    "path": "/bahrain/bh-module/make-your-game"
  },
  {
    "amount": 19100,
    "type": "xp",
    "createdAt": "2024-06-15T07:43:56.520606+00:00",
    "path": "/bahrain/bh-module/authentication"
  },
  {
    "amount": 19100,
    "type": "xp",
    "createdAt": "2024-06-22T13:39:42.462209+00:00",
    "path": "/bahrain/bh-module/advanced-features"
  }
];

createSkillBarChart(data);
timeline(data2)
export default App;



// xps
// query {
//   transaction_aggregate(
//     where: {
//       event: { path: { _eq: "/bahrain/bh-module" } }
//       type: { _eq: "xp" }
//     }
//   ) {
//     aggregate {
//       sum {
//  creatat
//         amount
//       }
//     }
//   }
// }

//level

// query {
//   level: transaction(
//                              limit: 1
//                              order_by: { amount: desc }
//                              where: {
//                                  userId: { _eq: 773 }
//                                  type: { _eq: "level" }
//                                  }
                             
//                              ) { amount }
//                          }



//in progress 

// query {
//   progress(
//     where: { isDone: { _eq: false }, object: { type: { _eq: "project" } } }
//   ) {
//     object {
//       name
//     }
//   }
// }

//skills

// query {
//   user {
//       transactions (
//              where: { type: { _like: "skill_%" }}
//       )
//       {
//           type
//           amount
//       }
//   }
// }


//timeline
// query {
//   user {
//     login
//     timeline: transactions(
// where: {type: {_eq: "xp"}, _and:[
// {path: {
//   _nlike: "%/bh-piscine/%"},
//   _or: [
//     {
//       path:{_nlike: "%/piscine-js/%"
//       }}
//   ],_and:[{
//       path:{_nlike: "%/checkpoint/%"
//   }}]
    
  

// }]}
// ) {

//       amount
// type
//       createdAt
//       path
//     }
//   }
// }