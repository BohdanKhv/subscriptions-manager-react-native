import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { FONTS, SIZES } from "../../constants/theme";
import { useSelector } from "react-redux"
import utils from "../../constants/utils";


const Info = () => {
    const { theme, infoDisplay } = useSelector(state => state.local);
    const subItem = useSelector(state => state.sub.items);
    const [items, setItems] = useState([]);
    const [ totalPerMonth, setTotalPerMonth ] = useState(0)
    const [ totalType, setTotalType ] = useState(infoDisplay || 'monthly')

    useEffect(() => {
        setItems(subItem);
    }, [subItem])

    useEffect(() => {
        setTotalType(infoDisplay)
    }, [infoDisplay])

    useEffect(() => {
        if(totalType === 'monthly')
            setTotalPerMonth(calcPerMonth(items));
        else if (totalType === 'yearly')
            setTotalPerMonth(calcPerYear(items));
        else if (totalType === 'daily')
            setTotalPerMonth(calcPerDay(items));
    }, [totalType, items])

    const handleSwitch = () => {
        if(totalType === 'monthly')
            setTotalType('yearly');
        else if (totalType === 'yearly')
            setTotalType('daily');
        else if (totalType === 'daily')
            setTotalType('monthly');
    }

    const calcPerMonth = (items) => {
        const tpm = items.reduce((acc, item) => {
            return (+acc + item.price / item.cycle).toFixed(2)
        }, 0)
        return tpm;
    }

    const calcPerYear = (items) => {
        const tpy = (calcPerMonth(items) * 12).toFixed(2);
        return tpy;
    }

    const calcPerDay = (items) => {
        const tpy = calcPerMonth(items) / 30;
        return tpy.toFixed(2);
    }

    const style = StyleSheet.create({
        wrapper: {
            borderRadius: SIZES.radius,
            overflow: 'hidden',
            margin: SIZES.padding,
            // Shadow
            elevation: theme.name === 'dark' ? 5 : 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.51,
            shadowRadius: 13.16,
            borderColor: theme.border,
            borderWidth: 0.5
        },
        infoWrapper: {
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            borderRadius: SIZES.radius,
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        textSecondary: {
            color: '#fff',
            opacity: 0.5,
            ...FONTS.body3
        },
        bill: {
            ...FONTS.title,
            color: '#fff',
        },
        justifyBetween: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
    });

    return (
        <LinearGradient
            colors={[theme.gradientMain1, theme.gradientMain2, theme.gradientMain3]}
            start={{ x: 0.6, y: 0 }}
            style={style.wrapper}
        >
            <TouchableNativeFeedback
                onPress={handleSwitch}
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
            >
                <View style={style.infoWrapper}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            ...FONTS.body4,
                            color: '#fff',
                            opacity: 0.5,
                        }}>
                            Total Subscriptions
                        </Text>
                        <Text style={{
                            ...FONTS.h4,
                            color: '#fff',
                        }}>
                            {items.length}
                        </Text>
                    </View>
                    <View
                        style={[{
                            paddingTop: 24,
                        }, style.justifyBetween]}
                    >
                        <Text style={style.bill}>
                            $ {utils.addComaToNumber(totalPerMonth)}
                        </Text>
                        <Text style={style.textSecondary}>
                            / {totalType}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </LinearGradient>
    )
}

export default Info