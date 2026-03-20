import { createContext, useContext, useReducer } from "react";
import CellField from "../utils/CellField";

export const FieldContext = createContext(null);
export const FieldDispatchContext = createContext(null);

export function FieldProvider({ children }) {
    const dimensions = {w: 30, h: 15, b: 90};
	const [field, dispatch] = useReducer(fieldReducer, new CellField(dimensions));
    // console.log(children, field);
    return (
        <FieldContext value={field}>
            <FieldDispatchContext value={dispatch}>
                { children }
            </FieldDispatchContext>
        </FieldContext>
    );
}

export function useField() {
    return useContext(FieldContext);
}

export function useFieldDispatch() {
    return useContext(FieldDispatchContext);
}

function fieldReducer(field, action) {
    switch (action.type) {
        case 'restartField':
            const same = {
                w: field.width,
                h: field.height,
                b: field.totalMines,
            };
            console.log(same);
            return new CellField(same);
        case 'changeDifficulty':
            return new CellField(action.dimensions);
    }
}