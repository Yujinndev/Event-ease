import React, { useState } from 'react'
import axios from 'axios'
import '@geoapify/geocoder-autocomplete/styles/round-borders.css'
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FormLabel } from './form'

const Geoapify = ({ onSelectPlace }) => {
  const [places, setPlaces] = useState([])
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('') // New state for category

  const API_KEY = '02d344fae012413696d714ab8baa483b'

  const fetchPlaces = async (coordinates) => {
    try {
      const response = await axios.get('https://api.geoapify.com/v2/places', {
        params: {
          categories: category, // Use selected category
          limit: 4,
          filter: `circle:${coordinates[1]},${coordinates[0]},5000`,
          apiKey: API_KEY,
        },
      })
      setPlaces(response.data.features)
      console.log(response.data.features)
    } catch (error) {
      console.error('Error fetching places data:', error)
    }
  }

  const onPlaceSelect = (value) => {
    if (value && value.properties) {
      fetchPlaces([value.properties.lat, value.properties.lon])
    }
  }

  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <Select
          className="w-max"
          onValueChange={(value) => setCategory(value)} // Set category state
          value={category}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="What type of venue?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="catering">
                <b>Catering</b> - {`[Restaurants, FastFoods, Bar, Cafe]`}
              </SelectItem>
              <SelectItem value="commercial">
                <b>Commercial</b> - {`[Supermarket, Mall, Vehicle, Trade]`}
              </SelectItem>
              <SelectItem value="accommodation">
                <b>Accommodation</b> - {`[Hotel, Apartment, Motel, Hut]`}
              </SelectItem>
              <SelectItem value="healthcare">
                <b>Healthcare</b> - {`[Hospital, Pharmacy, Clinic, Dentist]`}
              </SelectItem>
              <SelectItem value="education">
                <b>Education</b> - {`[Driving, Music, Language, University]`}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormLabel>Target Location</FormLabel>
        <GeoapifyContext apiKey={API_KEY}>
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter address here - Autocomplete"
            value={value}
            limit={3}
            filterByCountryCode={['ph']}
            placeSelect={onPlaceSelect}
          />
        </GeoapifyContext>
      </div>
      {places.length > 0 && (
        <div className="my-8">
          <h1 className="text-base font-bold">Recommended Nearby Places</h1>
          <div className="my-4 grid grid-cols-2 gap-4">
            {places.map((place) => (
              <Card
                key={place.properties.place_id}
                className="cursor-pointer pt-4"
                onClick={() => onSelectPlace(place.properties.formatted)}
              >
                <CardContent className="flex flex-col gap-2">
                  <h1 className="text-base font-bold">
                    {place.properties.name}
                  </h1>
                  {place.properties.opening_hours && (
                    <Badge className="w-max">
                      {place.properties.opening_hours}
                    </Badge>
                  )}
                  <p className="text-sm">
                    <i>{place.properties.formatted}</i>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Geoapify
