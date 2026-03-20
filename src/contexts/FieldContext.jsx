import { createContext, useContext, useReducer, useState } from "react";
import CellField from "../utils/CellField";
import Field from "../components/Field";

export const FieldContext = createContext(null);
export const FieldDispatchContext = createContext(null);

export function FieldProvider() {
    const [dimensions, setDimensions] = useState({w: 10, h: 10, b: 10});
	const [field, dispatch] = useReducer(fieldReducer, new CellField(dimensions));

    return (
        <FieldContext value={field}>
            <FieldDispatchContext value={dispatch}>
                <Field key={`${field.width}-${field.height}`} />
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
            return new CellField({
                w: field.width,
                h: field.height,
                b: field.totalMines,
            });
        case 'changeDifficulty':
            return new CellField(action.dimensions);
    }
}