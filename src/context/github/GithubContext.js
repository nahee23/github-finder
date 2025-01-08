import { createContext, useState } from "react";

const GithubContext = createContext();
// 깃허브주소와 토큰 변수지정
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//provider가 전역으로 context를 적용함
export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); //true면 로딩중, false면 로딩완료
  const fetchUsers = () => {
    fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        //Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN} 도 가능`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false); //로딩 완료
      })
      .catch((err) => console.error(err));
  };
  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
