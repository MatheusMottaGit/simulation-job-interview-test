import axios from "axios"
import { useEffect, useState } from "react"
import { Repos } from "./types/types"

import '../main.css'

import { SetRepoToLocalStorage } from "./browser/localStorage"

function App() {

      const[repos, setRepos] = useState<Repos[]>([])
      const[favRepos, setFavRepos] = useState<Repos[]>([])

      useEffect(()=>{
        axios.get('https://api.github.com/users/MatheusMottaGit/repos')
          .then(response=>{
            setRepos(response.data)
          })
      }, [])

      const handleFavorite = (id: number) =>{
        const turnToFav = repos.map(repo=>{
          return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
        })

        setRepos(turnToFav)

        const filterFavs = turnToFav.filter(repo=>repo.favorite === true)
        SetRepoToLocalStorage(filterFavs)
      }

        useEffect(()=>{
            const favoriteRepos = localStorage.getItem('favorites')
              if(favoriteRepos){
                setFavRepos(JSON.parse(favoriteRepos))
              }
        }, [])
      
  return (
    <>
      <h1>Repositories</h1>
      {
        repos.map(repo=>{
          return(
            <div className='repos'>
              <p key={repo.id}>
                {repo.name}
              </p>
              {
                repo.favorite && <span>(now is favorite)</span>
              }
              <button onClick={()=>handleFavorite(repo.id)}>
                favorite
              </button>
            </div>
          )
        })
      }

      <h1>Favorite repositories</h1>
      {
        favRepos.map(favRepo=>{
          return(
            <p key={favRepo.id}>{favRepo.name}</p>
          )
        })
      }
    </>
  )
}

export default App
