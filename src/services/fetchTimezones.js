import axios from 'axios'

const API_URL = 'https://raw.githubusercontent.com/kevinroberts/city-timezones/master/data/cityMap.json'

export const fetchTimezones = async () => {
  const res = await axios.get(API_URL)
  return res.data
}
