import { ColumnFilter } from '../common/ColumnFilter'

export const COLUMNS = [
    {
        Header: 'Date',
        accessor: 'date',
        Filter: ColumnFilter
    },
    {
        Header: 'Time',
        accessor: 'time',
        Filter: ColumnFilter
    },
    {
        Header: 'Invoice No',
        accessor: 'invoiceNo',
        Filter: ColumnFilter
    },
    {
        Header: 'Total Amount',
        accessor: 'total',
        Filter: ColumnFilter
    },
    {
        Header: 'Year of Payment',
        accessor: 'yearOfPayment',
        Filter: ColumnFilter
    },
    {
        Header: 'Payment Type',
        accessor: 'type',
        Filter: ColumnFilter,
    },
    {
        Header: 'Admission Fee',
        accessor: 'admission',
        Filter: ColumnFilter,
    },
    {
        Header: 'Arrears Payment',
        accessor: 'arrears',
        Filter: ColumnFilter,
    },
    {
        Header: 'Yearly Fee',
        accessor: 'yearlyFee',
        Filter: ColumnFilter
    },
    {
        Header: 'ID Card Fee',
        accessor: 'idCardFee',
        Filter: ColumnFilter
    },
    {
        Header: 'Description',
        accessor: 'description',
        Filter: ColumnFilter
    }

]
