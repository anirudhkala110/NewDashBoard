import axios from 'axios'
import { useEffect, useState } from 'react'

const DataBackend = () => {
    const [rows, setRows] = useState([])
    useEffect(() => {
        axios.get('https://dashadmin.nayar-valley-home-stay.in/getAllData')
            .then(result => {
                console.log(result)
                setRows(result.data)
                console.log(rows)
            })
    })
    return (
        <div>DataBackend</div>
    )
}

export default DataBackend