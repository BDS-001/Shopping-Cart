function test() {
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>console.log(json))
}

function Homepage() {
    return (
        <>
            {test()}
            <div>Homepage</div>
        </>
    )
}

export default Homepage