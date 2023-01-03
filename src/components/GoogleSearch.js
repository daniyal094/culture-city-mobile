import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors} from '../utils/constants/colors';

const GoogleSearch = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search Venue"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyCsvP6Ttv7LeoUfHAXsuGxCQ_VCyUDqKsk',
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          width: '100%',
          borderWidth: 1,
          borderColor: colors.disableColor,
          borderRadius: 5,
        },
        textInput: {
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
          width: '100%',
        },
      }}
    />
  );
};

export default GoogleSearch;

// const styles = StyleSheet.create({});
