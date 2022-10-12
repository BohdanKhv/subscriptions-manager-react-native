import { useState } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { useSelector } from "react-redux"
import { Input, SubCardNew, SubInfoNew, GoBack, SubCardCustomNew, Alert } from "../components"
import { SIZES } from "../constants/theme"
import data from "../constants/data"
import icons from "../constants/icons"

const Search = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [ModalOpen, setModalOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const { theme } = useSelector(state => state.local);

    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.main,
            paddingTop: SIZES.padding,
        },
        input: {
            paddingHorizontal: SIZES.padding,
        },
    })

    return (
    <>
        <GoBack navigation={navigation} />
        <View style={style.container}>
            <View style={style.input}>
                <Input
                    icon={icons.search}
                    placeholder="Search by name or service"
                    value={search}
                    // autoFocus={true}
                    onChangeText={setSearch}
                />
            </View>
            <View
                style={{
                    paddingTop: SIZES.padding,
                }}
            >
                <SubCardCustomNew
                    setSelectedItem={setSelectedItem}
                    setModalOpen={setModalOpen}
                />
                <FlatList
                    data={
                        data
                        .filter(i => search.length > 0 ? i.name.toLowerCase().includes(search.toLowerCase()) : true)
                        .slice(0, 10)
                    }
                    ListFooterComponent={
                        <View style={{height: 130}} />
                    }
                    keyExtractor={(item) => `item-${item.id}`}
                    renderItem={({item}) => (
                        <SubCardNew
                            item={item}
                            setSelectedItem={setSelectedItem}
                            setModalOpen={setModalOpen}
                        />
                    )}
                />
            </View>
        </View>
        <Alert
            message={alertMsg}
        />
        <SubInfoNew
            item={selectedItem}
            isOpen={ModalOpen}
            setIsOpen={setModalOpen}
            setAlertMsg={setAlertMsg}
            setSelectedItem={setSelectedItem}
        />
    </>
    )
}

export default Search