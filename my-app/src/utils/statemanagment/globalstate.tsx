import { createContext, useContext } from 'react';
import { useGameReducer } from './reducer';
import { Dispatch } from 'react';

const GameContext = createContext<(string[][] | Dispatch<{ type: "Finished Game"; payload: string[][]; }>)[] | null>(null);
const {Provider} = GameContext;



const GameProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useGameReducer([[],[],[],[],[],[],[]]);
    
    return <Provider value={[state, dispatch]} {...props} />
};

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext};
