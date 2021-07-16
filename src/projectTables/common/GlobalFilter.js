import React,{useState} from 'react'
import { useAsyncDebounce} from 'react-table';
import { Input } from 'reactstrap';

export const GlobalFilter = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    },1000)
    return (
        <span className="">
            <Input className="col-12" value={value || ''} placeholder="Search in table..."
            onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}
            />
        </span>
    )
}

