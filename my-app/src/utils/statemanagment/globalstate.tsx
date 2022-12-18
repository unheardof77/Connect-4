import { createContext, useContext } from 'react';
import { useGameReducer } from './reducer';
import { Dispatch } from 'react';

import { useModalReducer, ModalState, modalAction } from './reducer';;

const initialModalState = {login:false, signup:false, winner: false, createLobby: false, joinModal: false};


const GameContext = createContext<{state: string[][], dispatch: Dispatch<any>}>({state:[['']], dispatch:()=>null});
const {Provider} = GameContext;


const GameProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useGameReducer([[],[],[],[],[],[],[]]);
    
    return <Provider value={{state, dispatch}} {...props} />
};

const useGameContext = () => useContext(GameContext);



const modalContext = createContext<{modalState:ModalState, updateModalState:Dispatch<modalAction>}>({modalState: initialModalState, updateModalState: ()=>null});
const { Provider: ModalProvider } = modalContext;

const ModalStateProvider = ({value = [], ...props}) =>{
    const [modalState, updateModalState] = useModalReducer(initialModalState);

    return <ModalProvider value={{modalState, updateModalState}} {...props}/>;
}

const useModalContext = () => useContext(modalContext);

export { GameProvider, useGameContext, ModalStateProvider, useModalContext};
