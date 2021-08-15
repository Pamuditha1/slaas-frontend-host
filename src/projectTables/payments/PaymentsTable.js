import React, {useMemo, useState, useEffect} from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination} from 'react-table'
import { Table, Button } from 'reactstrap';
import Loader from 'react-loader-spinner'

import DayPicker from '../../components/DayPicker'

import {COLUMNS} from './paymentColumns'
import ExportingButtons from '../common/ExportingButtons';

import {getAllPayments} from '../../services/getAllPayments'
import {filterPayments} from '../../services/filterPayments'

export const PaymentsTable = (props) => {
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dateRange, setdateRange] = useState({
        from: undefined,
        to: undefined,
        show: false
    })
    const [filterNum, setfilterNum] = useState('')
    const [showFilters, setshowFilters] = useState(false)

    const filterRecords = async () => {
        console.log(dateRange)
        let filteredPayments = await filterPayments(dateRange.from, dateRange.to)
        console.log("Filtered Payments", filteredPayments)
        setPayments(filteredPayments)
        setfilterNum(filteredPayments.length)
    }

    useEffect(() => {
        async function fetchPayments() {
            setIsLoading(true)
            const records = await getAllPayments()
            setPayments(records)
            setIsLoading(false)
        }
        fetchPayments()
    }, []);
        
    const columns = useMemo(() => COLUMNS, [])
    const data = payments

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        allColumns,
        getToggleHideAllColumnsProps,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        exportData,
        prepareRow
    } = useTable({
        columns,
        data
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
    )

    const {pageIndex, pageSize} = state

    const bstyle = {
        borderRadius: '30px',
        boxShadow: "0px 5px 10px grey",
    }

    return (
        <div>
            {
                isLoading ? 
                <Loader style={{marginLeft : "35%"}}
                    type="ThreeDots"
                    color="#8f2032"
                    height={300}
                    width={300}
                /> :
                <div>
                    

                    <p className="ml-5"> {data.length} payment records.
                        <span><Button style={bstyle} onClick={() => setshowFilters(!showFilters)} outline color="dark" className="ml-5">Filter Records</Button></span>
                    </p>
                    {showFilters && <div className="row ml-5">
                        <div className="col-12">
                            <input type="checkbox" {...getToggleHideAllColumnsProps()} />All Columns
                        </div>
                        <>{
                            allColumns.map(column => (
                                <div key={column.id} className="col-3" style={{float: "left"}}>
                                    <label key={column.id}>
                                        <input type="checkbox" {...column.getToggleHiddenProps()}/>
                                        <>{column.Header}</>
                                    </label>
                                </div>
                            ))
                            
                        }</>
                    </div>}

                    
                    <DayPicker dateRange={dateRange} setdateRange={setdateRange} filterRecords={filterRecords}/>
                    {filterNum && (
                        filterNum>0 ?
                            <h6>{filterNum} records found.</h6>
                            : <h6>No records found.</h6>
                    )
                    }

                    <div className="row mb-3 mt-5">
                        <div className="col-6">
                        </div>
                        <div className="col-6">
                            <ExportingButtons exportData={exportData}/>
                        </div>
                    </div>

                    <Table size="sm"  dark hover {...getTableProps()} responsive style={{height: "200px"}}>
                        <thead className="text-center"> 
                            {headerGroups.map((headerGroups) => (
                                <tr {...headerGroups.getHeaderGroupProps()}>
                                    {
                                        headerGroups.headers.map( (column) => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? '(D)': '(A)') : ''}
                                                </span>
                                                <div placeholder="Search">{column.canFilter ? column.render('Filter') : null}</div>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))}
                            
                        </thead>
                        <tbody {...getTableBodyProps()} className="text-center">
                            {
                                page.map( row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <div>
                        <span>
                            Page{' '}
                        <strong> {pageIndex + 1} of {pageOptions.length}</strong> {' '}
                        </span>
                        <span>
                            | Go to Page: {' '}
                            <input type="number" defaultValue={pageIndex+1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }} style={{width: "50px"}}/>
                        </span>
                        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                            {
                                [5,10,25,50,100].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))
                            }
                        </select>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                    </div>
                </div>
            }
        </div>
    )
}
