import { createContext, useState } from "react";

const GithubContext = createContext();
// 깃허브주소와 토큰 변수지정
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//provider가 전역으로 context를 적용함
export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false); //true면 로딩중, false면 로딩완료
  //유저들 클리어
  const clearUsers = () => setUsers([]);
  //테스트 유저 리스트 -> 키워드로 유저 찾기
  const searchUsers = (text) => {
    setLoading(true); //로딩중
    const params = new URLSearchParams({ q: text });
    fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        //Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN} 도 가능`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
        setLoading(false); //로딩 완료
      })
      .catch((err) => console.error(err));
  };
  //깃허브아이디로 유저찾기
  const getUser = (login) => {
    setLoading(true);
    fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false); //로딩완료!
      })
      .catch((err) => (window.location = "/notfound"));

    getUserRepos(login);
  };
  //유저 공개리포 리스트
  const getUserRepos = (login) => {
    setLoading(true);
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false); //로딩완료!
      })
      .catch((err) => console.log(err));
  };
  return (
    <GithubContext.Provider
      value={{
        users,
        repos,
        user,
        loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
