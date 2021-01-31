import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ItemComicProps } from '../MainHome/MainHome'

type DescriptComicProps = {
    item: ItemComicProps | any
}
const DescriptComic: FunctionComponent<DescriptComicProps> = ({ item }) => {
    const [txtdescript, setDes] = React.useState<boolean>(false)
    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 20, color: '#5c6b73', fontWeight: 'bold' }}>Description</Text>
            <Text numberOfLines={txtdescript ? 1000 : 3} style={styles.name}>{item.description === '' ? 'Đọc sẽ rõ...' : item.description}</Text>
            {
                !txtdescript ? (<TouchableOpacity
                    onPress={() => setDes(!txtdescript)}
                    style={styles.txt}>
                    <Text style={{ color: '#3a9ebb' }}>Read full description</Text>
                </TouchableOpacity>) : (<TouchableOpacity
                    onPress={() => setDes(!txtdescript)}
                    style={styles.txt}>
                    <Text style={{ color: '#3a9ebb' }}>Collapse</Text>
                </TouchableOpacity>)
            }
        </View>
    )
}


export default React.memo(DescriptComic,isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#D4D1FA',
    },
    name: {
        fontSize: 16,
        color: '#5c6b73'
    },
    txt: {
        paddingVertical: 10,

    }
})