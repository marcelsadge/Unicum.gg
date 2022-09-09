import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
    font-family: 'Secular One' !important;
    overflow-x: auto;
    overflow-y: auto;
`;

const TankTable = styled.table`
    white-space: nowrap;
    position: sticky;
    border-spacing: 0;
    width: 100%;
    font-size: 0.75rem;
    font-family: 'Secular One' !important;
    backdrop-filter: blur(7px);
`;

const playerTankHeaders = {
    tank: "Tank",
    nation: "Nation",
    tier: "Tier",
    class: "Class",
    battles: "Battles",
    wn8: "WN8",
    winrate: "WR",
    dpg: "DPG",
    kills: "kills",
    exp: "Exp",
    spots: "Spots",
    survival: "Survival",
};

function PlayerPageTable({ data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        state,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageNum, pageSize },
    } = useTable({
        columns,
        data,
        initialState : {
            pageNum: 0,
            pageSize: 20,
            sortBy : [
                {
                    id: "tier",
                    des: "true"
                }
            ]
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    });

    const columns = React.useMemo(() => [
        {
            Header: playerTankHeaders.tank
        },
        {
            Header: playerTankHeaders.wn8
        },
    ], []);

    return (
        <TableContainer>
            <TankTable {...getTableProps()}>
                <thead>
                </thead>
                <tbody>
                </tbody>
            </TankTable>
        </TableContainer>
    );
}

export default PlayerPageTable;