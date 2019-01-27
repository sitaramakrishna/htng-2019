import {scale, scaleModerate, scaleVertical} from '../utils/scale';

export const GradientButtonTypes = (theme) => {
    return ({
        _base: {
            button: {
                alignItems: 'stretch',
                paddingVertical: 0,
                paddingHorizontal: 20,
                height: scaleVertical(40),
                borderRadius: 20
            },
            gradient: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                colors: ['#ff9147', '#ff524c']
            },
            text: {
                backgroundColor: 'transparent',
                color: '#ffffff'
            }
        },
        large: {
            button: {
                alignSelf: 'stretch',
                height: scaleVertical(80),
                width: scale(260),
                borderRadius: 28,
            },
            gradient: {
                borderRadius: 28
            }
        },
        statItem: {
            button: {
                flex: 1,
                borderRadius: 5,
                marginHorizontal: 10,
                height: null,
                alignSelf: 'auto',
            },
            gradient: {
                flex: 1,
                borderRadius: 5,
                padding: 10,
            }
        },
        login: {
            button: {
                alignSelf: 'center',
                height: scaleVertical(47),
                width: scale(260),
                borderRadius: 100,
            },
            text: {
                color: 'white',
                fontSize: scale(13),
                fontWeight: "500"
            }
        }
    })
};
