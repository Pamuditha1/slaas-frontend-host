import React, {useMemo, useState, useEffect} from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect} from 'react-table'
import { Table, Button } from 'reactstrap';
import Loader from 'react-loader-spinner'
import { Link} from 'react-router-dom'
import {useSticky} from 'react-table-sticky'

import {Checkbox} from '../common/Checkbox'
import {COLUMNS} from './terminatedColumns'

import {getTerminatedMembers} from '../../services/getTerminatedMembers'

import { useExportData } from "react-table-plugins";
import ExportingButtons from '../common/ExportingButtons';
import getExportFileBlob from '../common/exportFunction'

export const TerminatedTable = (props) => {
    const [members, setmembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setshowFilters] = useState(false)

    useEffect(() => { 
        async function fetchTerminatedMembers() {
            setIsLoading(true)
            let members = await getTerminatedMembers()
            setmembers(members)
            setIsLoading(false)
        }
        fetchTerminatedMembers()
    }, []);

    const columns = useMemo(() => COLUMNS, [])
    const data = members


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
        prepareRow,
        selectedFlatRows,
        exportData
    } = useTable({
            columns,
            data,
            getExportFileBlob
        },
        useSticky,
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useExportData,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return[{
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps}) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()}/>
                    ),
                    Cell: ({row}) => (
                        <Checkbox {...row.getToggleRowSelectedProps()}/>
                    )
                }
                ,...columns]
            })
        }
    )

    const {pageIndex, pageSize} = state
    console.log(selectedFlatRows[0] && selectedFlatRows[0].original)
    
    const saveMails = () => {
        let list = []
        selectedFlatRows.forEach(r => {
            list.push(r.original.email)
        });
        props.setList(list)
    }

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
                    
                    <p className="ml-5"> {data.length} member records.
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
                        <div className="row mb-3">
                        <div className="col-6">
                        <Link to="/user/terminated-list/send-emails"
                        >
                            <Button style={bstyle} onClick={saveMails} disabled={selectedFlatRows.length == 0} outline color="dark">Send Emails to {selectedFlatRows.length}</Button>
                        </Link> 
                        </div>
                        <div className="col-6">
                            <ExportingButtons exportData={exportData}/>
                        </div>
                    </div>
                    <Table size="sm" dark hover {...getTableProps()} responsive style={{height: "200px"}}>
                        <thead style={{textAlign: 'center'}}> 
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
                        <tbody {...getTableBodyProps()} style={{textAlign: 'center'}}>
                            {
                                page.map( row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()} style={{color: (cell.value == "Terminated") && 'red'}} >
                                                    {(cell.column.Header == "Last Membership Payment Date" || cell.column.Header == "DOT" || cell.column.Header == "Last Payment Date" ) 
                                                    ? (cell.value ? new Date(cell.value).toLocaleDateString() : '' )
                                                : cell.render('Cell')}</td>
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
