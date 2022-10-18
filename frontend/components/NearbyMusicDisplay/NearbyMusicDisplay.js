// import * as React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
// import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'

// const { block, set, greaterThan, lessThan, Value, cond, sub } = Animated

// export const NearbyMusicDisplay = () => (
//   <View style={{ backgroundColor: 'green' }}>
//     <ScrollView >
//     <Text>
//       At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
//       praesentium voluptatum deleniti atque corrupti quos dolores et quas
//       molestias excepturi sint occaecati cupiditate non provident, similique
//       sunt in culpa qui officia deserunt mollitia animi, id est laborum et
//       dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//     </Text>
//     </ScrollView>
//   </View>
// )
// export default class Example extends React.Component {
//   trans = new Value(0)
//   untraversedPos = new Value(0)
//   prevTrans = new Value(0)
//   headerPos = block([
//     cond(
//       lessThan(this.untraversedPos, sub(this.trans, 100)),
//       set(this.untraversedPos, sub(this.trans, 100))
//     ),
//     cond(
//       greaterThan(this.untraversedPos, this.trans),
//       set(this.untraversedPos, this.trans)
//     ),
//     set(this.prevTrans, this.trans),
//     this.untraversedPos,
//   ])
//   renderHeader = name => (
//     <View
//       style={{
//         width: '100%',
//         backgroundColor: 'blue',
//         height: 100,
//         borderWidth: 2,
//       }}
//     >
//       <Text>{name}</Text>
//     </View>
//   )

//   renderInner = () => (
//     <View>
//       <Animated.View
//         style={{
//           zIndex: 1,
//           transform: [
//             {
//               translateY: this.headerPos,
//             },
//           ],
//         }}
//       >
//         {this.renderHeader('one')}
//       </Animated.View>
//       <Lorem />
//       <Lorem />
//     </View>
//   )

//   render() {
//     return (
//       <View style={styles.container}>
//         <BottomSheet
//           contentPosition={this.trans}
//           snapPoints={[100, 400]}
//           renderContent={this.renderInner}
//         />
//       </View>
//     )
//   }
// }

// const IMAGE_SIZE = 200

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//   },
//   box: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//   },
// })

// import React from 'react'
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   View,
//   TextInput,
// } from 'react-native'
// import BottomSheet from 'reanimated-bottom-sheet'
// import { ScrollView } from 'react-native-gesture-handler'

export const NearbyMusicDisplay = () =>  {
  renderInner = () => (
    <View style={styles.panel}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
      {/* <Text style={styles.panelTitle}>San Francisco Airport</Text>
      <Text style={styles.panelSubtitle}>
        International Airport - 40 miles away
      </Text>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Directions</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Search Nearby</Text>
      </View>
      <Image
        style={styles.photo}
        source={require('../../assets/imgs/robot_avatar.png')}
      /> */}
    </View>
  )

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )

  bs = React.createRef()

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[500, 500, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={0}
      />
    </View>
  )
}

const IMAGE_SIZE = 80

const styles = StyleSheet.create({
  search: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 800,
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
})
// export const NearbyMusicDisplay = () => {
//     const sheetRef = React.useRef(null);
//     const snapPoints = ["40%"];

//     const renderContent = () => (
//         <View
//           style={{
//             backgroundColor: 'white',
//             padding: 16,
//             height: 450,
//           }}
//         >
//           <Text>Swipe down to close</Text>
//         </View>
//       );

//     return (
//         <>
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: 'papayawhip',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Button
//               title="Open Bottom Sheet"
//               onPress={() => sheetRef.current.snapTo(0)}
//             />
//           </View>
//           <BottomSheet
//             ref={sheetRef}
//             snapPoints={[450, 300, 0]}
//             borderRadius={10}
//             renderContent={renderContent}
//           ><BottomSheetScrollView>
//             <Text>Hello</Text>
//             </BottomSheetScrollView>
//             </BottomSheet>
//         </>
//       );
// }

// const styles = StyleSheet.create({
// })

