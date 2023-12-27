import { Dimensions, Platform, StyleSheet } from 'react-native'

export default function useInvoiceStyle(width, direction) {
    const color = '#000'

    const styles = StyleSheet.create({
        container: {
            paddingTop: 120,
            opacity: 0,
        },
        body: {
            backgroundColor: '#FFF',
            width: width - 20,
            // alignItems: 'center',
        },
        loader: {
            width: 400,
            height: Dimensions.get('window').height,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        },
        fatCenter: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        loaderText: {
            marginTop: 20,
            color,
        },
        title: {
            fontSize: 6,
            textAlign: 'center',

            fontWeight: '900',
            color,
        },
        headerWithColumn: {
            flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
            justifyContent: 'space-around',

            fontWeight: '900',
        },
        col: {
            alignItems: direction == 'rtl' ? 'flex-end' : 'flex-start',
        },
        invoiceNumber: {
            fontSize: 6,

            fontWeight: '900',
            color,
        },
        invoiceDate: {
            fontSize: 6,

            fontWeight: '900',
            color,
        },
        itemValue: {
            fontSize: 6,
            fontWeight: '900',
            maxWidth: 100,
            color,
        },
        branchName: {
            fontSize: 6,

            fontWeight: '900',
            color,
        },
        branchAddress: {
            fontSize: 6,

            fontWeight: '900',
            color,
        },
        qrCode: {},
        taxNumber: {
            fontSize: 6,

            fontWeight: '900',
            color,
        },
        itemsContainer: {
            borderTopWidth: 1,
            borderBottomWidth: 1,

            borderStyle: 'solid',

            fontWeight: '900',

            width: width - 20,
            color,
        },
        secondaryInfo: {},
        itemHead: {
            fontWeight: '900',
            textAlign: direction === 'rtl' ? 'right' : 'left',

            fontSize: 6,
            color,
        },
        totalContainer: {},
        qrContainer: {
            alignItems: 'center',

            fontWeight: '900',
        },
        bottomDivider: {
            borderBottomWidth: 1,

            height: 2,

            fontWeight: '900',
            color,
        },
        totalWithTax: {
            fontSize: 6,
            fontWeight: '900',
            color,
        },
        taxPercent: {
            fontSize: 6,
            fontWeight: '900',
            justifyContent: 'space-between',
            color,
        },
        errorWhilePrinting: {
            fontSize: 16,
            color: 'red',
            textAlign: 'center',
            marginTop: 16,
        },
        closeButton: {
            width: 40,
            height: 40,
            borderRadius: 4,
            position: 'absolute',
            top: Platform.OS === 'ios' ? 48 : 20,
            right: Platform.OS === 'ios' ? 48 : 20,
            backgroundColor: '#ECEEEF',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
        },
        labelWithValue: {
            marginVertical: 1,
            flexDirection: direction === 'rtl' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            color,
        },
        mrTop: {
            marginVertical: 1,
        }
    })
    return styles
}
