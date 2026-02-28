function Field({h, w}) {
    return ( 
        <>
            <Cell id={1}/>
            <Cell id={2}/>
            <Cell id={3}/>
        </>
     );
}

function Cell({id}) {
    return (
        <div>cell {id}</div>
    );
}

export default Field;