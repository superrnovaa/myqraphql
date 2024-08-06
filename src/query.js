export async function fetchUserData(query) {
    try {    

      const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ query: query }),
      });

      if (response.ok) {
        const data = await response.json();
       // console.log(data.data);
        return (data.data)
        
    
      } else {
        const errorData = await response.json();
        console.error('Error fetching user data:', errorData);
        sessionStorage.setItem('jwt', null)
        window.location.href = '#login'
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

