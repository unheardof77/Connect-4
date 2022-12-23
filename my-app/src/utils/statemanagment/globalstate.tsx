import { createContext, useContext, Dispatch } from 'react';
import { useModalReducer } from './reducer';
import { ModalState, ModalAction } from '../types/types'


const initialModalState = {login:false, signup:false, winner: false, createLobby: false, joinModal: false, whoWon:''};

const modalContext = createContext<{modalState:ModalState, updateModalState:Dispatch<ModalAction>}>({modalState: initialModalState, updateModalState: ()=>null});
const { Provider: ModalProvider } = modalContext;

const ModalStateProvider = ({value = [], ...props}) =>{
    const [modalState, updateModalState] = useModalReducer(initialModalState);

    return <ModalProvider value={{modalState, updateModalState}} {...props}/>;
}

const useModalContext = () => useContext(modalContext);

export { ModalStateProvider, useModalContext};
