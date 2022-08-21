import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from "moment";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  DataGridContainer,
  DataGridFilterContent
} from "../../assets/demand.css";
import PageHeader from "../../components/common/PageHeader";
import { demandDetailsByDemandNo } from '../../redux/actions/books/agentDemandActions';

const DemandDetails = () => {
  const { user } = useSelector((state) => state.storageStore);
  const { detailsData } = useSelector((state) => state.bookStore);

  const { no } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    window.scrollTo(0, 0);

    if (no) {
      dispatch(demandDetailsByDemandNo(no));
    }
  }, [no]);

  const handleClick = () => {
    navigate("/demand", { replace: true });
  };
  
  return (
    <DataGridContainer>
      <PageHeader name={"Demand Details"} handleClick={handleClick}><ArrowBackIcon /> Back</PageHeader>
      <DataGridFilterContent className="round_background">
        <div className="demand_header_row d-flex flex-column">
          <div className="demand_header_col">
            <p>User Id</p>
            <span>: </span>
            <p>{detailsData.demand.addUserId}</p>
          </div>
          <div className="demand_header_col">
            <p>User</p>
            <span>: </span>
            <p>{detailsData.demand.orderBy}</p>
          </div>
          <div className="demand_header_col ">
            <p>Demand No</p>
            <span>: </span>
            <p>{detailsData.demand.demandNo}</p>
          </div>
          <div className="demand_header_col">
            <p>Demand Date</p>
            <span>: </span>
            <p>
              {detailsData.demand.demandDate &&
                moment(new Date(detailsData.demand.demandDate)).format(
                  "DD-MMM-YYYY"
                )}
            </p>
          </div>
        </div>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Book Code</th>
              <th>Book Name</th>
              <th>Book Type</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Confirm Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {detailsData.demandDetails.map((item) => {
              return (
                <tr key={item.bookCode}>
                  <td>{item.bookCode}</td>
                  <td>{item.bookName}</td>
                  <td>{item.bookTypeName}</td>                  
                  <td className="text-right">{item.libQty}</td>
                  <td className="text-right">{item.demandQty}</td>
                  <td className="text-right">{item.bookPrice}</td>
                  <td className="text-right">{item.demandAmount}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                {detailsData.demandDetails.length} entries
              </td>
              <td className="text-left">
                Total
              </td>
              <td></td>
              <td className="text-right">{detailsData.demand.totalQty}</td>
              <td></td>
              <td className="text-right">{detailsData.demand.totalAmount}</td>
            </tr>
          </tfoot>
        </Table>
      </DataGridFilterContent>
    </DataGridContainer>
  );
};

export default DemandDetails;
