import styled from "styled-components";

export const ReportRow = styled.div`
    padding-bottom: 15px;
`;
export const ReportCol= styled.div`
    flex: 0 0 100%;
    padding-bottom: 10px;
    @media (max-width: 834px) {
        flex: 0 0 100%;
        padding-bottom: 10px;
    }
    &:last-child{
        padding-bottom: 0px;
    }
`;