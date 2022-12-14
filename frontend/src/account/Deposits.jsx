import * as React from 'react';
import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userDepositsAtom} from "../state";
import {getDeposits} from "../actions";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function Deposits() {
    const [accessToken] = useRecoilState(accessTokenAtom)
    const [userDeposits] = useRecoilState(userDepositsAtom)

    useEffect(() => {
        if (accessToken !== null) {
            getDeposits()
        }
    }, [accessToken])

    return (
        <div>
            <h3>Deposits:</h3>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Datetime</TableCell>
                            <TableCell>Amount (USD)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userDeposits.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th"
                                           scope="row">{new Date(row.createdAt * 1000).toLocaleString()}</TableCell>
                                <TableCell>{(row.amount / 100).toFixed(2)}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}