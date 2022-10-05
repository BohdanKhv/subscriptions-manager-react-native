import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import { COLORS, SIZES } from "../../constants/theme"
import icons from '../../constants/icons';


const SubItemAdd = ({item, setSelectedItem, setModelOpen}) => {
    const [rippleOverflow, setRippleOverflow] = useState(false);

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            paddingBottom: 8,
        },
        itemBody: {
            backgroundColor: COLORS.textLight,
            color: COLORS.textDark,
            borderRadius: SIZES.radius,
            borderColor: COLORS.secondary,
            overflow: 'hidden',
            borderWidth: 1,
        },
        itemWrapper: {
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderRadius: SIZES.radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textMain: {
            color: COLORS.textDark,
            fontSize: SIZES.h3,
            fontWeight: 'bold',
        },
        textSecondary: {
            color: COLORS.textDark,
            fontSize: SIZES.h5,
            opacity: 0.5,
        },
        columnEmd: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingRight: 10,
        },
        thumbnail: {
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 10,
            resizeMode: 'contain',
            // tintColor: COLORS.textDark,
        },
    })

    return (
        <>
        <View
            style={style.container}
        >
            <View
                style={style.itemBody}
            >
                <TouchableNativeFeedback
                    onPress={() => {
                        setSelectedItem(item);
                        setModelOpen(true);
                        setRippleOverflow(!rippleOverflow);
                    }}
                    background={TouchableNativeFeedback.Ripple(COLORS.tertiary, rippleOverflow)}
                >
                    <View style={style.itemWrapper}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={{
                                    uri: item.thumbnail,
                                    cache: 'only-if-cached',
                                }}
                                style={style.thumbnail}
                            />
                            <View>
                                <Text style={style.textMain}>
                                    {item.name}
                                </Text>
                                <Text style={style.textSecondary}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={style.columnEmd}
                        >
                            <Image
                                source={icons.plus}
                                style={{
                                    width: 18,
                                    height: 18,
                                    tintColor: COLORS.textDark,
                                }}
                            />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
        </>
    )
}

export default SubItemAdd