import CellField from '../utils/CellField.js';

function Field({h, w, b}) {
    const field = new CellField({h, w, b});
    
    return ( 
        <>
        { field.cells.map((_, i) => <Cell id={i}/>) }
        </>
     );
}

function Cell({id}) {
    return (
        <div>cell {id}</div>
    );
}

export default Field;