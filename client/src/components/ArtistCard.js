import React, { useState, useEffect } from 'react'
import { Header, Container, Grid, Image, Segment } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import FestivalCard from './FestivalCard.js'
// import { Card } from 'semantic-ui-react'

const ArtistCard = () => {
  const params = useParams()
  const [artist, setArtist] = useState(null)
  const [festivals, setFestivals] = useState(null)
  const [filteredFestivals, setFilteredFestivals] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/artists/${params.id}`)
      setArtist(data)
    }
    getData()
  }, [])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/festivals/')
      setFestivals(data)
    }
    getData()
  }, [])


  if (artist === null) return null
  if (festivals === null) return null

  const findFestivals = () => {
    let festivalArray = []
    festivalArray = artist.festivals
    const tempArray = festivals.filter(fest => {
      return festivalArray.includes(fest.festivalName)
    })
    return (tempArray)
  }
  

  if (filteredFestivals === null) setFilteredFestivals(findFestivals()) 
  
  if (filteredFestivals === null) return null

  return (
    <>
      <main>
        {(!artist.festivals) ? 
          <h1>Loading</h1>
          :
          <>
            <Container>
              <Header className='homeHeader' as='h1'> {artist.artist} </Header>
            </Container>
            <Grid stackable columns={4}>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Segment>
                    <Image 
                      src={artist.image}
                      fluid
                      rounded
                    />
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  
                  <iframe src="https://open.spotify.com/embed/artist/7CajNmpbOovFoOoasH2HaY" width="100%" height="100%" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                  
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={8}>
                  <h3>{filteredFestivals.map((fest, index) => {
                    return <FestivalCard key={index} {...fest}/>
                  })}
                  </h3>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>
        }
        
      </main>
    </>
  )

}
/* <p>{artist.artist}</p>
      {(!artist.festivals) ?
        <p>loading</p>
        :
        <div>Festivals:{artist.festivals.map( (festival, index) => {
          return (
            <div key={index}>
              <p className='festival-name' >{festival}</p>
            </div>
          )
        })}
        </div>
      } */
export default ArtistCard
