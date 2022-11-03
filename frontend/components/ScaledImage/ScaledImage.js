import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions } from 'react-native'
 
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const ScaledImage = (props) => {
  const [source, setSource] = useState({uri: props.uri})
  const styles = props.style ? props.style : {}

  useEffect(() => {
    Image.getSize(props.uri,(width, height) => {
      if (props.width && !props.height) { // fix width and auto adjust height
        setSource({uri: props.uri, width: props.width, height: height * (props.width / width)});
      } else if (!props.width && props.height) { // fix height and auto adjust width
        setSource({uri: props.uri, width: width * (props.height / height), height: props.height});
      } else if(!props.width && !props.height){ // auto adjust both height and width
        setSource({uri: props.uri, width: '100%', height: Math.floor(screenWidth/width*height)});
      } else { // fix both height and width
        setSource({uri: props.uri, width: props.width, height: props.height});
      }
    });
  },[])

  const imageStyle = {
    width: source.width, 
    height: source.height, 
    ...styles,
  }
  return <Image source={{uri:source.uri}} style={imageStyle} />
}

ScaledImage.propTypes = {
    uri: PropTypes.string.isRequired, 
    width: PropTypes.number,
    height: PropTypes.number
}

 