import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchArticles } from "../../../utils/api";

interface Article {
  title: string;
  description: string;
  source: {
    name: string;
  };
  publishedAt: string;
  url: string;
}

interface TableComponentProps {
  articles: Article[];
}

const TableComponent: React.FC<TableComponentProps> = ({ articles }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [articlesdata, setArticles] = useState<Article[]>([]);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleFromDateChange = (newDate: Date | null) => {
    if (newDate) {
      newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
      console.log("Adjusted Date:", newDate);
    }
    setFromDate(newDate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArticles(searchKeyword || "news", fromDate);
        setArticles(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, [searchKeyword, fromDate]);

  return (
    <>
      <div>
        <TextField
          fullWidth
          label="Search Articles"
          variant="outlined"
          value={searchKeyword}
          onChange={handleSearchChange}
          margin="normal"
        />

        <DatePicker
          isClearable
          withPortal
          selected={fromDate}
          onChange={handleFromDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Please Select Date"
          wrapperClassName="date-picker-wrapper"
        />
      </div>

      <TableContainer style={{ marginTop: "10px" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Publication Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articlesdata
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((article) => (
                <TableRow key={article.url}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.description}</TableCell>
                  <TableCell>{article.source.name}</TableCell>
                  <TableCell>
                    {new Date(article.publishedAt).toLocaleString("en-US", {
                      timeZone: "UTC",
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={articlesdata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <style jsx global>{`
        input {
          width: 100%;
          border: 1px solid #00000045;
          box-sizing: border-box;
          padding: 8px;
        }
      `}</style>
    </>
  );
};

export default TableComponent;
