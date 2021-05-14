import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '2rem',
        maxWidth: '80%'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    }
}));

const MUTable = ({data, page, perPage,handleChangePage,handleChangePerPage,total}) => {

    const classes = useStyles();

    if(data.length < 1 || data === undefined){
        return null;
    }
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                    <TableCell className={classes.tableHeaderCell}>Gender</TableCell>
                    <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                    <TableCell className={classes.tableHeaderCell}>Phone</TableCell>
                    <TableCell className={classes.tableHeaderCell}>Country</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        <Grid container spacing={1} style={{alignItems:'center'}}>
                            <Grid item lg={2}>
                                <Avatar alt={row.name} src={"."} />
                            </Grid>
                            <Grid item lg={10}>
                                <Typography className={classes.name}>
                                    {row.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </TableCell>
                    <TableCell >{row.gender}</TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell >{row.phone}</TableCell>
                    <TableCell >{row.country}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={total}
                rowsPerPage={perPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePerPage}
            />
        </TableContainer>
        
    )
}

export default MUTable;