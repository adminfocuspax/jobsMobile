import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';

interface DummyComponentProps {
    style?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    text?: string;
}

/**
 * A dummy component with 25% width
 * - Fixed width of 25% of parent container
 * - Customizable background color and text
 * - Responsive design with proper styling
 *
 * @param {StyleProp<ViewStyle>} style - Additional styles to apply to the container (optional)
 * @param {string} backgroundColor - Background color of the component (optional, defaults to light gray)
 * @param {string} text - Text to display inside the component (optional, defaults to "Dummy Component")
 */
const DummyComponent: React.FC<DummyComponentProps> = ({
    style = {},
    backgroundColor = '#ffffff',
    text = 'Dummy Component',
}) => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor },
                style,
            ]}
        >
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '25%',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
});

export default DummyComponent;