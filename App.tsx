import React, {useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import MyButton from './components/MyButton'

const movieURL = "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json"

type MyType = {
  episodeNumber?: number
  title?: string
  image?: string
}

export default function App() {

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [pole, setPole] = useState<MyType[]>([])


  const imagesArray = [
    'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_1_poster.png',
    'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_2_poster.png',
    'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_3_poster.png',
    'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_4_poster.png',
    'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_5_poster.png',
    'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_6_poster.png'
  ]
  const allData: MyType[] = []

  const addField = () => {
    data.map(({episode_number, title}) => {
      const newData = {
        episodeNumber: episode_number,
        title: title,
        image: imagesArray[episode_number - 1],
      }
      allData.push(newData)
    })
    setPole((p) => allData)
  }

  const sort = () => {
    setPole([...pole.reverse()])
  }

  useEffect(() => {
    if (data.length > 0) {
      addField()
    }
  }, [data])


  useEffect(() => {
    fetch(movieURL).then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => alert(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (<>
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          {isLoading ? (
            <ActivityIndicator/>
          ) : (
            <FlatList
              data={pole}
              keyExtractor={(item, index) => item.episodeNumber!.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
                <View style={styles.listPosition}>
                  <View style={styles.card}>
                    <Text style={styles.cardText}>
                      {item.title}
                    </Text>
                    <View style={styles.imagePosition}>
                      <Image
                        source={{uri: item.image}}
                        style={styles.image}/>
                    </View>
                  </View>
                </View>
              }
            />
          )}
        </View>
        <View style={styles.buttonPosition}>
          <View style={styles.buttonSize}>
            <MyButton onPress={sort}>
              SORT
            </MyButton>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    height: '94%'
  },
  listPosition: {
    alignItems: 'center',
    paddingVertical: 5
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: 215,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 8,
    borderRadius: 10
  },
  cardText: {
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 'bold'
  },
  imagePosition: {
    paddingTop: 15
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10
  },
  buttonPosition: {
    alignItems: 'center',
    paddingTop: 10
  },
  buttonSize: {
    width: '50%'
  }
})
