import * as taskConstants from '../constants/Internet';
import NetInfo from "@react-native-community/netinfo";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
export const FetchPostListRequest = ():
    ThunkAction<Promise<void>, {}, {}, any> => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            NetInfo.addEventListener(state => {
                // console.log("Connection type", state.type);
                // console.log("Is connected?", state.isConnected);
                dispatch(showloading(state.isConnected))
            });

        } catch (e) {
            console.warn(e)

        }
    }
}
export const showloading = (e) => {
    return {
        type: taskConstants.isInternet,
        payload: {
            isInter:e
        }
    }
};
