import { useAuth0 } from '@auth0/auth0-react';

function TestApi() {
  const { getAccessTokenSilently } = useAuth0();

  function callApi() {
    fetch('http://localhost:3001/')
      .then(async response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // async function callProtectedApi() {
  //   fetch('http://localhost:3001/protected')
  //     .then(async response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });

  //   const token = await getAccessTokenSilently();
  //   console.log(token); // ! TEST
  // }

  // const callProtectedApi = fetch('http://localhost:3001/protected')
  //   .then(async response => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  // * Same as above - async/await version (inside an async function)
  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      // console.log(token); // ! TEST
      const response = await fetch('http://localhost:3001/protected', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Protected API response:', data);
    } catch (error) {
      console.error('Protected API error:', error);
    }
  };

  return (
    <ul>
      <li>
        <button onClick={callApi}>Call API route</button>
      </li>

      <li>
        <button onClick={callProtectedApi}>Call protected API route</button>
      </li>
    </ul>
  )
};

export default TestApi;
