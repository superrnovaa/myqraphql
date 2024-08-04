import { useState } from 'react';
import './index.css';
import {AuditRatio} from './func';
import {CreateSkillBarChart} from './Skill';
import {Timeline} from './TimeLine';



function App() {
  
  const pathname = window.location.pathname;

  return (
    <div className="App">
      {pathname === '/login' ? (
        <LoginForm />
      ) : (
        <ProfilePage />
      ) }
      
    </div>
  );
}

export default App;

function LoginForm() {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [isUsernameLogin, setIsUsernameLogin] = useState(true);

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
        sessionStorage.setItem('jwt', data);
        window.location.href = "/Profile";
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

  return (
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
  );
}

function handleLogout() {
  sessionStorage.removeItem('jwt');
  window.location.href = "/login";
}

function ProfilePage() {
  console.log("hello");
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-link"><a href="/login" onClick={handleLogout}>Logout</a></div>
      </div>

      {/* Body Sections */}
      <div className="profile-body">
        <div className="section">
        <svg className="chart1"></svg>
          <CreateSkillBarChart/>
          {/* Overview content goes here */}
        </div>

        <div className="section">
        <div className='audit-ratio'></div>
          <svg className="chart"></svg>
          <AuditRatio/>
          {/* Activity content goes here */}
        </div>

        <div className="section">
        <svg className="chart2">
        </svg>
          <Timeline/>
          {/* Settings content goes here */}
        </div>
      </div>
    </div>
  );
}



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


