import { createContext, useContext } from 'react';
import { useGameReducer } from './reducer';
import { Dispatch } from 'react';





const GameContext = createContext<{state: string[][], dispatch: Dispatch<any>}>({state:[['']], dispatch:()=>null});
const {Provider} = GameContext;


const GameProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useGameReducer([[],[],[],[],[],[],[]]);
    
    return <Provider value={{state, dispatch}} {...props} />
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext};
