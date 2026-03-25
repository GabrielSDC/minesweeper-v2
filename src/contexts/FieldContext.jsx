import { createContext, useContext, useReducer, useState } from "react";
import CellField from "../utils/CellField";
import Field from "../components/Field";

export const FieldContext = createContext(null);
export const FieldDispatchContext = createContext(null);
export const DimensionsContext = createContext(null);
export const DimensionsUpdateContext = createContext(null);

export function FieldProvider() {
    const [dimensions, updateDimensions] = useReducer(dimensionsReducer, {w: 10, h: 10, b: 10});
	const [field, dispatch] = useReducer(fieldReducer, new CellField(dimensions));

    return (
        <FieldContext value={field}>
            <FieldDispatchContext value={dispatch}>
                <DimensionsContext value={dimensions}>
                    <DimensionsUpdateContext value={updateDimensions}>
                        <Field key={`${field.width}-${field.height}`} />
                    </DimensionsUpdateContext>
                </DimensionsContext>
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

export function useDimensions() {
    return useContext(DimensionsContext);
}

export function useDimensionsUpdate() {
    return useContext(DimensionsUpdateContext);
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
            console.log('field', action.dimensions);
            return new CellField(action.dimensions);
    }
}

function dimensionsReducer(dimensions, action) {
    console.log('dimension', action.dimensions);
    return action.dimensions;
}